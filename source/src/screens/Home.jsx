import { useStore } from '../store.jsx'
import { SAMPLES } from '../samples.js'
import { subjectById } from '../topics.js'

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return { en: 'Good morning', zh: '早安' }
  if (h < 18) return { en: 'Good afternoon', zh: '午安' }
  return { en: 'Good evening', zh: '晚安' }
}

export default function Home({ error, onClearError, onRetry, onPhoto, onTopics, onSample, onParent }) {
  const { state, totalStars, streak } = useStore()
  const { settings, sessions } = state
  const hello = greeting()
  const recent = [...sessions].reverse().slice(0, 3)
  const hasKey = Boolean(settings.apiKey)

  return (
    <div className="page">
      <header className="topbar">
        <div>
          <p className="eyebrow">
            {hello.zh} · {hello.en}
          </p>
          <h1>{settings.childName ? `${settings.childName}!` : '嗨！Hi there!'}</h1>
        </div>
        <button className="ghost" onClick={onParent} aria-label="Parent area">
          👪 Parents
        </button>
      </header>

      <section className="stats">
        <div className="stat">
          <span className="stat-icon">⭐</span>
          <div>
            <strong>{totalStars}</strong>
            <span>星星 Stars</span>
          </div>
        </div>
        <div className="stat">
          <span className="stat-icon">🔥</span>
          <div>
            <strong>{streak}</strong>
            <span>連續天數 Day streak</span>
          </div>
        </div>
        <div className="stat">
          <span className="stat-icon">📚</span>
          <div>
            <strong>{state.vocab.length}</strong>
            <span>英文單字 Words</span>
          </div>
        </div>
      </section>

      {error === 'needs-key' && (
        <div className="notice">
          <p>
            <strong>Almost ready!</strong> A parent needs to add the AI key first (Parents, then Settings). Until
            then, try a sample round below.
          </p>
          <button className="link" onClick={onClearError}>
            OK
          </button>
        </div>
      )}
      {error && error !== 'needs-key' && (
        <div className="notice notice-bad">
          <p>
            <strong>Oops.</strong> {error}
          </p>
          <div className="row">
            {onRetry && (
              <button className="btn small" onClick={onRetry}>
                再試一次 Try again
              </button>
            )}
            <button className="link" onClick={onClearError}>
              Close
            </button>
          </div>
        </div>
      )}

      <section className="actions">
        <button className="big-card card-photo" onClick={onPhoto}>
          <span className="big-emoji">📷</span>
          <span className="big-title">拍功課</span>
          <span className="big-sub">Snap my homework</span>
        </button>
        <button className="big-card card-topic" onClick={onTopics}>
          <span className="big-emoji">🎯</span>
          <span className="big-title">選主題</span>
          <span className="big-sub">Pick a topic</span>
        </button>
      </section>

      <section>
        <h2>{hasKey ? '暖身題 Warm-up rounds' : '試玩 Sample rounds'}</h2>
        <div className="chips">
          {SAMPLES.map((s) => {
            const subject = subjectById(s.subject)
            return (
              <button key={s.id} className="chip" onClick={() => onSample(s)}>
                {subject.emoji} {s.topic_zh} · {s.topic_en}
              </button>
            )
          })}
        </div>
      </section>

      {recent.length > 0 && (
        <section>
          <h2>最近的練習 Recent practice</h2>
          <ul className="list">
            {recent.map((s) => {
              const subject = subjectById(s.subject)
              return (
                <li key={s.id}>
                  <span>
                    {subject.emoji} {s.topicZh || s.topicEn}
                  </span>
                  <span className="muted">
                    {s.correct}/{s.total} · ⭐ {s.stars}
                  </span>
                </li>
              )
            })}
          </ul>
        </section>
      )}
    </div>
  )
}
