import { useMemo, useState } from 'react'
import { useStore, dayKey } from '../store.jsx'
import { SUBJECTS, subjectById } from '../topics.js'
import { listModels, KNOWN_MODELS } from '../gemini.js'
import { listFreeVisionModels, OPENROUTER_DEFAULT } from '../openrouter.js'

function pct(correct, total) {
  return total ? `${Math.round((correct / total) * 100)}%` : 'n/a'
}

function PinGate({ pin, onSetPin, onUnlock, onBack }) {
  const [value, setValue] = useState('')
  const [wrong, setWrong] = useState(false)
  const creating = !pin
  return (
    <div className="page center">
      <h1>Parent area</h1>
      <p className="lead">
        {creating ? 'Choose a 4-digit PIN so settings and reports stay with the grown-ups.' : 'Enter your PIN.'}
      </p>
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault()
          if (creating) {
            if (/^\d{4}$/.test(value)) onSetPin(value)
            else setWrong(true)
          } else if (value === pin) onUnlock()
          else setWrong(true)
        }}
      >
        <input
          className="pin"
          type="password"
          inputMode="numeric"
          autoComplete="off"
          maxLength={4}
          value={value}
          onChange={(e) => {
            setValue(e.target.value.replace(/\D/g, ''))
            setWrong(false)
          }}
          aria-label="PIN"
        />
        <button className="btn" type="submit">
          {creating ? 'Save PIN' : 'Unlock'}
        </button>
      </form>
      {wrong && <p className="bad-text">{creating ? 'Use exactly 4 digits.' : 'That PIN is not right.'}</p>}
      <button className="link" onClick={onBack}>
        ← Back
      </button>
    </div>
  )
}

