import { useEffect, useState } from 'react'

export default function Loading({ pages, progress, onCancel }) {
  const [seconds, setSeconds] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setSeconds((n) => n + 1), 1000)
    return () => clearInterval(t)
  }, [])

  const written = progress?.written || 0
  const total = progress?.total || 0

  let line
  if (written > 0) {
    line = { zh: `已經寫好 ${written} 題，共 ${total} 題`, en: `${written} of ${total} questions written` }
  } else if (pages > 1) {
    line = { zh: `正在看妳的 ${pages} 頁功課…`, en: `Reading your ${pages} homework pages…` }
  } else if (pages === 1) {
    line = { zh: '正在看妳的功課…', en: 'Reading your homework…' }
  } else {
    line = { zh: '正在出題目…', en: 'Writing your questions…' }
  }

  return (
    <div className="page center">
      <div className="spinner">⭐</div>
      <h1>{line.zh}</h1>
      <p className="lead">{line.en}</p>
      {total > 0 && (
        <div className="progress loading-progress" aria-hidden="true">
          {Array.from({ length: total }, (_, i) => (
            <span key={i} className={`dot ${i < written ? 'dot-good' : ''}`} />
          ))}
        </div>
      )}
      <p className="muted">
        {seconds} 秒 seconds{seconds >= 45 && ' · 有點慢，再等一下 This one is slow, hang on'}
      </p>
      <button className="ghost" onClick={onCancel}>
        ✕ 取消 Cancel
      </button>
    </div>
  )
}
