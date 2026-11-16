import { useState } from 'react'
import { SUBJECTS } from '../topics.js'
import { lessonForTopic, lessonsFor, lessonsDone } from '../lessons/index.js'
import { useStore } from '../store.jsx'

export default function Topics({ onBack, onStart, onLesson, initialSubject }) {
  const { state } = useStore()
  const [subjectId, setSubjectId] = useState(initialSubject || SUBJECTS[0].id)
  const [custom, setCustom] = useState('')
  const subject = SUBJECTS.find((s) => s.id === subjectId)

  const start = (topic) =>
    onStart({ source: 'topic', subject: subject.id, topicZh: topic.zh, topicEn: topic.en })

  return (
    <div className="page">
      <header className="topbar">
        <button className="ghost" onClick={onBack}>
          ← 回首頁 Home
        </button>
      </header>
      <h1>選主題 Pick a topic</h1>

      <div className="tabs">
        {SUBJECTS.map((s) => (
          <button
            key={s.id}
            className={`tab ${s.id === subjectId ? 'tab-on' : ''}`}
            onClick={() => setSubjectId(s.id)}
          >
            <span>{s.emoji}</span> {s.zh} <small>{s.en}</small>
          </button>
        ))}
      </div>

      {lessonsFor(subject.id).length > 0 && (
        <p className="muted lesson-intro">
          📖 Each topic has a 10-minute lesson. Start with the lesson, then practice.{' '}
          <strong>
            {lessonsDone(state.lessons, subject.id)} of {lessonsFor(subject.id).length} lessons done
          </strong>
        </p>
      )}

      <div className="topic-grid">
        {subject.topics.map((t) => {
          const lesson = lessonForTopic(subject.id, t.zh)
          if (!lesson) {
            return (
              <button key={t.zh} className="topic" onClick={() => start(t)}>
                <strong>{t.zh}</strong>
                <span>{t.en}</span>
              </button>
            )
          }
          const n = lessonsFor(subject.id).indexOf(lesson) + 1
          const done = state.lessons?.[lesson.id]?.done
          return (
            <div key={t.zh} className={`topic topic-lesson ${done ? 'is-done' : ''}`}>
              <span className="lesson-chip">
                {done ? '✓ Lesson done' : `📖 Lesson ${n}`}
              </span>
              <strong>{t.zh}</strong>
              <span>{t.en}</span>
              <div className="row topic-actions">
                <button className="btn small" onClick={() => onLesson(lesson.id)}>
                  {done ? 'Review lesson' : 'Start lesson'}
                </button>
                <button className="btn small secondary" onClick={() => start(t)}>
                  Practice
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <form
        className="custom"
        onSubmit={(e) => {
          e.preventDefault()
          const text = custom.trim()
          if (text) start({ zh: text, en: text })
        }}
      >
        <label htmlFor="custom-topic">找不到嗎？自己輸入 Can't find it? Type your own:</label>
        <div className="row">
          <input
            id="custom-topic"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder="例如：圓周長 or photosynthesis"
            maxLength={80}
          />
          <button className="btn" type="submit" disabled={!custom.trim()}>
            Go
          </button>
        </div>
      </form>
    </div>
  )
}
