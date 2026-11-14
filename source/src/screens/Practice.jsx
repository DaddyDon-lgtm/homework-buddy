import { useState } from 'react'
import { subjectById } from '../topics.js'

const LETTERS = ['A', 'B', 'C', 'D']

export default function Practice({ round, langMode, onQuit, onFinish }) {
  const [index, setIndex] = useState(0)
  const [chosen, setChosen] = useState(null)
  const [showOther, setShowOther] = useState(false)
  const [answers, setAnswers] = useState([])

  const q = round.questions[index]
  const total = round.questions.length
  const subject = subjectById(round.subject)
  const isEnglish = q.kind === 'english'
  const answered = chosen !== null

  // Which language leads. English challenge questions always lead with English.
  const enFirst = isEnglish || langMode !== 'zh-first'
  const both = !isEnglish && langMode === 'both'
  const primary = (o) => (enFirst ? o.en || o.zh : o.zh || o.en)
  const secondary = (o) => (enFirst ? o.zh : o.en)
  const promptPrimary = enFirst ? q.prompt_en || q.prompt_zh : q.prompt_zh || q.prompt_en
  const promptSecondary = enFirst ? q.prompt_zh : q.prompt_en
  const revealed = both || showOther || answered
  const toggleLabel = isEnglish ? '💡 提示 Hint' : enFirst ? '🔁 看中文' : '🔁 See English'

  function choose(i) {
    if (answered) return
    setChosen(i)
    const right = q.options[q.answer]
    const pick = q.options[i]
    setAnswers((list) => [
      ...list,
      {
        kind: q.kind,
        correct: i === q.answer,
        promptEn: q.prompt_en,
        promptZh: q.prompt_zh,
        rightAnswer: right.en || right.zh,
        chosen: pick.en || pick.zh,
      },
    ])
  }

  function next() {
    if (index + 1 >= total) {
      onFinish(answers)
      return
    }
    setIndex(index + 1)
    setChosen(null)
    setShowOther(false)
  }

  const correct = answered && chosen === q.answer

  return (
    <div className="page">
      <header className="topbar">
        <button
          className="ghost"
          onClick={() => {
            if (answers.length === 0 || window.confirm('Leave this round? Your stars for it will not be saved.')) onQuit()
          }}
        >
          ✕ 離開 Quit
        </button>
        <span className="muted">
          {subject.emoji} {round.topic_zh} · {round.topic_en}
        </span>
      </header>

      <div className="progress" aria-label={`Question ${index + 1} of ${total}`}>
        {round.questions.map((_, i) => (
          <span
            key={i}
            className={`dot ${i < answers.length ? (answers[i].correct ? 'dot-good' : 'dot-bad') : ''} ${
              i === index ? 'dot-now' : ''
            }`}
          />
        ))}
      </div>

      <div className="question">
        {isEnglish && <span className="badge">🇺🇸 English Challenge</span>}
        <p className="prompt">{promptPrimary}</p>
        {revealed && promptSecondary && <p className="prompt-other">{promptSecondary}</p>}
        {!revealed && promptSecondary && (
          <button className="link" onClick={() => setShowOther(true)}>
            {toggleLabel}
          </button>
        )}
      </div>

      <div className="options">
        {q.options.map((o, i) => {
          let cls = 'option'
          if (answered && i === q.answer) cls += ' option-good'
          else if (answered && i === chosen) cls += ' option-bad'
          else if (answered) cls += ' option-dim'
          return (
            <button key={i} className={cls} onClick={() => choose(i)} disabled={answered}>
              <span className="letter">{LETTERS[i]}</span>
              <span className="option-text">
                <span>{primary(o)}</span>
                {revealed && secondary(o) && secondary(o) !== primary(o) && <small>{secondary(o)}</small>}
              </span>
            </button>
          )
        })}
      </div>

      {answered && (
        <div className={`feedback ${correct ? 'feedback-good' : 'feedback-bad'}`}>
          <h2>{correct ? '答對了！Correct! ⭐' : '再想想 Not quite'}</h2>
          {q.explain_en && <p>{q.explain_en}</p>}
          {q.explain_zh && <p className="muted">{q.explain_zh}</p>}
          {q.word && (
            <p className="word">
              📚 <strong>{q.word.en}</strong> {q.word.zh && <span>= {q.word.zh}</span>}
            </p>
          )}
          <button className="btn" onClick={next}>
            {index + 1 >= total ? '看結果 See my results' : '下一題 Next'} →
          </button>
        </div>
      )}
    </div>
  )
}
