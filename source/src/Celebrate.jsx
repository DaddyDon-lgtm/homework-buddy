import { useStore } from './store.jsx'
import { themeById } from './themes.js'

// A short burst shown when an answer is right. It ignores taps, so it
// never gets in the way of the Next button.
export default function Celebrate() {
  const { state } = useStore()
  const theme = themeById(state.settings.theme)
  const pieces = Array.from({ length: 14 }, (_, i) => ({
    char: theme.sparkles[i % theme.sparkles.length],
    angle: (360 / 14) * i + (i % 2 ? 8 : -8),
    dist: 120 + (i % 3) * 45,
    delay: (i % 4) * 40,
  }))
  return (
    <div className="celebrate" aria-hidden="true">
      <div className="celebrate-rays" />
      <div className="celebrate-text">
        <strong>{theme.cheer.big}</strong>
        <span>{theme.cheer.small}</span>
      </div>
      {pieces.map((p, i) => (
        <span
          key={i}
          className="celebrate-piece"
          style={{ '--angle': `${p.angle}deg`, '--dist': `${p.dist}px`, '--delay': `${p.delay}ms` }}
        >
          {p.char}
        </span>
      ))}
    </div>
  )
}
