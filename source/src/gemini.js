// Talks to the Gemini API directly from the tablet.
// The key is typed in by a parent and stays on the device.

const BASE = 'https://generativelanguage.googleapis.com/v1beta'

const SUBJECT_IDS = ['math', 'mandarin', 'english', 'science', 'social', 'other']

export const MAX_PAGES = 5
const TIMEOUT_MS = 120000

export async function listModels(apiKey) {
  const res = await fetch(`${BASE}/models?pageSize=200`, {
    headers: { 'x-goog-api-key': apiKey },
  })
  if (!res.ok) throw new Error((await readError(res)).friendly)
  const data = await res.json()
  return (data.models || [])
    .filter((m) => (m.supportedGenerationMethods || []).includes('generateContent'))
    .map((m) => ({ id: m.name.replace(/^models\//, ''), label: m.displayName || m.name }))
    .filter((m) => /gemini/i.test(m.id) && !/embedding|tts|image|audio|live/i.test(m.id))
}

async function readError(res) {
  let detail = ''
  try {
    const body = await res.json()
    detail = (Array.isArray(body) ? body[0] : body)?.error?.message || ''
  } catch {
    // no JSON body
  }
  let friendly
  if (res.status === 400 && /API key/i.test(detail)) friendly = 'The AI key is not valid.'
  else if (res.status === 403) friendly = 'The AI key was refused. Check it in the parent area.'
  else if (res.status === 404) friendly = 'That AI model was not found. Pick another one in the parent area.'
  else if (res.status === 429)
    friendly =
      'The AI usage limit was reached. Wait a minute and try again. If it keeps happening, pick a "Flash-Lite" model in the parent Settings (Pro models are not free).'
  else if (res.status >= 500) friendly = 'The AI service is having trouble right now. Please try again.'
  else friendly = `The AI service returned an error (${res.status}).`
  if (detail && res.status !== 400) friendly += ` [${res.status}: ${detail.slice(0, 160)}]`
  else if (detail) friendly += ` [${detail.slice(0, 160)}]`
  const err = new Error(friendly)
  err.status = res.status
  err.detail = detail
  err.friendly = friendly
  return err
}

// Less "thinking" makes replies much faster. Older models use a budget,
// newer ones a level. If a model rejects this, the request is retried without it.
function thinkingFor(model) {
  const id = model.toLowerCase()
  if (/2\.5/.test(id)) return /flash/.test(id) ? { thinkingBudget: 0 } : null
  if (/(^|-)(1\.5|2\.0)/.test(id)) return null
  return { thinkingLevel: 'low' }
}

export function buildPrompt({ pages, subject, topicZh, topicEn, count }) {
  const english = Math.max(2, Math.round(count / 4))
  const topical = count - english
  let source
  if (pages === 1) {
    source = `The attached photo shows a page of the student's homework. Read it carefully (it is mostly in Traditional Chinese), work out the subject and the exact skill or topic being practiced, and build the practice round on that same skill.`
  } else if (pages > 1) {
    source = `The ${pages} attached photos are pages of the student's homework from the same evening. Read every page carefully (mostly Traditional Chinese) and work out the subject and the skills being practiced. If the pages cover different skills, spread the questions across them; if they cover one skill, practice it in more depth. Use the overall subject and a short topic name that covers the pages.`
  }
  if (source) {
    source += ` Do NOT copy the homework questions and do not give away their answers. Write new questions that practice the same thing. If the photos are unreadable or are not schoolwork, return only {"error": "a short reason in English"}.`
  } else {
    source = `The chosen topic is: ${topicZh || ''} / ${topicEn || ''} (subject: ${subject}). Build the practice round on this topic.`
  }

  return `You write practice questions for a Grade 5 student who follows Taiwan's 108 curriculum. The student reads Traditional Chinese at grade level and reads English at about US Grade 5 level.

${source}

Write exactly ${count} multiple-choice questions:
- ${topical} questions with "kind": "topic". These practice the homework topic at Taiwan Grade 5 level. Give every prompt and option in both Traditional Chinese and natural English. Start easier and get harder.
- ${english} questions with "kind": "english", placed last. These are an English challenge at US Grade 5 level (Common Core ELA), tied to the same topic: vocabulary in context, a short 2 to 4 sentence passage with a comprehension or inference question, or a word problem that needs careful reading. For these, "prompt_en" holds the full question, "prompt_zh" is only a short hint in Chinese (not a translation), and each option has "en" text with "zh" set to "".

Rules:
- Use Traditional Chinese with Taiwan vocabulary. Never use Simplified characters.
- For Mandarin (國語) questions, keep the Chinese words or sentences being tested in Chinese inside both prompts, and explain them in English in "prompt_en".
- Every question has exactly 4 options and exactly one correct answer. Wrong options should come from mistakes a student would really make.
- Check every answer, and work out all math carefully before you write the options. Vary which position holds the correct answer.
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
  if (raw.error) throw new Error(`The AI could not use those photos: ${raw.error}`)
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

// One streamed request. Text arrives a piece at a time, so the connection
// never sits silent and the loading screen can show real progress.
async function streamOnce({ apiKey, model, parts, thinking, signal, onText }) {
  const generationConfig = { responseMimeType: 'application/json', temperature: 0.7 }
  if (thinking) generationConfig.thinkingConfig = thinking
  const res = await fetch(`${BASE}/models/${encodeURIComponent(model)}:streamGenerateContent?alt=sse`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
    body: JSON.stringify({ contents: [{ role: 'user', parts }], generationConfig }),
    signal,
  })
  if (!res.ok) throw await readError(res)

  let text = ''
  let buffer = ''
  let blocked = ''
  const handleLine = (line) => {
    if (!line.startsWith('data:')) return
    const payload = line.slice(5).trim()
    if (!payload || payload === '[DONE]') return
    let event
    try {
      event = JSON.parse(payload)
    } catch {
      return
    }
    if (event.error) {
      const err = new Error(`The AI stopped with an error. [${event.error.message || 'unknown'}]`)
      err.status = event.error.code
      throw err
    }
    if (event.promptFeedback?.blockReason) blocked = event.promptFeedback.blockReason
    for (const part of event.candidates?.[0]?.content?.parts || []) {
      if (part.text && !part.thought) text += part.text
    }
    onText?.(text)
  }

  if (res.body && res.body.getReader) {
    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    for (;;) {
      const { value, done } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split(/\r?\n/)
      buffer = lines.pop()
      lines.forEach(handleLine)
    }
    buffer += decoder.decode()
  } else {
    buffer = await res.text()
  }
  buffer.split(/\r?\n/).forEach(handleLine)

  if (blocked) throw new Error(`The AI refused this request (${blocked}). Try a different photo or topic.`)
  return text.trim()
}

// Errors where another AI service might succeed (limits, outages, network).
export function serviceError(message) {
  const err = new Error(message)
  err.canFallback = true
  return err
}

export const wait = (ms) => new Promise((r) => setTimeout(r, ms))

// Turns the AI's text into a checked round. Copes with code fences or
// extra words around the JSON, which smaller models sometimes add.
export function parseRoundText(text, fallback) {
  if (!text) throw new Error('The AI sent back an empty reply. Please try again.')
  let body = text.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim()
  const start = body.indexOf('{')
  const end = body.lastIndexOf('}')
  if (start > 0 || (end >= 0 && end < body.length - 1)) body = body.slice(start, end + 1)
  let parsed
  try {
    parsed = JSON.parse(body)
  } catch {
    throw new Error('The AI reply was cut off or could not be read. Please try again.')
  }
  return cleanRound(parsed, fallback)
}

// signal: lets the Cancel button stop the request.
// onProgress({ written, total }): how many questions have been written so far.
export async function generateRound({
  apiKey,
  model,
  images = [],
  subject,
  topicZh,
  topicEn,
  count,
  signal,
  onProgress,
}) {
  const parts = images.map((img) => ({ inline_data: { mime_type: img.mimeType, data: img.base64 } }))
  parts.push({ text: buildPrompt({ pages: images.length, subject, topicZh, topicEn, count }) })

  const timer = new AbortController()
  const timeout = setTimeout(() => timer.abort(), TIMEOUT_MS)
  const stop = () => timer.abort()
  signal?.addEventListener('abort', stop)
  const onText = (t) => onProgress?.({ written: Math.min(count, (t.match(/"prompt_en"/g) || []).length), total: count })

  let thinking = thinkingFor(model)
  let text = ''
  try {
    for (let attempt = 1; ; attempt += 1) {
      try {
        onProgress?.({ written: 0, total: count })
        text = await streamOnce({ apiKey, model, parts, thinking, signal: timer.signal, onText })
        break
      } catch (e) {
        if (signal?.aborted) throw new Error('cancelled')
        if (timer.signal.aborted) {
          throw serviceError(
            'The AI took too long (over 2 minutes). Try again, use fewer pages, or pick a "Flash-Lite" model in the parent Settings.',
          )
        }
        // The model does not accept the thinking setting: retry without it.
        if (e.status === 400 && thinking && /think/i.test(e.detail || e.message)) {
          thinking = null
          continue
        }
        const network = e instanceof TypeError
        // A 429 (usage limit) is not retried: retrying only uses up the limit faster.
        const temporary = network || e.status >= 500
        if (attempt < 2 && temporary) {
          await wait(2000)
          continue
        }
        if (network) {
          throw serviceError(
            `Could not reach the AI service. Check the Wi-Fi and try again. [${e.message || 'network error'}]`,
          )
        }
        if (e.status) e.canFallback = true
        throw e
      }
    }
  } finally {
    clearTimeout(timeout)
    signal?.removeEventListener('abort', stop)
  }

  return parseRoundText(text, { subject, topicZh, topicEn })
}

// Shrinks a photo so it uploads quickly, and returns it as base64 JPEG.
export function prepareImage(file, maxSide = 1400) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      const scale = Math.min(1, maxSide / Math.max(img.width, img.height))
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(img.width * scale)
      canvas.height = Math.round(img.height * scale)
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
      const dataUrl = canvas.toDataURL('image/jpeg', 0.82)
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
