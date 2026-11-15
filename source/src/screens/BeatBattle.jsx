import { useEffect, useRef, useState } from 'react'
import Mascot from '../Mascot.jsx'
import { createMusic } from '../beat/music.js'

const BPM = 112
const BEAT = 60 / BPM
const COUNT_IN = 4 // beats before the first question appears
const GAP = 8 // beats between answers (time to read and choose)
const FALL = 6 // beats the tiles take to fall to the line
const PERFECT = 0.12
const GREAT = 0.24
const LATE = 0.32
const LANES = ['A', 'B', 'C', 'D']
const JUDGE = {
  perfect: { label: 'PERFECT!', points: 300 },
  great: { label: 'GREAT!', points: 200 },
  good: { label: 'GOOD', points: 100 },
  miss: { label: 'MISS', points: 0 },
}

function gradeFor(correct, total, perfects) {
  const r = total ? correct / total : 0
  if (r >= 0.95 && perfects >= total / 2) return 'S'
  if (r >= 0.85) return 'A'
  if (r >= 0.65) return 'B'
  return 'C'
}

export default function BeatBattle({ questions, best, muted: mutedStart, onMuteChange, onFinish, onExit, mascotName }) {
  const [phase, setPhase] = useState('ready') // ready | playing | done
  const [noteIndex, setNoteIndex] = useState(-1)
  const [hud, setHud] = useState({ score: 0, combo: 0, maxCombo: 0, correct: 0, perfects: 0, meter: 0 })
  const [judge, setJudge] = useState(null)
  const [laneFx, setLaneFx] = useState({})
  const [count, setCount] = useState(null)
  const [muted, setMuted] = useState(Boolean(mutedStart))
  const [result, setResult] = useState(null)

  const stageRef = useRef(null)
  const tileRefs = useRef([])
  const game = useRef(null)

  // Clean up audio and timers when leaving.
  useEffect(
    () => () => {
      const g = game.current
      if (!g) return
      cancelAnimationFrame(g.raf)
      g.music?.stop()
      setTimeout(() => g.ctx?.close?.(), 300)
    },
    [],
  )

  function now(g) {
    const latency = g.ctx.outputLatency || g.ctx.baseLatency || 0
    return g.ctx.currentTime - latency
  }

  function start() {
    const Ctx = window.AudioContext || window.webkitAudioContext
    const ctx = new Ctx()
    const music = createMusic(ctx, BPM)
    music.setMuted(muted)
    const musicStart = ctx.currentTime + 0.35
    const playStart = musicStart + COUNT_IN * BEAT
    const notes = questions.map((q, k) => {
      const arrive = playStart + (GAP + k * GAP) * BEAT
      return { ...q, show: arrive - GAP * BEAT, fallFrom: arrive - FALL * BEAT, arrive, result: null }
    })
    const g = {
      ctx,
      music,
      notes,
      playStart,
      end: notes[notes.length - 1].arrive + 2 * BEAT,
      current: -1,
      score: 0,
      combo: 0,
      maxCombo: 0,
      correct: 0,
      perfects: 0,
      fans: 0,
      raf: 0,
    }
    game.current = g
    // Read-only peek for automated tests.
    window.__beat = { get state() { return { now: now(g), notes: g.notes.map(({ arrive, answer, show, result }) => ({ arrive, answer, show, result })) } } }
    music.start(musicStart, COUNT_IN)
    setPhase('playing')
    g.raf = requestAnimationFrame(frame)
  }

  function resolve(g, k, kind, lane) {
    const note = g.notes[k]
    if (note.result) return
    note.result = kind
    if (kind === 'miss') {
      g.combo = 0
    } else {
      g.combo += 1
      g.correct += 1
      if (kind === 'perfect') g.perfects += 1
      g.maxCombo = Math.max(g.maxCombo, g.combo)
      const mult = Math.min(4, 1 + Math.floor((g.combo - 1) / 5))
      g.score += JUDGE[kind].points * mult
      g.fans += kind === 'perfect' ? 1 : kind === 'great' ? 0.8 : 0.5
    }
    g.music.hit(kind !== 'miss')
    setJudge({ kind, label: JUDGE[kind].label, key: `${k}-${kind}` })
    setLaneFx({ [note.answer]: 'right', ...(lane !== undefined && lane !== note.answer ? { [lane]: 'wrong' } : {}), k })
    setHud({
      score: g.score,
      combo: g.combo,
      maxCombo: g.maxCombo,
      correct: g.correct,
      perfects: g.perfects,
      meter: Math.min(1, g.fans / g.notes.length),
    })
  }

  function frame() {
    const g = game.current
    if (!g) return
    const t = now(g)

    // Which question is on screen
    let k = -1
    for (let i = 0; i < g.notes.length; i += 1) if (t >= g.notes[i].show) k = i
    if (k !== g.current) {
      g.current = k
      setNoteIndex(k)
      setLaneFx({})
    }
    if (t < g.playStart) {
      const left = Math.ceil((g.playStart - t) / BEAT)
      setCount((c) => (c === left ? c : left))
    } else {
      setCount((c) => (c === null ? c : null))
    }

    // Anything not answered in time is a miss
    g.notes.forEach((n, i) => {
      if (!n.result && t > n.arrive + LATE) resolve(g, i, 'miss')
    })

    // Move the tiles and pulse the stage on the beat
    if (k >= 0) {
      const n = g.notes[k]
      const p = Math.max(0, Math.min(1, (t - n.fallFrom) / (n.arrive - n.fallFrom)))
      tileRefs.current.forEach((el) => {
        if (el) el.style.setProperty('--fall', p.toFixed(4))
      })
    }
    if (stageRef.current) {
      const phaseInBeat = (((t - g.playStart) / BEAT) % 1 + 1) % 1
      stageRef.current.style.setProperty('--pulse', (1 - phaseInBeat).toFixed(3))
    }

    if (t > g.end) {
      finish(g)
      return
    }
    g.raf = requestAnimationFrame(frame)
  }

  function finish(g) {
    g.music.stop()
    const total = g.notes.length
    const res = {
      score: g.score,
      correct: g.correct,
      total,
      maxCombo: g.maxCombo,
      perfects: g.perfects,
      grade: gradeFor(g.correct, total, g.perfects),
      newBest: g.score > (best || 0),
    }
    setResult(res)
    setPhase('done')
    onFinish?.(res)
  }

  function tap(lane) {
    const g = game.current
    if (!g || phase !== 'playing') return
    const k = g.current
    if (k < 0) return
    const n = g.notes[k]
    if (n.result) return
    if (lane !== n.answer) {
      resolve(g, k, 'miss', lane)
      return
    }
    const diff = Math.abs(now(g) - n.arrive)
    resolve(g, k, diff <= PERFECT ? 'perfect' : diff <= GREAT ? 'great' : 'good', lane)
  }

  function toggleMute() {
    const m = !muted
    setMuted(m)
    game.current?.music?.setMuted(m)
    onMuteChange?.(m)
  }

  const note = noteIndex >= 0 ? questions[noteIndex] : null
  const resolved = game.current?.notes?.[noteIndex]?.result

  if (phase === 'done' && result) {
    return (
      <div className="page center beat-end">
        <Mascot mood={result.grade === 'C' ? 'happy' : 'cheer'} size={150} className="bob" />
        <div className={`beat-grade grade-${result.grade}`}>{result.grade}</div>
        {result.newBest && <p className="beat-newbest">✦ 新紀錄！New best score! ✦</p>}
        <section className="stats">
          <div className="stat">
            <span className="stat-icon">🎵</span>
            <div>
              <strong>{result.score.toLocaleString()}</strong>
              <span>分數 Score</span>
            </div>
          </div>
          <div className="stat">
            <span className="stat-icon">✅</span>
            <div>
              <strong>
                {result.correct}/{result.total}
              </strong>
              <span>答對 Correct</span>
            </div>
          </div>
          <div className="stat">
            <span className="stat-icon">🔥</span>
            <div>
              <strong>{result.maxCombo}</strong>
              <span>最高連擊 Best combo</span>
            </div>
          </div>
        </section>
        <p className="muted">
          最佳紀錄 Best: {Math.max(best || 0, result.score).toLocaleString()}
        </p>
        <button className="btn" onClick={onExit}>
          🏠 回首頁 Home
        </button>
      </div>
    )
  }

  return (
    <div className="beat" ref={stageRef}>
      <div className="beat-lights" aria-hidden="true" />
      <header className="beat-top">
        <button className="ghost" onClick={onExit}>
          ✕
        </button>
        <div className="beat-score">
          <strong>{hud.score.toLocaleString()}</strong>
          <span>{hud.combo >= 2 ? `${hud.combo} COMBO` : ' '}</span>
        </div>
        <button className="ghost" onClick={toggleMute} aria-label={muted ? 'Sound on' : 'Sound off'}>
          {muted ? '🔇' : '🔊'}
        </button>
      </header>

      <div className="beat-meter" aria-label="Fan meter">
        <div className="beat-meter-fill" style={{ width: `${Math.round(hud.meter * 100)}%` }} />
        <span>👏 Fans</span>
      </div>

      <div className="beat-question">
        {phase === 'ready' && <p className="beat-title">🎵 Beat Battle</p>}
        {phase === 'playing' && count !== null && <p className="beat-count">{count}</p>}
        {phase === 'playing' && count === null && note && <p className="beat-prompt">{note.prompt}</p>}
        {judge && (
          <p key={judge.key} className={`beat-judge judge-${judge.kind}`}>
            {judge.label}
          </p>
        )}
      </div>

      <div className="beat-lanes">
        {LANES.map((letter, lane) => (
          <button
            key={letter}
            className={`beat-lane lane-${lane} ${laneFx[lane] ? `fx-${laneFx[lane]}` : ''}`}
            onPointerDown={(e) => {
              e.preventDefault()
              tap(lane)
            }}
            disabled={phase !== 'playing'}
            aria-label={note ? `${letter}: ${note.options[lane]}` : letter}
          >
            {note && count === null && (
              <span
                ref={(el) => (tileRefs.current[lane] = el)}
                className={`beat-tile ${resolved ? (lane === note.answer ? 'tile-right' : 'tile-gone') : ''}`}
              >
                <b>{letter}</b>
                {note.options[lane]}
              </span>
            )}
          </button>
        ))}
        <div className="beat-line" aria-hidden="true" />
      </div>

      <footer className="beat-crowd" aria-hidden="true">
        <Mascot mood={judge?.kind === 'miss' ? 'oops' : 'cheer'} size={84} className="beat-mia" />
        <div className="beat-sticks" style={{ '--hype': hud.meter }}>
          {Array.from({ length: 14 }, (_, i) => (
            <i key={i} style={{ '--i': i }} />
          ))}
        </div>
      </footer>

      {phase === 'ready' && (
        <div className="beat-start">
          <p className="beat-how">
            選出正確答案，跟著節拍在亮線上點下去！
            <br />
            <span>Tap the right answer when it reaches the glowing line. On the beat = PERFECT!</span>
          </p>
          <button className="btn beat-go" onClick={start}>
            ▶ 開始 Start
          </button>
          {mascotName && <p className="muted">{mascotName} is ready to dance! 🎶</p>}
          {best > 0 && <p className="muted">最佳紀錄 Best: {best.toLocaleString()}</p>}
        </div>
      )}
    </div>
  )
}
