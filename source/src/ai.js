// Picks which AI service writes the round.
// Gemini goes first; if it refuses (limits, outage, network) and an OpenRouter
// key is set, the free OpenRouter backup takes over automatically.

import { generateRound as generateGemini } from './gemini.js'
import { generateRoundOpenRouter } from './openrouter.js'

// onService(name): tells the loading screen which service is working.
export async function generateWithFallback({ settings, onService, ...request }) {
  const common = { count: settings.numQuestions, ...request }
  const hasGemini = Boolean(settings.apiKey)
  const hasOpenRouter = Boolean(settings.openrouterKey)

  if (!hasGemini && !hasOpenRouter) throw new Error('needs-key')

  let usedFallback = false
  if (hasGemini) {
    try {
      onService?.('gemini')
      return { ...(await generateGemini({ ...common, apiKey: settings.apiKey, model: settings.model })), service: 'gemini' }
    } catch (e) {
      if (!hasOpenRouter || !e.canFallback || request.signal?.aborted) throw e
      usedFallback = true
    }
  }

  onService?.('openrouter')
  try {
    const round = await generateRoundOpenRouter({
      ...common,
      apiKey: settings.openrouterKey,
      model: settings.openrouterModel,
    })
    return { ...round, service: 'openrouter' }
  } catch (e) {
    if (usedFallback && e.message !== 'cancelled') e.message = `Gemini was unavailable, and the backup failed too. ${e.message}`
    throw e
  }
}
