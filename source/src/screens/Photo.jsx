import { useRef, useState } from 'react'
import { prepareImage } from '../gemini.js'

export default function Photo({ onBack, onStart }) {
  const cameraRef = useRef(null)
  const galleryRef = useRef(null)
  const [image, setImage] = useState(null)
  const [problem, setProblem] = useState('')

  async function onPick(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setProblem('')
    try {
      setImage(await prepareImage(file))
    } catch (err) {
      setProblem(err.message)
    }
  }

  return (
    <div className="page">
      <header className="topbar">
        <button className="ghost" onClick={onBack}>
          ← 回首頁 Home
        </button>
      </header>
      <h1>拍功課 Snap my homework</h1>
      <p className="lead">
        把功課放平，拍清楚一頁就好。
        <br />
        Lay the page flat and take a clear photo of one page.
      </p>

      <input ref={cameraRef} type="file" accept="image/*" capture="environment" hidden onChange={onPick} />
      <input ref={galleryRef} type="file" accept="image/*" hidden onChange={onPick} />

      {image ? (
        <div className="preview">
          <img src={image.dataUrl} alt="Homework page" />
        </div>
      ) : (
        <div className="preview preview-empty">📄</div>
      )}
      {problem && <p className="bad-text">{problem}</p>}

      <div className="row wrap">
        <button className="btn secondary" onClick={() => cameraRef.current.click()}>
          📷 {image ? '重拍 Retake' : '拍照 Take photo'}
        </button>
        <button className="btn secondary" onClick={() => galleryRef.current.click()}>
          🖼️ 相簿 Gallery
        </button>
        {image && (
          <button
            className="btn"
            onClick={() => onStart({ source: 'photo', image: { mimeType: image.mimeType, base64: image.base64 } })}
          >
            ✨ 開始練習 Make my practice
          </button>
        )}
      </div>
    </div>
  )
}
