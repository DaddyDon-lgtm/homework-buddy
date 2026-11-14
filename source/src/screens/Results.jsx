import { useStore } from '../store.jsx'

export default function Results({ session, onHome }) {
  const { totalStars, streak } = useStore()
  const perfect = session.correct === session.total
  const ratio = session.total ? session.correct / session.total : 0
  const headline = perfect
    ? { zh: '全對！太厲害了！', en: 'Perfect round!' }
    : ratio >= 0.7
      ? { zh: '做得很好！', en: 'Great work!' }
      : { zh: '繼續加油！', en: 'Good effort. Keep going!' }

  return (
    <div className="page center">
      <div className="burst">{perfect ? '🏆' : '🎉'}</div>
      <h1>{headline.zh}</h1>
      <p className="lead">{headline.en}</p>

      <section className="stats">
        <div className="stat">
          <span className="stat-icon">✅</span>
          <div>
            <strong>
              {session.correct}/{session.total}
            </strong>
            <span>答對 Correct</span>
          </div>
        </div>
        <div className="stat">
          <span className="stat-icon">⭐</span>
          <div>
            <strong>+{session.stars}</strong>
            <span>總共 Total {totalStars}</span>
          </div>
        </div>
        <div className="stat">
          <span className="stat-icon">🔥</span>
          <div>
            <strong>{streak}</strong>
            <span>連續天數 Day streak</span>
          </div>
        </div>
      </section>

      {session.words.length > 0 && (
        <section className="left">
          <h2>今天的英文單字 Words from this round</h2>
          <div className="chips">
            {session.words.map((w) => (
              <span key={w.en} className="chip chip-static">
                <strong>{w.en}</strong> {w.zh}
              </span>
            ))}
          </div>
        </section>
      )}

      {session.missed.length > 0 && (
        <section className="left">
          <h2>再看一次 Look again</h2>
          <ul className="list">
            {session.missed.map((m, i) => (
              <li key={i} className="stack">
                <span>{m.promptEn || m.promptZh}</span>
                <span className="good-text">✔ {m.rightAnswer}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <button className="btn" onClick={onHome}>
        🏠 回首頁 Home
      </button>
    </div>
  )
}