function Report() {
  const { state, totalStars, streak } = useStore()
  const { sessions, vocab } = state

  const data = useMemo(() => {
    const totals = sessions.reduce(
      (t, s) => ({
        questions: t.questions + s.total,
        correct: t.correct + s.correct,
        seconds: t.seconds + (s.seconds || 0),
        engTotal: t.engTotal + (s.englishTotal || 0),
        engCorrect: t.engCorrect + (s.englishCorrect || 0),
      }),
      { questions: 0, correct: 0, seconds: 0, engTotal: 0, engCorrect: 0 },
    )

    const bySubject = SUBJECTS.map((subject) => {
      const mine = sessions.filter((s) => s.subject === subject.id)
      return {
        subject,
        rounds: mine.length,
        total: mine.reduce((n, s) => n + s.total, 0),
        correct: mine.reduce((n, s) => n + s.correct, 0),
      }
    }).filter((r) => r.rounds > 0)

    const topicMap = new Map()
    for (const s of sessions) {
      const key = `${s.subject}|${s.topicEn || s.topicZh}`
      const row = topicMap.get(key) || { subject: s.subject, zh: s.topicZh, en: s.topicEn, rounds: 0, total: 0, correct: 0 }
      row.rounds += 1
      row.total += s.total
      row.correct += s.correct
      topicMap.set(key, row)
    }
    const topics = [...topicMap.values()].sort((a, b) => a.correct / a.total - b.correct / b.total)

    const week = []
    for (let i = 6; i >= 0; i -= 1) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const key = dayKey(d)
      const mine = sessions.filter((s) => s.day === key)
      week.push({
        key,
        label: d.toLocaleDateString('en-US', { weekday: 'short' }),
        rounds: mine.length,
        questions: mine.reduce((n, s) => n + s.total, 0),
      })
    }
    return { totals, bySubject, topics, week }
  }, [sessions])

  function exportCsv() {
    const head = ['date', 'subject', 'topic_zh', 'topic_en', 'source', 'correct', 'total', 'english_correct', 'english_total', 'stars', 'seconds']
    const rows = sessions.map((s) =>
      [s.at, s.subject, s.topicZh, s.topicEn, s.source, s.correct, s.total, s.englishCorrect, s.englishTotal, s.stars, s.seconds]
        .map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`)
        .join(','),
    )
    const blob = new Blob(['﻿' + [head.join(','), ...rows].join('\n')], { type: 'text/csv;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `homework-practice-${dayKey()}.csv`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  if (sessions.length === 0) {
    return <p className="lead">No practice yet. Reports appear here after the first finished round.</p>
  }

  const maxQ = Math.max(1, ...data.week.map((d) => d.questions))
  const weak = data.topics.filter((t) => t.correct / t.total < 0.7)

  return (
    <>
      <section className="stats">
        <div className="stat">
          <div>
            <strong>{sessions.length}</strong>
            <span>Rounds finished</span>
          </div>
        </div>
        <div className="stat">
          <div>
            <strong>{pct(data.totals.correct, data.totals.questions)}</strong>
            <span>Overall accuracy</span>
          </div>
        </div>
        <div className="stat">
          <div>
            <strong>{pct(data.totals.engCorrect, data.totals.engTotal)}</strong>
            <span>English challenge accuracy</span>
          </div>
        </div>
        <div className="stat">
          <div>
            <strong>{Math.round(data.totals.seconds / 60)} min</strong>
            <span>Time practicing</span>
          </div>
        </div>
        <div className="stat">
          <div>
            <strong>{streak}</strong>
            <span>Day streak</span>
          </div>
        </div>
        <div className="stat">
          <div>
            <strong>{vocab.length}</strong>
            <span>English words met ({totalStars} stars)</span>
          </div>
        </div>
      </section>

      <section>
        <h2>Last 7 days (questions answered)</h2>
        <div className="bars">
          {data.week.map((d) => (
            <div key={d.key} className="bar-col">
              <span className="bar-value">{d.questions || ''}</span>
              <div className="bar" style={{ height: `calc((100% - 46px) * ${d.questions / maxQ})` }} />
              <span className="bar-label">{d.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>By subject</h2>
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Rounds</th>
              <th>Questions</th>
              <th>Accuracy</th>
            </tr>
          </thead>
          <tbody>
            {data.bySubject.map((r) => (
              <tr key={r.subject.id}>
                <td>
                  {r.subject.emoji} {r.subject.en}
                </td>
                <td>{r.rounds}</td>
                <td>{r.total}</td>
                <td>{pct(r.correct, r.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>By topic (weakest first)</h2>
        {weak.length > 0 && (
          <p className="muted">
            Below 70%: {weak.map((t) => t.en || t.zh).join(', ')}. These are worth another round.
          </p>
        )}
        <table>
          <thead>
            <tr>
              <th>Topic</th>
              <th>Rounds</th>
              <th>Accuracy</th>
            </tr>
          </thead>
          <tbody>
            {data.topics.map((t) => (
              <tr key={`${t.subject}-${t.en}-${t.zh}`}>
                <td>
                  {subjectById(t.subject).emoji} {t.en} <span className="muted">{t.zh}</span>
                </td>
                <td>{t.rounds}</td>
                <td>{pct(t.correct, t.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {vocab.length > 0 && (
        <section>
          <h2>English word list</h2>
          <div className="chips">
            {vocab.map((w) => (
              <span key={w.en} className="chip chip-static">
                <strong>{w.en}</strong> {w.zh}
              </span>
            ))}
          </div>
        </section>
      )}

      <button className="btn secondary" onClick={exportCsv}>
        ⬇ Download all results (CSV)
      </button>
    </>
  )
}

function Settings() {
  const { state, updateSettings, resetProgress } = useStore()
  const { settings } = state
  const [models, setModels] = useState([])
  const [status, setStatus] = useState(null)
  const [busy, setBusy] = useState(false)
  const [orModels, setOrModels] = useState([])
  const [orStatus, setOrStatus] = useState(null)
  const [orBusy, setOrBusy] = useState(false)

  async function loadOpenRouterModels() {
    setOrBusy(true)
    setOrStatus(null)
    try {
      const found = await listFreeVisionModels()
      setOrModels(found)
      setOrStatus({ ok: true, text: `${found.length} free models that can read photos.` })
    } catch (e) {
      setOrStatus({ ok: false, text: e.message || 'Could not reach OpenRouter.' })
    } finally {
      setOrBusy(false)
    }
  }

  async function testKey() {
    setBusy(true)
    setStatus(null)
    try {
      const found = await listModels(settings.apiKey.trim())
      setModels(found)
      setStatus({ ok: true, text: `Key works. ${found.length} models available.` })
    } catch (e) {
      setStatus({ ok: false, text: e.message || 'Could not reach the AI service.' })
    } finally {
      setBusy(false)
    }
  }

  const [pinDraft, setPinDraft] = useState('')
  const [pinMsg, setPinMsg] = useState(null)

  function savePin() {
    if (!/^\d{4}$/.test(pinDraft)) {
      setPinMsg({ ok: false, text: 'Use exactly 4 digits.' })
      return
    }
    updateSettings({ pin: pinDraft })
    setPinDraft('')
    setPinMsg({ ok: true, text: 'New PIN saved.' })
  }

  // Known good models first, then anything else the key can use, with no duplicates.
  const modelOptions = []
  const seen = new Set()
  for (const m of [...KNOWN_MODELS, ...models, { id: settings.model, label: settings.model }]) {
    if (!seen.has(m.id)) {
      seen.add(m.id)
      modelOptions.push(m)
    }
  }

  return (
    <div className="form">
      <label>
        Child's name
        <input
          value={settings.childName}
          onChange={(e) => updateSettings({ childName: e.target.value })}
          maxLength={30}
          placeholder="Shown on the home screen"
        />
        <small>Stored only on this device. It is never sent anywhere.</small>
      </label>

      <label>
        Mascot's name
        <input
          value={settings.mascotName}
          onChange={(e) => updateSettings({ mascotName: e.target.value })}
          maxLength={20}
          placeholder="Leave empty for no name"
        />
      </label>

      <h2 className="form-heading">Main AI: Gemini</h2>
      <label>
        Gemini API key
        <input
          type="password"
          value={settings.apiKey}
          onChange={(e) => updateSettings({ apiKey: e.target.value.trim() })}
          placeholder="Paste the key from Google AI Studio"
          autoComplete="off"
        />
        <small>
          Create a free key at aistudio.google.com (Get API key). The key is stored only on this device and is sent
          only to Google.
        </small>
      </label>
      <div className="row">
        <button className="btn small" onClick={testKey} disabled={!settings.apiKey || busy}>
          {busy ? 'Checking…' : 'Test key and load models'}
        </button>
        {status && <span className={status.ok ? 'good-text' : 'bad-text'}>{status.text}</span>}
      </div>

      <label>
        AI model
        <select value={settings.model} onChange={(e) => updateSettings({ model: e.target.value })}>
          {modelOptions.map((m) => (
            <option key={m.id} value={m.id}>
              {m.label === m.id ? m.id : `${m.label} (${m.id})`}
            </option>
          ))}
        </select>
        <small>Flash-Lite is the best fit for a free key. Choose 3.8 Flash if billing is turned on, for more careful answers.</small>
      </label>

      <h2 className="form-heading">Free backup AI (optional)</h2>
      <p className="muted form-note">
        If Gemini refuses (for example, its free limit is used up), the app switches to OpenRouter automatically.
        Free models allow about 50 rounds a day.
      </p>
      <label>
        OpenRouter API key
        <input
          type="password"
          value={settings.openrouterKey}
          onChange={(e) => updateSettings({ openrouterKey: e.target.value.trim() })}
          placeholder="Paste the key from openrouter.ai/keys"
          autoComplete="off"
        />
        <small>
          Stored only on this device and sent only to OpenRouter. Free models only: it cannot be charged unless you buy
          credits on openrouter.ai.
        </small>
      </label>
      <div className="row">
        <button className="btn small" onClick={loadOpenRouterModels} disabled={orBusy}>
          {orBusy ? 'Loading…' : 'Load free models'}
        </button>
        {orStatus && <span className={orStatus.ok ? 'good-text' : 'bad-text'}>{orStatus.text}</span>}
      </div>
      <label>
        OpenRouter model
        <select
          value={settings.openrouterModel}
          onChange={(e) => updateSettings({ openrouterModel: e.target.value })}
        >
          {[
            ...(orModels.some((m) => m.id === settings.openrouterModel)
              ? []
              : [{ id: settings.openrouterModel, label: settings.openrouterModel }]),
            ...(orModels.some((m) => m.id === OPENROUTER_DEFAULT) || settings.openrouterModel === OPENROUTER_DEFAULT
              ? []
              : [{ id: OPENROUTER_DEFAULT, label: 'Free Models Router' }]),
            ...orModels,
          ].map((m) => (
            <option key={m.id} value={m.id}>
              {m.label === m.id ? m.id : `${m.label} (${m.id})`}
            </option>
          ))}
        </select>
        <small>
          "Free Models Router" picks a different free model each time. For steadier quality, press "Load free models"
          and choose one; the list puts the best guesses first.
        </small>
      </label>

      <h2 className="form-heading">Practice</h2>
      <label>
        Questions per round
        <select value={settings.numQuestions} onChange={(e) => updateSettings({ numQuestions: Number(e.target.value) })}>
          {[6, 8, 10, 12].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <small>About a quarter of each round is the English challenge.</small>
      </label>

      <label>
        Language on topic questions
        <select value={settings.langMode} onChange={(e) => updateSettings({ langMode: e.target.value })}>
          <option value="en-first">English first, tap to see Chinese</option>
          <option value="zh-first">Chinese first, tap to see English</option>
          <option value="both">Show both together</option>
        </select>
      </label>

      <label>
        Change parent PIN
        <div className="row">
          <input
            type="password"
            inputMode="numeric"
            autoComplete="off"
            maxLength={4}
            value={pinDraft}
            onChange={(e) => {
              setPinDraft(e.target.value.replace(/\D/g, ''))
              setPinMsg(null)
            }}
            placeholder="New 4-digit PIN"
          />
          <button className="btn small" type="button" onClick={savePin} disabled={pinDraft.length !== 4}>
            Save PIN
          </button>
        </div>
        {pinMsg && <small className={pinMsg.ok ? 'good-text' : 'bad-text'}>{pinMsg.text}</small>}
      </label>

      <button
        className="btn danger small"
        onClick={() => {
          if (window.confirm('Erase all practice results, stars and words on this device?')) resetProgress()
        }}
      >
        Erase all progress
      </button>
    </div>
  )
}

export default function Parent({ onBack }) {
  const { state, updateSettings } = useStore()
  const [unlocked, setUnlocked] = useState(false)
  const [tab, setTab] = useState('report')

  if (!unlocked) {
    return (
      <PinGate
        pin={state.settings.pin}
        onBack={onBack}
        onUnlock={() => setUnlocked(true)}
        onSetPin={(pin) => {
          updateSettings({ pin })
          setUnlocked(true)
          setTab('settings')
        }}
      />
    )
  }

  return (
    <div className="page">
      <header className="topbar">
        <button className="ghost" onClick={onBack}>
          ← Home
        </button>
        <div className="tabs">
          <button className={`tab ${tab === 'report' ? 'tab-on' : ''}`} onClick={() => setTab('report')}>
            📊 Report
          </button>
          <button className={`tab ${tab === 'settings' ? 'tab-on' : ''}`} onClick={() => setTab('settings')}>
            ⚙️ Settings
          </button>
        </div>
      </header>
      <h1>{tab === 'report' ? state.settings.childName ? `${state.settings.childName}'s progress` : 'Progress report' : 'Settings'}</h1>
      {tab === 'report' ? <Report /> : <Settings />}
    </div>
  )
}
