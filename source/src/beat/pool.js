// Builds the questions for one Beat Battle song from what she has practiced:
// the round she just finished, her recent rounds, and her English word list.
// Only questions with short answers fit on the falling tiles.

const MAX_OPTION = 30
const MAX_PROMPT = 140

function shuffle(list) {
  const a = [...list]
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function fits(prompt, options) {
  return (
    prompt &&
    prompt.length <= MAX_PROMPT &&
    options.length === 4 &&
    options.every((o) => o && o.length <= MAX_OPTION) &&
    new Set(options).size === 4
  )
}

// Moves the right answer to a random lane.
function place(prompt, options, answer) {
  const tagged = options.map((text, i) => ({ text, right: i === answer }))
  const mixed = shuffle(tagged)
  return { prompt, options: mixed.map((o) => o.text), answer: mixed.findIndex((o) => o.right) }
}

function fromRound(round, zhFirst) {
  const us = String(round.subject || '').startsWith('us-')
  return (round.questions || [])
    .map((q) => {
      const pick = (en, zh) => (us || !zhFirst ? en || zh : zh || en)
      const prompt = q.kind === 'english' ? q.prompt_en : pick(q.prompt_en, q.prompt_zh)
      const options = q.options.map((o) => pick(o.en, o.zh))
      return fits(prompt, options) ? place(prompt, options, q.answer) : null
    })
    .filter(Boolean)
}

function fromItems(items, zhFirst) {
  return (items || [])
    .map((it) => {
      if (!Array.isArray(it.options) || !Number.isInteger(it.answerIndex)) return null
      const options = it.options.map((o) => {
        const [en, zh] = String(o).split(' / ')
        return zhFirst && zh ? zh : en
      })
      const prompt = zhFirst ? it.promptZh || it.promptEn : it.promptEn || it.promptZh
      return fits(prompt, options) ? place(prompt, options, it.answerIndex) : null
    })
    .filter(Boolean)
}

function fromVocab(vocab) {
  const words = vocab.filter((w) => w.en && w.zh && w.zh.length <= MAX_OPTION)
  if (words.length < 4) return []
  return shuffle(words)
    .slice(0, 12)
    .map((w) => {
      const others = shuffle(words.filter((x) => x.zh !== w.zh)).slice(0, 3)
      if (others.length < 3) return null
      const options = [w.zh, ...others.map((x) => x.zh)]
      return fits(`What does “${w.en}” mean?`, options) ? place(`What does “${w.en}” mean?`, options, 0) : null
    })
    .filter(Boolean)
}

export function buildBeatPool({ round, sessions, vocab, langMode, count = 12 }) {
  const zhFirst = langMode === 'zh-first'
  const fresh = round ? shuffle(fromRound(round, zhFirst)) : []
  const recent = shuffle(
    [...sessions]
      .reverse()
      .slice(round ? 0 : 0, 4)
      .flatMap((s) => fromItems(s.items, zhFirst)),
  )
  const words = fromVocab(vocab)

  // Mostly what she just practiced, then recent rounds, then vocabulary.
  const picked = []
  const seen = new Set()
  for (const q of [...fresh.slice(0, 8), ...shuffle([...recent, ...words]), ...fresh.slice(8)]) {
    if (picked.length >= count) break
    if (seen.has(q.prompt)) continue
    seen.add(q.prompt)
    picked.push(q)
  }
  return shuffle(picked)
}
