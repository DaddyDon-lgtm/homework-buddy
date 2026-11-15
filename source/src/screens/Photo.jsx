import { useRef, useState } from 'react'
import { prepareImage, MAX_PAGES } from '../gemini.js'

export default function Photo({ onBack, onStart }) {
  const cameraRef = useRef(null)
  const galleryRef = useRef(null)
  const [pages, setPages] = useState([])
  const [problem, setProblem] = useState('')
  const [busy, setBusy] = useState(false)
  const full = pages.length >= MAX_PAGES

  async function onPick(e) {
    const files = [...(e.target.files || [])]
    e.target.value = ''
    if (!files.length) return
    setProblem('')
    setBusy(true)
    const room = MAX_PAGES - pages.length
    const added = []
    try {
      for (const file of files.slice(0, room)) added.push(await prepareImage(file))
    } catch (err) {
      setProblem(err.message)
    }
    if (files.length > room) setProblem(`最多 ${MAX_PAGES} 頁 · Up to ${MAX_PAGES} pages per round.`)
    setPages((list) => [...list, ...added].slice(0, MAX_PAGES))
    setBusy(false)
  }

  const removePage = (i) => setPages((list) => list.filter((_, n) => n !== i))

  return (
    <div className="page">
      <header className="topbar">
        <button className="ghost" onClick={onBack}>
          ← 回首頁 Home
        </button>
      </header>
      <h1>拍功課 Snap my homework</h1>
      <p className="lead">
        一頁一頁拍，最多 {MAX_PAGES} 頁。把功課放平，拍清楚。
        <br />
        Take one photo per page, up to {MAX_PAGES} pages. Lay each page flat and keep it sharp.
      </p>

      <input ref={cameraRef} type="file" accept="image/*" capture="environment" hidden onChange={onPick} />
      <input ref={galleryRef} type="file" accept="image/*" multiple hidden onChange={onPick} />

      {pages.length > 0 ? (
        <div className="pages">
          {pages.map((p, i) => (
            <figure key={i} className="page-thumb">
              <img src={p.dataUrl} alt={`Homework page ${i + 1}`} />
              <figcaption>
                第 {i + 1} 頁 · Page {i + 1}
              </figcaption>
              <button className="remove" onClick={() => removePage(i)} aria-label={`Remove page ${i + 1}`}>
                ✕
              </button>
            </figure>
          ))}
        </div>
      ) : (
        <div className="preview preview-empty">📄</div>
      )}
      {busy && <p className="muted">處理照片中… Preparing photos…</p>}
      {problem && <p className="bad-text">{problem}</p>}

      <div className="row wrap">
        <button className="btn secondary" onClick={() => cameraRef.current.click()} disabled={full || busy}>
          📷 {pages.length ? '再拍一頁 Add a page' : '拍照 Take photo'}
        </button>
        <button className="btn secondary" onClick={() => galleryRef.current.click()} disabled={full || busy}>
          🖼️ 相簿 Gallery
        </button>
        {pages.length > 0 && (
          <button
            className="btn"
            disabled={busy}
            onClick={() =>
              onStart({
                source: 'photo',
                images: pages.map(({ mimeType, base64 }) => ({ mimeType, base64 })),
              })
            }
          >
            ✨ 開始練習 Make my practice
            {pages.length > 1 && ` (${pages.length})`}
          </button>
        )}
      </div>
    </div>
  )
}
