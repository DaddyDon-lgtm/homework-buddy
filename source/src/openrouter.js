// OpenRouter: a free backup when Gemini refuses (for example, usage limits).
// Uses only free models (ids ending in ":free"), so the key cannot be charged
// as long as no credits are bought on the OpenRouter account.

import { buildPrompt, parseRoundText, serviceError, wait } from './gemini.js'

const BASE = 'https://openrouter.ai/api/v1'
const TIMEOUT_MS = 150000

export const OPENROUTER_DEFAULT = 'openrouter/free'

// Free models that can read images, best guesses first.
// Google's Gemma models are often busy on the shared free pool, so they come after Nemotron.
const PREFERRED = [/nemotron.*super.*vl/i, /gemma-?[34]/i, /qwen.*vl/i, /nemotron.*vl/i, /mistral-small/i, /llama-4/i]

export async function listFreeVisionModels() {
  const res = await fetch(`${BASE}/models`)
  if (!res.ok) throw new Error(`Could not load the OpenRouter model list (${res.status}).`)
  const data = await res.json()
  const models = (data.data || [])
    .filter((m) => /:free$/.test(m.id) || m.id === OPENROUTER_DEFAULT)
    .filter((m) => (m.architecture?.input_modalities || []).includes('image'))
    .map((m) => ({ id: m.id, label: m.name || m.id }))
  const rank = (m) => {
    const i = PREFERRED.findIndex((re) => re.test(m.id))
    return i === -1 ? PREFERRED.length : i
  }
  return models.sort((a, b) => rank(a) - rank(b) || a.label.localeCompare(b.label))
}

async function readError(res) {
  let detail = ''
  try {
    const body = await res.json()
    detail = body?.error?.message || ''
    const raw = body?.error?.metadata?.raw
    if (raw && typeof raw === 'string') detail += ` ${raw}`
  } catch {
    // no JSON body
  }
  let friendly
  if (res.status === 401) friendly = 'The OpenRouter key is not valid. Check it in the parent area.'
  else if (res.status === 402) friendly = 'That OpenRouter model is not free. Pick a model ending in "(free)".'
  else if (res.status === 429)
    friendly = 'The free OpenRouter limit was reached (about 50 rounds a day). Try again later.'
  else if (res.status === 404 && /data policy|privacy|training/i.test(detail))
    friendly = 'OpenRouter blocked the free model because of a privacy setting. See Settings > Privacy on openrouter.ai.'
  else if (res.status === 404) friendly = 'That OpenRouter model is not available right now. Pick another one.'
  else if (res.status >= 500) friendly = 'The OpenRouter service is having trouble right now. Please try again.'
  else friendly = `OpenRouter returned an error (${res.status}).`
  if (detail) friendly += ` [${res.status}: ${detail.trim().slice(0, 160)}]`
  const err = new Error(friendly)
  err.status = res.status
  return err
}

async function streamOnce({ apiKey, model, content, signal, onText }) {
  const res = await fetch(`${BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'X-Title': 'Homework Buddy',
    },
    body: JSON.stringify({
      model,
      stream: true,
      temperature: 0.7,
      messages: [{ role: 'user', content }],
    }),
    signal,
  })
  if (!res.ok) throw await readError(res)

  let text = ''
  let buffer = ''
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
      const err = new Error(`OpenRouter stopped with an error. [${event.error.message || 'unknown'}]`)
      err.status = event.error.code
      throw err
    }
    const piece = event.choices?.[0]?.delta?.content
    if (typeof piece === 'string') text += piece
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
  return text.trim()
}

export async function generateRoundOpenRouter({
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
  const content = images.map((img) => ({
    type: 'image_url',
    image_url: { url: `data:${img.mimeType};base64,${img.base64}` },
  }))
  content.push({ type: 'text', text: buildPrompt({ pages: images.length, subject, topicZh, topicEn, count }) })

  const timer = new AbortController()
  const timeout = setTimeout(() => timer.abort(), TIMEOUT_MS)
  const stop = () => timer.abort()
  signal?.addEventListener('abort', stop)
  const onText = (t) => onProgress?.({ written: Math.min(count, (t.match(/"prompt_en"/g) || []).length), total: count })

  let text = ''
  let triedRouter = false
  model = model || OPENROUTER_DEFAULT
  try {
    for (let attempt = 1; ; attempt += 1) {
      try {
        onProgress?.({ written: 0, total: count })
        text = await streamOnce({ apiKey, model, content, signal: timer.signal, onText })
        break
      } catch (e) {
        if (signal?.aborted) throw new Error('cancelled')
        if (timer.signal.aborted) throw serviceError('The free backup AI took too long. Please try again.')
        const network = e instanceof TypeError
        if (attempt < 2 && (network || e.status >= 500)) {
          await wait(2000)
          continue
        }
        // The chosen free model is busy: let OpenRouter pick another free one.
        if (e.status === 429 && model !== OPENROUTER_DEFAULT && !triedRouter) {
          triedRouter = true
          model = OPENROUTER_DEFAULT
          continue
        }
        if (network) {
          throw serviceError(`Could not reach OpenRouter. Check the Wi-Fi and try again. [${e.message}]`)
        }
        throw e
      }
    }
  } finally {
    clearTimeout(timeout)
    signal?.removeEventListener('abort', stop)
  }
  return parseRoundText(text, { subject, topicZh, topicEn })
}
