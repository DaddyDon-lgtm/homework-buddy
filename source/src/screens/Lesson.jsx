import { useEffect, useState } from 'react'
import Mascot from '../Mascot.jsx'
import { useStore } from '../store.jsx'

// Turns **bold**, *italic* and new lines into elements.
function Rich({ text }) {
  if (!text) return null
  return String(text)
    .split('\n')
    .map((line, li) => (
      <span key={li} className="rich-line">
        {line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>
          if (part.startsWith('*') && part.endsWith('*') && part.length > 2) return <em key={i}>{part.slice(1, -1)}</em>
          return part
        })}
      </span>
    ))
}

const plain = (text) => String(text || '').replace(/\*\*?/g, '').replace(/→/g, ' becomes ')

// Read-aloud with the tablet's built-in voice.
function useSpeech() {
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window
  const [speaking, setSpeaking] = useState(false)
  useEffect(() => () => supported && window.speechSynthesis.cancel(), [supported])
  function speak(text) {
    if (!supported) return
    const synth = window.speechSynthesis
    if (speaking) {
      synth.cancel()
      setSpeaking(false)
      return
    }
    synth.cancel()
    const u = new SpeechSynthesisUtterance(plain(text))
    u.lang = 'en-US'
    u.rate = 0.95
    const voice = synth.getVoices().find((v) => v.lang === 'en-US') || synth.getVoices().find((v) => v.lang?.startsWith('en'))
    if (voice) u.voice = voice
    u.onend = () => setSpeaking(false)
    u.onerror = () => setSpeaking(false)
    setSpeaking(true)
    synth.speak(u)
  }
  function stop() {
    if (supported) window.speechSynthesis.cancel()
    setSpeaking(false)
  }
  return { supported, speaking, speak, stop }
}

const STEPS = ['Goal', 'Learn', 'Watch out', 'Try it', 'Done']

