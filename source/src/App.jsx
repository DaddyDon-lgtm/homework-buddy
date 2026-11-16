import { useEffect, useRef, useState } from 'react'
import { applyTheme } from './themes.js'
import { useStore, dayKey, starsFor } from './store.jsx'
import { generateWithFallback } from './ai.js'
import Home from './screens/Home.jsx'
import Photo from './screens/Photo.jsx'
import Topics from './screens/Topics.jsx'
import Loading from './screens/Loading.jsx'
import Practice from './screens/Practice.jsx'
import Results from './screens/Results.jsx'
import Parent from './screens/Parent.jsx'
import BeatBattle from './screens/BeatBattle.jsx'
import Lesson from './screens/Lesson.jsx'
import { US_ENGLISH_LESSONS } from './lessons/usEnglish.js'
import { buildBeatPool } from './beat/pool.js'

export default function App() {
  const store = useStore()
  const { settings } = store.state
  const [screen, setScreen] = useState('home')
  const [round, setRound] = useState(null)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(null)
  const [service, setService] = useState('gemini')
  const [beatQuestions, setBeatQuestions] = useState(null)
  const [lessonId, setLessonId] = useState(null)
  const [topicTab, setTopicTab] = useState(null)
  const lastRequest = useRef(null)
  const controller = useRef(null)

  useEffect(() => applyTheme(settings.theme), [settings.theme])

  const goHome = () => {
    setError('')
    setScreen('home')
  }

  // request: { source: 'photo' | 'topic', images?, subject?, topicZh?, topicEn? }
  async function startRound(request) {
    lastRequest.current = request
    setError('')
    if (!settings.apiKey && !settings.openrouterKey) {
      setError('needs-key')
      setScreen('home')
      return
    }
    const ctl = new AbortController()
    controller.current = ctl
    setProgress(null)
    setScreen('loading')
    try {
      const made = await generateWithFallback({
        settings,
        signal: ctl.signal,
        onProgress: setProgress,
        onService: (name) => {
          setService(name)
          setProgress(null)
        },
        ...request,
      })
      if (ctl.signal.aborted) return
      setRound({ ...made, source: request.source, startedAt: Date.now() })
      setScreen('practice')
    } catch (e) {
      if (ctl.signal.aborted) return
      setError(e.message || 'Something went wrong. Please try again.')
      setScreen('home')
    } finally {
      if (controller.current === ctl) controller.current = null
    }
  }

  // Opens Beat Battle with one ticket. justFinished: use that round's questions first.
  function openBeat(justFinished) {
    const { state } = store
    if ((state.tickets || 0) < 1) return
    const questions = buildBeatPool({
      round: justFinished ? round : null,
      sessions: state.sessions,
      vocab: state.vocab,
      langMode: settings.langMode,
    })
    if (questions.length < 4) {
      setError('Beat Battle needs a few more practice questions first. Finish another round!')
      setScreen('home')
      return
    }
    store.useTicket()
    setBeatQuestions(questions)
    setScreen('beat')
  }

  function cancelRound() {
    controller.current?.abort()
    controller.current = null
    goHome()
  }

  function startSample(sample) {
    setError('')
    setRound({ ...sample, source: 'sample', startedAt: Date.now() })
    setScreen('practice')
  }

  function finishRound(answers) {
    const correct = answers.filter((a) => a.correct).length
    const total = answers.length
    const session = {
      id: `${Date.now()}`,
      at: new Date().toISOString(),
      day: dayKey(),
      source: round.source,
      subject: round.subject,
      topicZh: round.topic_zh,
      topicEn: round.topic_en,
      total,
      correct,
      englishTotal: answers.filter((a) => a.kind === 'english').length,
      englishCorrect: answers.filter((a) => a.kind === 'english' && a.correct).length,
      stars: starsFor(correct, total),
      seconds: Math.round((Date.now() - round.startedAt) / 1000),
      words: round.questions.map((q) => q.word).filter(Boolean),
      missed: answers
        .filter((a) => !a.correct)
        .map((a) => ({ promptEn: a.promptEn, promptZh: a.promptZh, rightAnswer: a.rightAnswer, chosen: a.chosen })),
      flaggedCount: answers.filter((a) => a.flagged).length,
      // Every question, for the parent review list.
      items: answers.map((a) => ({
        kind: a.kind,
        promptEn: a.promptEn,
        promptZh: a.promptZh,
        options: a.options,
        answerIndex: a.answerIndex,
        chosenIndex: a.chosenIndex,
        rightAnswer: a.rightAnswer,
        chosen: a.chosen,
        explainEn: a.explainEn,
        correct: a.correct,
        flagged: a.flagged,
        keyWrong: false,
        reviewed: false,
      })),
    }
    store.addSession(session)
    setResult(session)
    setScreen('results')
  }

  switch (screen) {
    case 'photo':
      return <Photo onBack={goHome} onStart={startRound} />
    case 'topics':
      return (
        <Topics
          onBack={goHome}
          onStart={startRound}
          initialSubject={topicTab}
          onLesson={(id) => {
            setLessonId(id)
            setTopicTab('us-english')
            setScreen('lesson')
          }}
        />
      )
    case 'lesson': {
      const lesson = US_ENGLISH_LESSONS.find((l) => l.id === lessonId)
      if (!lesson) return null
      return (
        <Lesson
          key={lesson.id}
          lesson={lesson}
          number={US_ENGLISH_LESSONS.indexOf(lesson) + 1}
          onBack={() => setScreen('topics')}
          onPractice={() =>
            startRound({ source: 'topic', subject: 'us-english', topicZh: lesson.topic, topicEn: lesson.standard })
          }
        />
      )
    }
    case 'loading':
      return (
        <Loading
          pages={lastRequest.current?.images?.length || 0}
          progress={progress}
          backup={service === 'openrouter'}
          onCancel={cancelRound}
        />
      )
    case 'practice':
      return <Practice round={round} langMode={settings.langMode} onQuit={goHome} onFinish={finishRound} />
    case 'results':
      return <Results session={result} onHome={goHome} tickets={store.state.tickets} onBeat={() => openBeat(true)} />
    case 'beat':
      return (
        <BeatBattle
          questions={beatQuestions}
          best={store.state.beat?.best || 0}
          muted={store.state.beat?.muted}
          mascotName={settings.mascotName}
          onMuteChange={store.setBeatMuted}
          onFinish={store.saveBeat}
          onExit={goHome}
        />
      )
    case 'parent':
      return <Parent onBack={goHome} />
    default:
      return (
        <Home
          error={error}
          onClearError={() => setError('')}
          onRetry={lastRequest.current ? () => startRound(lastRequest.current) : null}
          onPhoto={() => setScreen('photo')}
          onTopics={() => setScreen('topics')}
          onSample={startSample}
          onBeat={() => openBeat(false)}
          onParent={() => setScreen('parent')}
        />
      )
  }
}
