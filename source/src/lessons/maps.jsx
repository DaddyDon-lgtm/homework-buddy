// Real maps, drawn from public-domain data (US Census Bureau and Natural Earth) in mapdata.js.
// Used as lesson figures and in "tap on the map" Try It questions.
import { useId } from 'react'
import { Fig, T } from './figures.jsx'
import { EAST, NORTH_AMERICA, ATLANTIC } from './mapdata.js'

const A1 = 'var(--a1)'
const A2 = 'var(--a2)'
const A3 = 'var(--a3)'
const SOFT = 'var(--text-soft)'
const GOOD = 'var(--good)'
const BAD = 'var(--bad)'
const REGION_COLOR = { ne: A2, mid: A3, south: A1 }

const land = { fill: SOFT, fillOpacity: 0.16, stroke: SOFT, strokeOpacity: 0.55, strokeWidth: 1 }
const border = { fill: 'none', stroke: SOFT, strokeOpacity: 0.45, strokeWidth: 0.8 }

// ---------- East Coast base: today's states, colonies coloured ----------
function EastBase({ colour = 'region', pick, onPickState }) {
  return (
    <g>
      {EAST.canada && <path d={EAST.canada} style={land} />}
      {EAST.states.map((s) => {
        let style = land
        if (s.colony) {
          const c = colour === 'region' ? REGION_COLOR[s.colony] : A2
          style = { fill: c, fillOpacity: colour === 'region' ? 0.5 : 0.22, stroke: c, strokeWidth: 1.4 }
        } else if (s.part && colour === 'region') {
          const c = REGION_COLOR[s.part]
          style = { fill: c, fillOpacity: 0.2, stroke: c, strokeWidth: 1, strokeDasharray: '4 3' }
        }
        if (pick && s.colony) {
          if (pick.answer === s.id && pick.checked) style = { ...style, fill: GOOD, fillOpacity: 0.75, stroke: GOOD }
          else if (pick.picked === s.id) style = { ...style, fill: pick.checked ? BAD : A1, fillOpacity: 0.75, stroke: pick.checked ? BAD : A1, strokeWidth: 3 }
        }
        const clickable = pick && s.colony && !pick.checked
        return (
          <path
            key={s.id}
            data-id={s.id}
            d={s.d}
            style={{ ...style, cursor: clickable ? 'pointer' : undefined }}
            onClick={clickable ? () => onPickState(s.id) : undefined}
          />
        )
      })}
    </g>
  )
}

function EastLabels() {
  return EAST.states
    .filter((s) => s.colony)
    .map((s) => (
      <g key={s.id} style={{ pointerEvents: 'none' }}>
        {s.leader && <line x1={s.leader[0]} y1={s.leader[1]} x2={s.label[0] - 4} y2={s.label[1] - 5} style={{ stroke: SOFT, strokeWidth: 1.2 }} />}
        <T x={s.label[0]} y={s.label[1]} anchor={s.leader ? 'start' : 'middle'} bold size={14} halo>
          {s.abbr}
        </T>
      </g>
    ))
}

export function MapColonies({ pick, onPickState }) {
  const legend = [
    [A2, 'New England'],
    [A3, 'Middle'],
    [A1, 'Southern'],
  ]
  return (
    <Fig
      h={EAST.h}
      caption={
        pick
          ? null
          : 'A real map of the 13 colonies, drawn with today’s state borders. The dashed areas were part of Massachusetts (Maine) and Virginia (West Virginia) back then.'
      }
      label="Map of the thirteen colonies along the Atlantic coast"
    >
      <EastBase pick={pick} onPickState={onPickState} />
      <EastLabels />
      <T x={EAST.w - 130} y={EAST.h - 210} italic soft size={16}>
        Atlantic
      </T>
      <T x={EAST.w - 130} y={EAST.h - 190} italic soft size={16}>
        Ocean 🌊
      </T>
      {!pick &&
        legend.map(([c, l], i) => (
          <g key={l}>
            <rect x={EAST.w - 150} y={EAST.h - 120 + i * 30} width={22} height={18} rx={4} style={{ fill: c, fillOpacity: 0.6, stroke: c }} />
            <T x={EAST.w - 120} y={EAST.h - 105 + i * 30} size={15}>
              {l}
            </T>
          </g>
        ))}
    </Fig>
  )
}

// ---------- Revolutionary War places ----------
export const REV_PLACES = [
  ['lexington', 'Lexington & Concord', '1775', 'start'],
  ['saratoga', 'Saratoga', '1777', 'end'],
  ['philadelphia', 'Philadelphia', '1776', 'start'],
  ['valleyforge', 'Valley Forge', '1777–78', 'end'],
  ['yorktown', 'Yorktown', '1781', 'start'],
]