export default function Lesson({ lesson, number, onBack, onPractice }) {
  const { state, completeLesson } = useStore()
  const mascotName = state.settings.mascotName
  const [step, setStep] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [qi, setQi] = useState(0)
  const [picked, setPicked] = useState(null)
  const [showHint, setShowHint] = useState(false)
  const [results, setResults] = useState([])
  const speech = useSpeech()

  const go = (n) => {
    speech.stop()
    setStep(n)
    window.scrollTo(0, 0)
  }

  const learnText = lesson.learn
    .map((b) => [b.h, b.text, ...(b.ex || []), b.passage].filter(Boolean).join('. '))
    .join('. ')
  const readText =
    step === 0
      ? `${lesson.goal}. ${lesson.hook.text}. ${lesson.hook.ask}${revealed ? `. ${lesson.hook.reveal}` : ''}`
      : step === 1
        ? learnText
        : step === 2
          ? `Watch out! ${lesson.watch}`
          : step === 3
            ? `${lesson.tryIt[qi].passage ? `${lesson.tryIt[qi].passage} ` : ''}${lesson.tryIt[qi].q}. ${lesson.tryIt[qi].options.join('. ')}`
            : ''

  const q = lesson.tryIt[qi]
  const answered = picked !== null
  const correct = answered && picked === q.answer
  const score = results.filter(Boolean).length

  function pick(i) {
    if (answered) return
    speech.stop()
    setPicked(i)
    setResults((r) => [...r, i === q.answer])
  }

  function nextQuestion() {
    if (qi + 1 < lesson.tryIt.length) {
      setQi(qi + 1)
      setPicked(null)
      setShowHint(false)
      return
    }
    completeLesson(lesson.id, score)
    go(4)
  }

  function retry() {
    setQi(0)
    setPicked(null)
    setShowHint(false)
    setResults([])
    go(1)
  }

  return (
    <div className="page lesson">
      <header className="topbar">
        <button className="ghost" onClick={() => (speech.stop(), onBack())}>
          ← Lessons
        </button>
        {speech.supported && step < 4 && (
          <button className="ghost" onClick={() => speech.speak(readText)} aria-label="Read aloud">
            {speech.speaking ? '⏹ Stop' : '🔊 Read to me'}
          </button>
        )}
      </header>

      <div className="lesson-head">
        <p className="eyebrow">
          📘 Lesson {number} · {lesson.standard}
        </p>
        <h1 className="title-glow">{lesson.topic}</h1>
        <div className="lesson-steps" aria-label={`Step ${step + 1} of ${STEPS.length}`}>
          {STEPS.map((s, i) => (
            <span key={s} className={`lesson-step ${i === step ? 'on' : ''} ${i < step ? 'done' : ''}`}>
              {s}
            </span>
          ))}
        </div>
      </div>

      {step === 0 && (
        <>
          <section className="lesson-card goal">
            <h2>🎯 Today&apos;s goal</h2>
            <p className="lesson-big">
              <Rich text={lesson.goal} />
            </p>
          </section>
          <section className="lesson-card hook">
            <div className="hook-row">
              <Mascot mood="happy" size={86} className="bob" />
              <div>
                <p className="lesson-example">
                  <Rich text={lesson.hook.text} />
                </p>
                <p className="lesson-ask">
                  <Rich text={lesson.hook.ask} />
                </p>
              </div>
            </div>
            {revealed ? (
              <p className="lesson-reveal">
                <Rich text={lesson.hook.reveal} />
              </p>
            ) : (
              <button className="btn secondary" onClick={() => (speech.stop(), setRevealed(true))}>
                🤔 Think, then tap to see
              </button>
            )}
          </section>
          {revealed && (
            <button className="btn lesson-next" onClick={() => go(1)}>
              Let&apos;s learn →
            </button>
          )}
        </>
      )}

      {step === 1 && (
        <>
          {lesson.learn.map((b, i) => (
            <section key={i} className="lesson-card">
              {b.h && <h2>{b.h}</h2>}
              {b.text && (
                <p>
                  <Rich text={b.text} />
                </p>
              )}
              {b.passage && (
                <blockquote className="lesson-passage">
                  <Rich text={b.passage} />
                </blockquote>
              )}
              {b.ex && (
                <ul className="lesson-ex">
                  {b.ex.map((e, j) => (
                    <li key={j}>
                      <Rich text={e} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <button className="btn lesson-next" onClick={() => go(2)}>
            Got it →
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <section className="lesson-card watch">
            <div className="hook-row">
              <Mascot mood="think" size={86} />
              <div>
                <h2>⚠️ Watch out!</h2>
                <p className="lesson-big">
                  <Rich text={lesson.watch} />
                </p>
              </div>
            </div>
          </section>
          <button className="btn lesson-next" onClick={() => go(3)}>
            Try it myself →
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <p className="muted">
            Question {qi + 1} of {lesson.tryIt.length}
          </p>
          {q.passage && (
            <blockquote className="lesson-passage">
              <Rich text={q.passage} />
            </blockquote>
          )}
          <section className="question">
            <p className="prompt">
              <Rich text={q.q} />
            </p>
            {!answered &&
              (showHint ? (
                <p className="prompt-other">💡 {q.hint}</p>
              ) : (
                <button className="link" onClick={() => setShowHint(true)}>
                  💡 Hint
                </button>
              ))}
          </section>
          <div className="options options-one">
            {q.options.map((o, i) => {
              let cls = 'option'
              if (answered && i === q.answer) cls += ' option-good'
              else if (answered && i === picked) cls += ' option-bad'
              else if (answered) cls += ' option-dim'
              return (
                <button key={i} className={cls} onClick={() => pick(i)} disabled={answered}>
                  <span className="letter">{'ABCD'[i]}</span>
                  <span className="option-text">
                    <span>
                      <Rich text={o} />
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
          {answered && (
            <div className={`feedback ${correct ? 'feedback-good' : 'feedback-bad'}`}>
              <Mascot mood={correct ? 'cheer' : 'oops'} size={84} className="feedback-mascot" />
              <div className="feedback-body">
                <h2>{correct ? 'Correct! ⭐' : 'Not quite'}</h2>
                <p>
                  <Rich text={q.why} />
                </p>
                <button className="btn" onClick={nextQuestion}>
                  {qi + 1 < lesson.tryIt.length ? 'Next →' : 'Finish →'}
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {step === 4 && (
        <section className="lesson-card center-card">
          <Mascot mood={score >= 2 ? 'cheer' : 'happy'} size={140} className="bob" />
          <h2 className="title-glow">{score === 3 ? 'Perfect! You got all 3!' : score === 2 ? 'Nice work!' : 'Good start!'}</h2>
          <p className="lesson-big">
            You got <strong>{score} of 3</strong> right.
          </p>
          {score < 2 ? (
            <>
              <p>
                {mascotName ? `${mascotName} says: ` : ''}It might help to read the lesson one more time before you practice.
              </p>
              <div className="row wrap center-row">
                <button className="btn secondary" onClick={retry}>
                  📖 Read it again
                </button>
                <button className="btn" onClick={onPractice}>
                  Practice anyway →
                </button>
              </div>
            </>
          ) : (
            <>
              <p>{mascotName ? `${mascotName} says: ` : ''}You&apos;re ready to practice! Finishing the practice round earns a 🎟️ Beat Battle ticket.</p>
              <button className="btn" onClick={onPractice}>
                ✨ Practice {lesson.topic.split(':')[0].toLowerCase()} →
              </button>
            </>
          )}
        </section>
      )}
    </div>
  )
}
