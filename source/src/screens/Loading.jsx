import { useEffect, useState } from 'react'

const LINES = [
  { zh: '正在出題目…', en: 'Writing your questions…' },
  { zh: '正在檢查答案…', en: 'Double-checking the answers…' },
  { zh: '加一點英文挑戰…', en: 'Adding an English challenge…' },
  { zh: '快好了！', en: 'Almost there!' },
]

export default function Loading({ fromPhoto }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((n) => Math.min(n + 1, LINES.length - 1)), 3500)
    return () => clearInterval(t)
  }, [])
  const first = fromPhoto ? { zh: '正在看妳的功課…', en: 'Reading your homework…' } : LINES[0]
  const line = i === 0 ? first : LINES[i]
  return (
    <div className="page center">
      <div className="spinner">⭐</div>
      <h1>{line.zh}</h1>
      <p className="lead">{line.en}</p>
    </div>
  )
}
