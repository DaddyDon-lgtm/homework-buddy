// Talks to the Gemini API directly from the tablet.
// The key is typed in by a parent and stays on the device.

const BASE = 'https://generativelanguage.googleapis.com/v1beta'

const SUBJECT_IDS = ['math', 'mandarin', 'english', 'science', 'social', 'other']

export async function listModels(apiKey) {
  const res = await fetch(`${BASE}/models?pageSize=200`, {
    headers: { 'x-goog-api-key': apiKey },
  })
  if (!res.ok) throw new Error(await describeError(res))
  const data = await res.json()
  return (data.models || [])
    .filter((m) => (m.supportedGenerationMethods || []).includes('generateContent'))
    .map((m) => ({ id: m.name.replace(/^models\//, ''), label: m.displayName || m.name }))
    .filter((m) => /gemini/i.test(m.id) && !/embedding|tts|image|audio|live/i.test(m.id))
}

async function describeError(res) {
  let detail = ''
  try {
    const body = await res.json()
    detail = body?.error?.message || ''
  } catch {
    // no JSON body
  }
  if (res.status === 400 && /API key/i.test(detail)) return 'The AI key is not valid.'
  if (res.status === 403) return 'The AI key was refused. Check it in the parent area.'
  if (res.status === 404) return 'That AI model was not found. Pick another one in the parent area.'
  if (res.status === 429) return 'The AI is busy or the free daily limit was reached. Try again in a minute.'
  return detail || `The AI service returned an error (${res.status}).`
}

function buildPrompt({ hasImage, subject, topicZh, topicEn, count }) {
  const english = Math.max(2, Math.round(count / 4))
  const topical = count - english
  const source = hasImage
    ? `The attached photo shows a page of the student's homework. Read it carefully (it is mostly in Traditional Chinese), work out the subject and the exact skill or topic being practiced, and build the practice round on that same skill. Do NOT copy the homework questions and do not give away their answers. Write new questions that practice the same thing. If the photo is unreadable or is not schoolwork, return only {"error": "a short reason in English"}.`
    : `The chosen topic is: ${topicZh || ''} / ${topicEn || ''} (subject: ${subject}). Build the practice round on this topic.`

  return `You write practice questions for a Grade 5 student who follows Taiwan's 108 curriculum. The student reads Traditional Chinese at grade level and reads English at about US Grade 5 level.

${source}

Write exactly ${count} multiple-choice questions:
- ${topical} questions with "kind": "topic". These practice the homework topic at Taiwan Grade 5 level. Give every prompt and option in both Traditional Chinese and natural English. Start easier and get harder.
- ${english} questions with "kind": "english", placed last. These are an English challenge at US Grade 5 level (Common Core ELA), tied to the same topic: vocabulary in context, a short 2 to 4 sentence passage with a comprehension or inference question, or a word problem that needs careful reading. For these, "prompt_en" holds the full question, "prompt_zh" is only a short hint in Chinese (not a translation), and each option has "en" text with "zh" set to "".

Rules:
- Use Traditional Chinese with Taiwan vocabulary. Never use Simplified characters.
- For Mandarin (國語) questions, keep the Chinese words or sentences being tested in Chinese inside both prompts, and explain them in English in "prompt_en".
- Every question has exactly 4 options and exactly one correct answer. Wrong options should come from mistakes a student would really make.
- Check every answer, and work out all math step by step before you write the options. Vary which position holds the correct answer.
- Explanations are short, kind and show the reasoning (1 to 2 sentences in each language).
- "word" is one useful English word or phrase from the question that is worth learning, with its Chinese meaning.
- Never use a real person's name in a question; use generic names. Do not use images, tables or anything that needs drawing. Plain text only. Write fractions like 3/4.

Return only JSON in this shape:
{
  "subject": one of ${JSON.stringify(SUBJECT_IDS)},
  "topic_zh": "short topic name in Chinese",
  "topic_en": "short topic name in English",
  "questions": [
    {
      "kind": "topic" or "english",
      "prompt_zh": "...",
      "prompt_en": "...",
      "options": [{"zh": "...", "en": "..."}, {"zh": "...", "en": "..."}, {"zh": "...", "en": "..."}, {"zh": "...", "en": "..."}],
      "answer": 0,
      "explain_zh": "...",
      "explain_en": "...",
      "word": {"en": "...", "zh": "..."}
    }
  ]
}`
}

function shuffle(list) {
  const a = [...list]
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Checks the AI's reply and shuffles the options so the right answer
// is not always in the same place.
export function cleanRound(raw, fallback = {}) {
  if (!raw || typeof raw !== 'object') throw new Error('The AI reply could not be read. Please try again.')
  if (raw.error) throw new Error(`The AI could not use that photo: ${raw.error}`)
  const questions = (Array.isArray(raw.questions) ? raw.questions : [])
    .filter(
      (q) =>
        q &&
        Array.isArray(q.options) &&
        q.options.length === 4 &&
        Number.isInteger(q.answer) &&
        q.answer >= 0 &&
        q.answer < 4 &&
        (q.prompt_en || q.prompt_zh),
    )
    .map((q) => {
      const tagged = q.options.map((o, i) => ({
        zh: String(o?.zh ?? ''),
        en: String(o?.en ?? ''),
        right: i === q.answer,
      }))
      const mixed = shuffle(tagged)
      return {
        kind: q.kind === 'english' ? 'english' : 'topic',
        prompt_zh: String(q.prompt_zh ?? ''),
        prompt_en: String(q.prompt_en ?? ''),
        options: mixed.map(({ zh, en }) => ({ zh, en })),
        answer: mixed.findIndex((o) => o.right),
        explain_zh: String(q.explain_zh ?? ''),
        explain_en: String(q.explain_en ?? ''),
        word: q.word?.en ? { en: String(q.word.en), zh: String(q.word.zh ?? '') } : null,
      }
    })
  if (questions.length < 3) throw new Error('The AI did not return enough questions. Please try again.')
  return {
    subject: SUBJECT_IDS.includes(raw.subject) ? raw.subject : fallback.subject || 'other',
    topic_zh: String(raw.topic_zh || fallback.topicZh || ''),
    topic_en: String(raw.topic_en || fallback.topicEn || ''),
    questions,
  }
}

export async function generateRound({ apiKey, model, image, subject, topicZh, topicEn, count }) {
  const parts = []
  if (image) parts.push({ inline_data: { mime_type: image.mimeType, data: image.base64 } })
  parts.push({ text: buildPrompt({ hasImage: Boolean(image), subject, topicZh, topicEn, count }) })

  const res = await fetch(`${BASE}/models/${encodeURIComponent(model)}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
    body: JSON.stringify({
      contents: [{ role: 'user', parts }],
      generationConfig: { responseMimeType: 'application/json', temperature: 0.7 },
    }),
  })
  if (!res.ok) throw new Error(await describeError(res))
  const data = await res.json()
  const text = (data?.candidates?.[0]?.content?.parts || [])
    .map((p) => p.text || '')
    .join('')
    .trim()
  if (!text) throw new Error('The AI sent back an empty reply. Please try again.')
  let parsed
  try {
    parsed = JSON.parse(text.replace(/^```(?:json)?\s*/i, '').replace(/```$/, ''))
  } catch {
    throw new Error('The AI reply could not be read. Please try again.')
  }
  return cleanRound(parsed, { subject, topicZh, topicEn })
}

// Shrinks a photo so it uploads quickly, and returns it as base64 JPEG.
export function prepareImage(file, maxSide = 1600) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      const scale = Math.min(1, maxSide / Math.max(img.width, img.height))
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(img.width * scale)
      canvas.height = Math.round(img.height * scale)
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85)
      URL.revokeObjectURL(url)
      resolve({ mimeType: 'image/jpeg', base64: dataUrl.split(',')[1], dataUrl })
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('That photo could not be opened. Please try another one.'))
    }
    img.src = url
  })
}