export function MapRevWar({ pick, onPickPlace }) {
  return (
    <Fig
      h={EAST.h}
      caption={pick ? null : 'Where key events of the Revolution happened (today’s state borders). The Declaration was signed in Philadelphia.'}
      label="Map of Revolutionary War sites"
    >
      <EastBase colour="plain" />
      {REV_PLACES.map(([id, name, year, side]) => {
        const [x, y] = EAST.places[id]
        const dx = side === 'start' ? 14 : -14
        let c = id === 'philadelphia' ? A3 : A1
        if (pick) {
          c = A1
          if (pick.checked && pick.answer === id) c = GOOD
          else if (pick.picked === id) c = pick.checked ? BAD : A2
        }
        const clickable = pick && !pick.checked
        return (
          <g key={id} data-id={id} onClick={clickable ? () => onPickPlace(id) : undefined} style={{ cursor: clickable ? 'pointer' : undefined }}>
            {clickable && <circle cx={x} cy={y} r={24} style={{ fill: 'transparent' }} />}
            <circle cx={x} cy={y} r={pick && pick.picked === id ? 12 : 9} style={{ fill: c, stroke: 'var(--bg)', strokeWidth: 2.5 }} />
            <T x={x + dx} y={y - 2} anchor={side} bold size={15} halo>
              {name}
            </T>
            {!pick && (
              <T x={x + dx} y={y + 16} anchor={side} size={14} soft halo>
                {year}
              </T>
            )}
          </g>
        )
      })}
      <T x={EAST.w - 130} y={EAST.h - 210} italic soft size={16}>
        Atlantic
      </T>
      <T x={EAST.w - 130} y={EAST.h - 190} italic soft size={16}>
        Ocean 🌊
      </T>
    </Fig>
  )
}

// ---------- North America: culture regions ----------
const REGION_INFO = {
  ne: ['Northeast', 'Woodlands', A2, [0, 0]],
  plains: ['Great', 'Plains', A3, [0, 0]],
  sw: ['Southwest', '', A1, [0, 16]],
  pnw: ['Pacific', 'Northwest', A2, [0, 0]],
}

export function MapRegions() {
  const clip = useId().replace(/:/g, '')
  const [mx, my] = NORTH_AMERICA.mesaVerde
  return (
    <Fig
      h={NORTH_AMERICA.h}
      caption="Four of the culture regions on a real map. The edges are only approximate: nations did not have fixed borders, and there were other regions too."
      label="Map of North America with four culture regions"
    >
      <defs>
        <clipPath id={clip}>
          <path d={NORTH_AMERICA.land} />
        </clipPath>
      </defs>
      <path d={NORTH_AMERICA.land} style={land} />
      <g clipPath={`url(#${clip})`}>
        {NORTH_AMERICA.regions.map((r) => (
          <path key={r.id} d={r.d} style={{ fill: REGION_INFO[r.id][2], fillOpacity: 0.55, stroke: REGION_INFO[r.id][2], strokeWidth: 1.5 }} />
        ))}
      </g>
      <path d={NORTH_AMERICA.borders} style={border} />
      {NORTH_AMERICA.regions.map((r) => {
        const [l1, l2, , [dx, dy]] = REGION_INFO[r.id]
        const [x, y] = r.label
        return (
          <g key={r.id} style={{ pointerEvents: 'none' }}>
            <T x={x + dx} y={y + dy - (l2 ? 4 : -4)} anchor="middle" bold size={13} halo>
              {l1}
            </T>
            {l2 && (
              <T x={x + dx} y={y + dy + 12} anchor="middle" bold size={13} halo>
                {l2}
              </T>
            )}
          </g>
        )
      })}
      <circle cx={mx} cy={my} r={5} style={{ fill: 'var(--text)', stroke: 'var(--bg)', strokeWidth: 2 }} />
      <T x={mx} y={my - 10} anchor="middle" size={12} bold halo>
        Mesa Verde
      </T>
    </Fig>
  )
}

// ---------- The Atlantic: Columbus in 1492 ----------
export function MapColumbus() {
  const p = ATLANTIC.places
  const dot = (xy, c = A1) => <circle cx={xy[0]} cy={xy[1]} r={6} style={{ fill: c, stroke: 'var(--bg)', strokeWidth: 2 }} />
  return (
    <Fig h={ATLANTIC.h} caption="Columbus’s first voyage, 1492: from Spain, past the Canary Islands, to an island in the Bahamas." label="Map of Columbus's route across the Atlantic">
      <path d={ATLANTIC.land} style={land} />
      <path d={ATLANTIC.borders} style={border} />
      <path d={ATLANTIC.spain} style={{ fill: A1, fillOpacity: 0.6, stroke: A1 }} />
      <path d={ATLANTIC.route} style={{ fill: 'none', stroke: A1, strokeWidth: 3, strokeDasharray: '8 6' }} />
      {dot(p.palos)}
      {dot(p.canaries)}
      {dot(p.sansalvador)}
      <T x={p.palos[0] + 8} y={p.palos[1] + 22} bold size={14} halo>
        Spain
      </T>
      <T x={p.canaries[0] - 8} y={p.canaries[1] + 20} anchor="end" size={13} halo>
        Canary Islands
      </T>
      <T x={p.sansalvador[0] - 4} y={p.sansalvador[1] + 22} anchor="middle" bold size={13} halo>
        San Salvador
      </T>
      <T x={p.ocean[0]} y={p.ocean[1]} anchor="middle" italic soft size={16}>
        Atlantic Ocean
      </T>
      <T x={p.northAmerica[0]} y={p.northAmerica[1]} anchor="middle" soft bold size={14} halo>
        North America
      </T>
      <T x={p.southAmerica[0]} y={p.southAmerica[1]} anchor="middle" soft bold size={14} halo>
        South America
      </T>
      <T x={p.europe[0]} y={p.europe[1]} anchor="middle" soft bold size={14} halo>
        Europe
      </T>
      <T x={p.africa[0]} y={p.africa[1]} anchor="middle" soft bold size={14} halo>
        Africa
      </T>
    </Fig>
  )
}
