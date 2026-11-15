import { useRef, useState } from 'react'
import { useStore, dayKey, starsFor } from './store.jsx'
import { generateRound } from './gemini.js'
import Home from './screens/Home.jsx'
import Photo from './screens/Photo.jsx'
import Topics from './screens/Topics.jsx'
import Loading from './screens/Loading.jsx'
import Practice from './screens/Practice.jsx'
import Results from './screens/Results.jsx'
import Parent from './screens/Parent.jsx'

export default function App() {
  const store = useStore()
  const { settings } = store.state
  const [screen, setScreen] = useState('home')
  const [round, setRound] = useState(null)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(null)
  const lastRequest = useRef(null)
  const controller = useRef(null)

  const goHome = () => {
    setError('')
    setScreen('home')
  }

  // request: { source: 'photo' | 'topic', images?, subject?, topicZh?, topicEn? }
  async function startRound(request) {
    lastRequest.current = request
    setError('')
    if (!settings.apiKey) {
      setError('needs-key')
      setScreen('home')
      return
    }
    const ctl = new AbortController()
    controller.current = ctl
    setProgress(null)
    setScreen('loading')
    try {
      const made = await generateRound({
        apiKey: settings.apiKey,
        model: settings.model,
        count: settings.numQuestions,
        signal: ctl.signal,
        onProgress: setProgress,
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
    }
    store.addSession(session)
    setResult(session)
    setScreen('results')
  }

  switch (screen) {
    case 'photo':
      return <Photo onBack={goHome} onStart={startRound} />
    case 'topics':
      return <Topics onBack={goHome} onStart={startRound} />
    case 'loading':
      return (
        <Loading
          pages={lastRequest.current?.images?.length || 0}
          progress={progress}
          onCancel={cancelRound}
        />
      )
    case 'practice':
      return <Practice round={round} langMode={settings.langMode} onQuit={goHome} onFinish={finishRound} />
    case 'results':
      return <Results session={result} onHome={goHome} />
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
          onParent={() => setScreen('parent')}
        />
      )
  }
}
