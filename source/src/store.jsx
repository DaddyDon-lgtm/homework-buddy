import { createContext, useContext, useEffect, useMemo, useState } from 'react'

// All data lives on the device for Version 1 (localStorage).
// The shape is kept flat and JSON-friendly so cloud sync can be added later.
const KEY = 'homework-buddy-v1'

const defaults = {
  settings: {
    childName: '',
    apiKey: '',
    model: 'gemini-3.5-flash-lite',
    openrouterKey: '',
    openrouterModel: 'openrouter/free',
    numQuestions: 8,
    langMode: 'en-first',
    theme: 'idol',
    mascotName: 'Mia', // 'en-first' | 'zh-first' | 'both'
    pin: '',
  },
  sessions: [],
  vocab: [],
}

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return defaults
    const saved = JSON.parse(raw)
    // Older installs used a moving alias; move them to the new default.
    if (saved.settings?.model === 'gemini-flash-latest') saved.settings.model = defaults.settings.model
    return {
      ...defaults,
      ...saved,
      settings: { ...defaults.settings, ...(saved.settings || {}) },
    }
  } catch {
    return defaults
  }
}

function save(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    // Storage can be full or blocked; the app keeps working in memory.
  }
}

export function dayKey(d = new Date()) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function calcStreak(sessions, today = new Date()) {
  const days = new Set(sessions.map((s) => s.day))
  const cursor = new Date(today)
  // A streak stays alive if she practiced today or yesterday.
  if (!days.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1)
  let streak = 0
  while (days.has(dayKey(cursor))) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

export function starsFor(correct, total) {
  if (!total) return 0
  let stars = correct + 3 // one per correct answer, three for finishing
  if (correct === total) stars += 5 // perfect round bonus
  return stars
}

const Ctx = createContext(null)

export function StoreProvider({ children }) {
  const [state, setState] = useState(load)

  useEffect(() => save(state), [state])

  const api = useMemo(
    () => ({
      state,
      totalStars: state.sessions.reduce((sum, s) => sum + (s.stars || 0), 0),
      streak: calcStreak(state.sessions),
      updateSettings(patch) {
        setState((s) => ({ ...s, settings: { ...s.settings, ...patch } }))
      },
      addSession(session) {
        setState((s) => {
          const known = new Set(s.vocab.map((w) => w.en.toLowerCase()))
          const fresh = (session.words || []).filter(
            (w) => w.en && !known.has(w.en.toLowerCase()),
          )
          return {
            ...s,
            sessions: [...s.sessions, session],
            vocab: [...s.vocab, ...fresh.map((w) => ({ ...w, day: session.day }))],
          }
        })
      },
      resetProgress() {
        setState((s) => ({ ...s, sessions: [], vocab: [] }))
      },
    }),
    [state],
  )

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}

export function useStore() {
  return useContext(Ctx)
}
