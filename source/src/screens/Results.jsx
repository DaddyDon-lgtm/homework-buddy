import { useStore } from '../store.jsx'
import Mascot from '../Mascot.jsx'
import Celebrate from '../Celebrate.jsx'

export default function Results({ session, onHome, tickets, onBeat }) {
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
      {ratio >= 0.7 && <Celebrate />}
      <Mascot mood={ratio >= 0.5 ? 'cheer' : 'happy'} size={170} className="bob" />
      <h1 className="title-glow">
        {perfect && '🏆 '}
        {headline.zh}
      </h1>
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

      {session.flaggedCount > 0 && (
        <p className="flag-done">
          🚩 妳標記了 {session.flaggedCount} 題給爸媽檢查。 You flagged {session.flaggedCount} question for a parent to check.
        </p>
      )}

      {session.words.length > 0 && (
        <section className="left">
          <h2>今天的英文單字 Words from this round</h2>
          <div className="chips">
            {session.words.map((w, i) => (
              <span key={`${w.en}-${i}`} className="chip chip-static">
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

      {tickets > 0 && (
        <button className="game-card" onClick={onBeat}>
          <span className="game-icon">🎵</span>
          <div>
            <strong>Beat Battle unlocked!</strong>
            <span>用剛剛的題目來打節拍 Play with the questions you just practiced</span>
          </div>
          <span className="tickets">🎟️ × {tickets}</span>
        </button>
      )}
      <button className="btn" onClick={onHome}>
        🏠 回首頁 Home
      </button>
    </div>
  )
}
