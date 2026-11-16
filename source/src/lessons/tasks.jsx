import { useState } from 'react'
import { MapColonies, MapRevWar, REV_PLACES } from './maps.jsx'
import { EAST } from './mapdata.js'

// Hands-on Try It questions. Tapping works better than dragging on a tablet:
// tap a card to pick it up, then tap where it goes. Tap a placed card to take it back.
//
// sort:  { type: 'sort', q, items: [...], buckets: [...], answers: [bucket index per item] }
// order: { type: 'order', q, items: [...in the correct order], show: [display order of item indexes] }

export function SortTask({ q, onDone }) {
  const [place, setPlace] = useState(() => q.items.map(() => null))
  const [sel, setSel] = useState(null)
  const [checked, setChecked] = useState(false)
  const allPlaced = place.every((p) => p !== null)

  function drop(b) {
    if (checked || sel === null) return
    setPlace((p) => p.map((v, i) => (i === sel ? b : v)))
    setSel(null)
  }
  function takeBack(i) {
    if (checked) return
    setPlace((p) => p.map((v, k) => (k === i ? null : v)))
    setSel(i)
  }
  function check() {
    setChecked(true)
    const right = place.filter((b, i) => b === q.answers[i]).length
    onDone(right === q.items.length, right)
  }

  return (
    <div className="task">
      {!checked && <p className="task-help">👆 Tap a card, then tap the box where it belongs.</p>}
      {place.some((p) => p === null) && (
        <div className="task-pool">
          {q.items.map((t, i) =>
            place[i] === null ? (
              <button key={i} className={`chip ${sel === i ? 'chip-sel' : ''}`} onClick={() => setSel(sel === i ? null : i)}>
                {t}
              </button>
            ) : null,
          )}
        </div>
      )}
      <div className={`task-buckets cols-${q.buckets.length}`}>
        {q.buckets.map((name, b) => (
          <div
            key={b}
            className={`bucket ${sel !== null ? 'bucket-ready' : ''}`}
            role="button"
            tabIndex={0}
            aria-label={`Put in ${name}`}
            onClick={() => drop(b)}
          >
            <p className="bucket-title">{name}</p>
            {q.items.map((t, i) => {
              if (place[i] !== b) return null
              const ok = q.answers[i] === b
              const cls = checked ? (ok ? 'chip chip-good' : 'chip chip-bad') : 'chip chip-in'
              return (
                <button
                  key={i}
                  className={cls}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (sel !== null) drop(b)
                    else takeBack(i)
                  }}
                >
                  {checked ? (ok ? '✓ ' : '✗ ') : ''}
                  {t}
                  {checked && !ok && <small className="chip-fix"> → {q.buckets[q.answers[i]]}</small>}
                </button>
              )
            })}
          </div>
        ))}
      </div>
      {allPlaced && !checked && (
        <button className="btn task-check" onClick={check}>
          Check my answer ✓
        </button>
      )}
    </div>
  )
}

export function OrderTask({ q, onDone }) {
  const [seq, setSeq] = useState([])
  const [checked, setChecked] = useState(false)
  const n = q.items.length
  const show = q.show || q.items.map((_, i) => i)

  function check() {
    setChecked(true)
    const right = seq.filter((v, k) => v === k).length
    onDone(right === n, right)
  }

  return (
    <div className="task">
      {!checked && <p className="task-help">👆 Tap the events in order, from first to last. Tap a placed one to take it back.</p>}
      {seq.length < n && (
        <div className="task-pool">
          {show
            .filter((i) => !seq.includes(i))
            .map((i) => (
              <button key={i} className="chip" onClick={() => !checked && setSeq((s) => [...s, i])}>
                {q.items[i]}
              </button>
            ))}
        </div>
      )}
      <ol className="order-slots">
        {Array.from({ length: n }, (_, k) => {
          const i = seq[k]
          const filled = i !== undefined
          const ok = filled && i === k
          return (
            <li key={k} className={`slot ${filled ? 'slot-filled' : ''} ${checked ? (ok ? 'slot-good' : 'slot-bad') : ''}`}>
              <span className="slot-num">{k + 1}</span>
              {filled ? (
                <button className="slot-chip" onClick={() => !checked && setSeq((s) => s.filter((v) => v !== i))} disabled={checked}>
                  {checked ? (ok ? '✓ ' : '✗ ') : ''}
                  {q.items[i]}
                </button>
              ) : (
                <span className="slot-empty">{k === 0 ? 'first' : k === n - 1 ? 'last' : ''}</span>
              )}
            </li>
          )
        })}
      </ol>
      {checked && seq.some((v, k) => v !== k) && (
        <p className="task-help">
          <strong>Correct order:</strong> {q.items.join(' → ')}
        </p>
      )}
      {seq.length === n && !checked && (
        <button className="btn task-check" onClick={check}>
          Check my order ✓
        </button>
      )}
    </div>
  )
}

export function MapPickTask({ q, onDone }) {
  const [picked, setPicked] = useState(null)
  const [checked, setChecked] = useState(false)
  const pick = { picked, checked, answer: q.answer }
  const nameOf = (id) =>
    q.map === 'colonies' ? EAST.states.find((s) => s.id === id)?.name : REV_PLACES.find((p) => p[0] === id)?.[1]
  function check() {
    setChecked(true)
    onDone(picked === q.answer, picked === q.answer ? 1 : 0)
  }
  return (
    <div className="task">
      {!checked && <p className="task-help">👆 Tap the map, then check. You can change your mind before checking.</p>}
      {q.map === 'colonies' ? (
        <MapColonies pick={pick} onPickState={setPicked} />
      ) : (
        <MapRevWar pick={pick} onPickPlace={setPicked} />
      )}
      {picked && !checked && (
        <div className="row map-pick-row">
          <span className="task-help">
            You picked: <strong>{nameOf(picked)}</strong>
          </span>
          <button className="btn task-check" onClick={check}>
            Check ✓
          </button>
        </div>
      )}
      {checked && picked !== q.answer && (
        <p className="task-help">
          You picked {nameOf(picked)}. The answer is <strong>{q.answerName}</strong> (in green).
        </p>
      )}
    </div>
  )
}

export const taskText = (q) =>
  q.type === 'map-pick' ? q.q : q.type ? `${q.q}. ${q.items.join('. ')}` : `${q.q}. ${q.options.join('. ')}`
