// Mia: an original chibi red Shiba with an idol headset.
// Moods: happy, cheer, think, oops. The headset uses the theme's accent colour.

const COAT = '#ec8f45'
const COAT_DARK = '#d6782f'
const CREAM = '#fff3df'
const EAR = '#ffc9bd'
const INK = '#2b1d3a'

export default function Mascot({ mood = 'happy', size = 120, className = '' }) {
  const cheer = mood === 'cheer'
  return (
    <svg
      className={`mascot mascot-${mood} ${className}`}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      role="img"
      aria-label="Mia the Shiba mascot"
    >
      {/* curled tail */}
      <g className="mascot-tail">
        <circle cx="148" cy="146" r="25" fill={COAT} />
        <circle cx="151" cy="143" r="12" fill={CREAM} />
        <circle cx="153" cy="141" r="5" fill={COAT} />
      </g>

      {/* body and chest */}
      <ellipse cx="100" cy="166" rx="38" ry="28" fill={COAT} />
      <path d="M80 150 Q100 140 120 150 Q122 178 100 190 Q78 178 80 150 Z" fill={CREAM} />

      {/* paws */}
      {cheer ? (
        <>
          <ellipse cx="60" cy="134" rx="10" ry="17" transform="rotate(-35 60 134)" fill={COAT} />
          <ellipse cx="140" cy="134" rx="10" ry="17" transform="rotate(35 140 134)" fill={COAT} />
          <circle cx="51" cy="121" r="9" fill={CREAM} />
          <circle cx="149" cy="121" r="9" fill={CREAM} />
        </>
      ) : (
        <>
          <ellipse cx="78" cy="184" rx="12" ry="8" fill={CREAM} />
          <ellipse cx="122" cy="184" rx="12" ry="8" fill={CREAM} />
        </>
      )}

      {/* ears */}
      <path d="M44 66 Q38 30 50 16 Q58 12 64 20 L88 44 Z" fill={COAT} />
      <path d="M156 66 Q162 30 150 16 Q142 12 136 20 L112 44 Z" fill={COAT} />
      <path d="M52 56 Q48 34 55 26 L78 46 Z" fill={EAR} />
      <path d="M148 56 Q152 34 145 26 L122 46 Z" fill={EAR} />

      {/* head */}
      <ellipse cx="100" cy="94" rx="64" ry="55" fill={COAT} />

      {/* cream cheeks and muzzle (urajiro) */}
      <circle cx="60" cy="114" r="24" fill={CREAM} />
      <circle cx="140" cy="114" r="24" fill={CREAM} />
      <ellipse cx="100" cy="124" rx="34" ry="24" fill={CREAM} />
      <path d="M84 104 Q100 92 116 104 L112 116 L88 116 Z" fill={CREAM} />

      {/* forehead shading */}
      <path d="M78 48 Q100 40 122 48 Q100 58 78 48 Z" fill={COAT_DARK} opacity="0.5" />

      {/* eyebrow dots */}
      <ellipse cx="78" cy="78" rx="7" ry="4.5" fill={CREAM} />
      <ellipse cx="122" cy="78" rx="7" ry="4.5" fill={CREAM} />

      {/* headset */}
      <path d="M38 94 C38 34 162 34 162 94" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
      <rect x="30" y="86" width="14" height="24" rx="6" fill="currentColor" />
      <rect x="156" y="86" width="14" height="24" rx="6" fill="currentColor" />
      <path d="M38 108 Q44 134 70 134" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="72" cy="134" r="5" fill="currentColor" />

      {/* star clip */}
      <path
        className="mascot-star"
        d="M146 30 l4.6 9.4 10.4 1.5-7.5 7.3 1.8 10.3-9.3-4.9-9.3 4.9 1.8-10.3-7.5-7.3 10.4-1.5z"
        fill="#ffd84d"
        stroke="#f2b400"
        strokeWidth="1.5"
      />

      {/* blush */}
      <ellipse cx="62" cy="116" rx="10" ry="6" fill="#ff7fa8" opacity="0.45" />
      <ellipse cx="138" cy="116" rx="10" ry="6" fill="#ff7fa8" opacity="0.45" />

      <Eyes mood={mood} />

      {/* nose */}
      <path d="M93 110 Q100 105 107 110 Q104 117 100 117 Q96 117 93 110 Z" fill={INK} />
      <ellipse cx="98" cy="109" rx="2.2" ry="1.4" fill="#fff" opacity="0.7" />

      <Mouth mood={mood} />

      {mood === 'think' && (
        <path className="mascot-sweat" d="M152 64 Q158 74 152 78 Q146 74 152 64 Z" fill="#8fd8ff" />
      )}
    </svg>
  )
}

function Eyes({ mood }) {
  if (mood === 'cheer') {
    return (
      <g fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round">
        <path d="M70 98 Q80 86 90 98" />
        <path d="M110 98 Q120 86 130 98" />
      </g>
    )
  }
  if (mood === 'oops') {
    return (
      <g fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M71 88 L87 96 L71 104" />
        <path d="M129 88 L113 96 L129 104" />
      </g>
    )
  }
  const dy = mood === 'think' ? -4 : 0
  const dx = mood === 'think' ? 3 : 0
  return (
    <g className="mascot-eyes">
      {[80, 120].map((cx) => (
        <g key={cx}>
          <ellipse cx={cx} cy={96} rx="9.5" ry="12" fill={INK} />
          <ellipse cx={cx + dx} cy={100 + dy} rx="5.5" ry="6.5" fill="#7a4b2a" opacity="0.7" />
          <circle cx={cx - 3 + dx} cy={90 + dy} r="3.8" fill="#fff" />
          <circle cx={cx + 4 + dx} cy={101 + dy} r="1.7" fill="#fff" />
        </g>
      ))}
    </g>
  )
}

function Mouth({ mood }) {
  if (mood === 'cheer') {
    return (
      <g>
        <path d="M88 120 Q100 142 112 120 Z" fill="#c2335f" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M94 129 Q100 137 106 129 Q100 126 94 129 Z" fill="#ff8fb1" />
      </g>
    )
  }
  if (mood === 'oops') {
    return <path d="M90 126 Q95 121 100 126 Q105 131 110 126" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
  }
  if (mood === 'think') {
    return <ellipse cx="103" cy="126" rx="3.8" ry="4.2" fill={INK} />
  }
  // happy: little Shiba smile with a tongue peeking out
  return (
    <g>
      <path d="M100 117 L100 121" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M88 120 Q94 128 100 121 Q106 128 112 120" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <path d="M96 125 Q100 134 104 125 Z" fill="#ff8fb1" />
    </g>
  )
}
