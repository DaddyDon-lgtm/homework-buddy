// Lesson diagrams, drawn as SVG in the theme colours so they work in every theme.
// Use in a lesson: a learn block gets  fig: '<id>'  and the figure appears under its text.
// All diagrams are schematic (not to scale), and captions say so where it matters.

const A1 = 'var(--a1)'
const A2 = 'var(--a2)'
const A3 = 'var(--a3)'
const TEXT = 'var(--text)'
const SOFT = 'var(--text-soft)'
const GOOD = 'var(--good)'
const BAD = 'var(--bad)'

function Fig({ h, label, caption, children }) {
  return (
    <figure className="lesson-fig">
      <svg viewBox={`0 0 600 ${h}`} role="img" aria-label={label || caption}>
        {children}
      </svg>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

function T({ x, y, children, size = 16, anchor = 'start', bold, soft, color, italic, rotate }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}
      style={{
        fill: color || (soft ? SOFT : TEXT),
        fontSize: size,
        fontWeight: bold ? 700 : 500,
        fontStyle: italic ? 'italic' : 'normal',
        fontFamily: 'inherit',
      }}
    >
      {children}
    </text>
  )
}

function Box({ x, y, w, h, c, dashed, r = 14, fill = 0.16 }) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={r}
      style={{ fill: c, fillOpacity: fill, stroke: c, strokeWidth: 2.5, strokeDasharray: dashed ? '8 6' : undefined }}
    />
  )
}

// Straight arrow with a drawn head at the end (and optionally at the start).
function Arrow({ x1, y1, x2, y2, c = SOFT, both, w = 3 }) {
  const head = (fx, fy, tx, ty) => {
    const a = Math.atan2(ty - fy, tx - fx)
    const s = 13
    const p = [
      [tx, ty],
      [tx - s * Math.cos(a - 0.45), ty - s * Math.sin(a - 0.45)],
      [tx - s * Math.cos(a + 0.45), ty - s * Math.sin(a + 0.45)],
    ]
    return <polygon points={p.map((q) => q.join(',')).join(' ')} style={{ fill: c }} />
  }
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} style={{ stroke: c, strokeWidth: w, strokeLinecap: 'round' }} />
      {head(x1, y1, x2, y2)}
      {both && head(x2, y2, x1, y1)}
    </g>
  )
}

// Vertical timeline. rows: [year, text, colour], legend: [[colour, label]]
function Timeline({ rows, legend, caption }) {
  const top = 30
  const step = 52
  const h = top + rows.length * step + (legend ? 44 : 10)
  return (
    <Fig h={h} caption={caption} label={rows.map((r) => `${r[0]}: ${r[1]}`).join('. ')}>
      <line x1={118} y1={top - 10} x2={118} y2={top + (rows.length - 1) * step + 10} style={{ stroke: 'var(--line)', strokeWidth: 4 }} />
      {rows.map(([year, text, c], i) => {
        const y = top + i * step
        return (
          <g key={i}>
            <T x={100} y={y + 6} anchor="end" bold size={17}>
              {year}
            </T>
            <circle cx={118} cy={y} r={10} style={{ fill: c }} />
            <T x={140} y={y + 6} size={16}>
              {text}
            </T>
          </g>
        )
      })}
      {legend &&
        legend.map(([c, label], i) => (
          <g key={label}>
            <circle cx={30 + i * 190} cy={h - 18} r={8} style={{ fill: c }} />
            <T x={44 + i * 190} y={h - 13} size={14} soft>
              {label}
            </T>
          </g>
        ))}
    </Fig>
  )
}

const FIGURES = {
  regions: () => {
    const cells = [
      ['🌲', 'Northeast Woodlands', 'forests and lakes', 'longhouse', 'corn, beans, squash', A2],
      ['🦬', 'Great Plains', 'grasslands', 'tipi (can move)', 'bison', A3],
      ['🌵', 'Southwest', 'dry desert', 'adobe pueblo', 'corn', A1],
      ['🐟', 'Pacific Northwest', 'rainy coast, forests', 'cedar plank house', 'salmon', A2],
    ]
    return (
      <Fig h={420} caption="The land in each region shaped homes and food.">
        {cells.map(([emoji, name, land, home, food, c], i) => {
          const x = i % 2 ? 305 : 10
          const y = i < 2 ? 10 : 215
          return (
            <g key={name}>
              <Box x={x} y={y} w={285} h={195} c={c} />
              <T x={x + 16} y={y + 42} size={28}>
                {emoji}
              </T>
              <T x={x + 56} y={y + 38} bold size={18}>
                {name}
              </T>
              <T x={x + 18} y={y + 85} soft size={15}>Land:</T>
              <T x={x + 70} y={y + 85} size={15}>{land}</T>
              <T x={x + 18} y={y + 122} soft size={15}>Home:</T>
              <T x={x + 70} y={y + 122} size={15}>{home}</T>
              <T x={x + 18} y={y + 159} soft size={15}>Food:</T>
              <T x={x + 70} y={y + 159} size={15}>{food}</T>
            </g>
          )
        })}
      </Fig>
    )
  },

  columbian: () => (
    <Fig h={300} caption="The Columbian Exchange (a diagram, not a map)">
      <Box x={10} y={30} w={150} h={230} c={A2} />
      <T x={85} y={140} anchor="middle" bold size={20}>The</T>
      <T x={85} y={165} anchor="middle" bold size={20}>Americas</T>
      <Box x={440} y={30} w={150} h={230} c={A1} />
      <T x={515} y={152} anchor="middle" bold size={20}>Europe</T>
      <Arrow x1={170} y1={70} x2={430} y2={70} c={A2} w={4} />
      <T x={300} y={100} anchor="middle">🌽 corn · 🥔 potatoes</T>
      <T x={300} y={124} anchor="middle">🍅 tomatoes · 🍫 chocolate</T>
      <Arrow x1={430} y1={180} x2={170} y2={180} c={A1} w={4} />
      <T x={300} y={210} anchor="middle">🐎 horses · 🐄 cows</T>
      <T x={300} y={234} anchor="middle">🌾 wheat · 🦠 smallpox</T>
      <T x={300} y={288} anchor="middle" soft italic size={15}>
        across the Atlantic Ocean
      </T>
    </Fig>
  ),

  colonies: () => {
    const bands = [
      ['New England Colonies', 'Massachusetts, New Hampshire,', 'Connecticut, Rhode Island', '❄️ rocky soil, cold → 🐟 fishing, ⛵ ships, trade', A2],
      ['Middle Colonies', 'New York, New Jersey,', 'Pennsylvania, Delaware', '🌾 good soil → wheat: the “breadbasket”', A3],
      ['Southern Colonies', 'Maryland, Virginia, North Carolina,', 'South Carolina, Georgia', '☀️ warm → plantations: tobacco, rice', A1],
    ]
    return (
      <Fig h={420} caption="The three regions, north to south along the Atlantic coast (a diagram, not real colony shapes)">
        <T x={14} y={24} soft size={14}>
          ↑ North
        </T>
        {bands.map(([name, l1, l2, econ, c], i) => {
          const y = 36 + i * 120
          return (
            <g key={name}>
              <Box x={10} y={y} w={462} h={110} c={c} />
              <T x={26} y={y + 30} bold size={18}>
                {name}
              </T>
              <T x={26} y={y + 55} size={15}>{l1}</T>
              <T x={26} y={y + 75} size={15}>{l2}</T>
              <T x={26} y={y + 99} soft size={15}>{econ}</T>
            </g>
          )
        })}
        <Box x={482} y={36} w={108} h={350} c={A2} fill={0.08} />
        <T x={540} y={211} anchor="middle" soft italic size={17} rotate={90}>
          Atlantic Ocean 🌊
        </T>
        <T x={14} y={410} soft size={14}>
          ↓ South
        </T>
      </Fig>
    )
  },

  'causes-timeline': () => (
    <Timeline
      caption="Each step made the next one more likely."
      rows={[
        ['1763', 'French and Indian War ends; Britain in debt', A3],
        ['1765', 'Stamp Act: tax on printed paper', A2],
        ['1767', 'Townshend Acts: taxes on glass, paint, tea', A2],
        ['1770', 'Boston Massacre: five colonists killed', A1],
        ['1773', 'Tea Act, then the Boston Tea Party', A1],
        ['1774', 'Intolerable Acts punish Massachusetts', A2],
        ['1775', 'Fighting begins at Lexington and Concord', A1],
      ]}
      legend={[
        [A2, 'British taxes and laws'],
        [A1, 'Protest and conflict'],
        [A3, 'Background'],
      ]}
    />
  ),

  declaration: () => {
    const parts = [
      ['Big ideas', 'People have rights. Government gets', 'its power from the people.'],
      ['Complaints', 'A list of wrongs by King George III,', 'like taxes without consent.'],
      ['The declaration', 'The colonies are now free and', 'independent states.'],
    ]
    return (
      <Fig h={330} caption="The three parts of the Declaration of Independence">
        <Box x={30} y={8} w={540} h={312} c={A3} r={10} />
        <T x={300} y={42} anchor="middle" bold size={18}>
          Declaration of Independence · July 4, 1776
        </T>
        {parts.map(([h, l1, l2], i) => {
          const y = 62 + i * 86
          return (
            <g key={h}>
              {i > 0 && <line x1={50} y1={y - 6} x2={550} y2={y - 6} style={{ stroke: 'var(--line)', strokeWidth: 2, strokeDasharray: '6 6' }} />}
              <circle cx={74} cy={y + 34} r={18} style={{ fill: A1 }} />
              <T x={74} y={y + 41} anchor="middle" bold size={18} color="var(--a1-text)">
                {i + 1}
              </T>
              <T x={106} y={y + 22} bold size={17}>
                {h}
              </T>
              <T x={106} y={y + 46} size={15}>{l1}</T>
              <T x={106} y={y + 68} size={15}>{l2}</T>
            </g>
          )
        })}
      </Fig>
    )
  },

  'revwar-timeline': () => (
    <Timeline
      caption="The Revolutionary War, 1775 to 1783"
      rows={[
        ['1775', 'Lexington and Concord: the war begins', A1],
        ['1776', 'Declaration of Independence', A3],
        ['1777', 'Saratoga: a big American win', A1],
        ['1777–78', 'Valley Forge: a hard winter of training', A3],
        ['1778', 'France joins the American side', A2],
        ['1781', 'Yorktown: the British army surrenders', A1],
        ['1783', 'Treaty of Paris: independence recognized', A3],
      ]}
      legend={[
        [A1, 'Battles'],
        [A3, 'Big moments'],
        [A2, 'Help from France'],
      ]}
    />
  ),

  'articles-vs-constitution': () => {
    const rows = [
      ['Collect taxes?', false, true],
      ['A president?', false, true],
      ['National courts?', false, true],
      ['To change the rules', 'all 13 states', '3/4 of the states'],
    ]
    return (
      <Fig h={270} caption="The Constitution fixed the biggest weaknesses of the Articles.">
        <T x={330} y={34} anchor="middle" bold size={16} color={A1}>
          Articles (1781)
        </T>
        <T x={500} y={34} anchor="middle" bold size={16} color={A2}>
          Constitution (1787)
        </T>
        {rows.map(([label, a, b], i) => {
          const y = 52 + i * 52
          const mark = (v, x) =>
            typeof v === 'string' ? (
              <T x={x} y={y + 33} anchor="middle" size={15}>
                {v}
              </T>
            ) : (
              <T x={x} y={y + 36} anchor="middle" bold size={26} color={v ? GOOD : BAD}>
                {v ? '✓' : '✗'}
              </T>
            )
          return (
            <g key={label}>
              <rect x={10} y={y} width={580} height={46} rx={10} style={{ fill: 'var(--surface-strong)' }} />
              <T x={24} y={y + 30} size={16}>
                {label}
              </T>
              {mark(a, 330)}
              {mark(b, 500)}
            </g>
          )
        })}
      </Fig>
    )
  },

  compromise: () => {
    const states = [
      ['Big state', 8],
      ['Medium state', 4],
      ['Small state', 1],
    ]
    const dots = (x, y, n, c) =>
      Array.from({ length: n }, (_, k) => <circle key={k} cx={x + k * 20} cy={y} r={8} style={{ fill: c }} />)
    return (
      <Fig h={290} caption="The Great Compromise: one house where every state is equal, one based on population (example numbers)">
        <Box x={10} y={10} w={285} h={270} c={A2} />
        <Box x={305} y={10} w={285} h={270} c={A1} />
        <T x={152} y={42} anchor="middle" bold size={19}>
          Senate
        </T>
        <T x={447} y={42} anchor="middle" bold size={19}>
          House
        </T>
        {states.map(([name, n], i) => {
          const y = 90 + i * 50
          return (
            <g key={name}>
              <T x={24} y={y + 5} size={14} soft>
                {name}
              </T>
              {dots(140, y, 2, A2)}
              <T x={319} y={y + 5} size={14} soft>
                {name}
              </T>
              {dots(430, y, n, A1)}
            </g>
          )
        })}
        <T x={152} y={250} anchor="middle" size={15}>
          Every state gets 2
        </T>
        <T x={447} y={250} anchor="middle" size={15}>
          More people → more seats
        </T>
      </Fig>
    )
  },

  rights: () => {
    const tiles = [
      ['1st', 'Speech, religion,', 'press, assembly'],
      ['2nd', 'Keep and', 'bear arms'],
      ['4th', 'No unreasonable', 'searches'],
      ['5th', 'Not a witness', 'against yourself'],
      ['6th', 'Fast, fair trial', 'with a lawyer'],
      ['8th', 'No cruel or', 'unusual punishment'],
    ]
    return (
      <Fig h={300} caption="Six of the ten amendments in the Bill of Rights (1791)">
        {tiles.map(([n, l1, l2], i) => {
          const x = 10 + (i % 3) * 197
          const y = 10 + Math.floor(i / 3) * 145
          const c = [A1, A2, A3][i % 3]
          return (
            <g key={n}>
              <Box x={x} y={y} w={185} h={135} c={c} />
              <T x={x + 92} y={y + 48} anchor="middle" bold size={32} color={c === A3 ? TEXT : c}>
                {n}
              </T>
              <T x={x + 92} y={y + 84} anchor="middle" size={15}>
                {l1}
              </T>
              <T x={x + 92} y={y + 106} anchor="middle" size={15}>
                {l2}
              </T>
            </g>
          )
        })}
      </Fig>
    )
  },

  branches: () => {
    const box = (x, y, c, a, b, d) => (
      <g>
        <Box x={x} y={y} w={200} h={112} c={c} />
        <T x={x + 100} y={y + 34} anchor="middle" bold size={18}>
          {a}
        </T>
        <T x={x + 100} y={y + 62} anchor="middle" size={15}>
          {b}
        </T>
        <T x={x + 100} y={y + 90} anchor="middle" size={15} soft>
          {d}
        </T>
      </g>
    )
    return (
      <Fig h={430} caption="Checks and balances: each branch can limit the others.">
        {box(200, 8, A1, '🏛️ Legislative', 'Congress', 'makes laws')}
        {box(16, 300, A2, '⭐ Executive', 'President', 'carries out laws')}
        {box(384, 300, A3, '⚖️ Judicial', 'Supreme Court', 'explains laws')}
        <Arrow x1={125} y1={294} x2={225} y2={126} both />
        <T x={150} y={196} anchor="end" size={14}>
          President can veto bills;
        </T>
        <T x={150} y={216} anchor="end" size={14}>
          Congress can override
        </T>
        <Arrow x1={478} y1={294} x2={378} y2={126} />
        <T x={450} y={196} size={14}>
          Court can rule a law
        </T>
        <T x={450} y={216} size={14}>
          unconstitutional
        </T>
        <Arrow x1={222} y1={356} x2={378} y2={356} />
        <T x={300} y={340} anchor="middle" size={13}>
          President picks justices
        </T>
        <T x={300} y={380} anchor="middle" size={13}>
          Senate approves them
        </T>
      </Fig>
    )
  },

  duties: () => (
    <Fig h={270} caption="Some responsibilities are the law. Others are up to each citizen.">
      <Box x={10} y={10} w={285} h={250} c={A1} />
      <Box x={305} y={10} w={285} h={250} c={A2} />
      <T x={152} y={44} anchor="middle" bold size={18}>
        Required by law
      </T>
      <T x={447} y={44} anchor="middle" bold size={18}>
        Expected (your choice)
      </T>
      {['⚖️ Obey laws', '💵 Pay taxes', '📋 Serve on a jury'].map((t, i) => (
        <T key={t} x={34} y={96 + i * 46} size={16}>
          {t}
        </T>
      ))}
      {['🗳️ Vote (age 18 and up)', '📰 Stay informed', '🤝 Help the community', '🙂 Respect others’ rights'].map((t, i) => (
        <T key={t} x={326} y={96 + i * 46} size={16}>
          {t}
        </T>
      ))}
    </Fig>
  ),

  'opp-cost': () => (
    <Fig h={250} caption="Opportunity cost is the next best choice you give up.">
      <Box x={190} y={8} w={220} h={56} c={A3} />
      <T x={300} y={43} anchor="middle" bold size={18}>
        💰 NT$300 to spend
      </T>
      <Arrow x1={260} y1={66} x2={160} y2={146} />
      <Arrow x1={340} y1={66} x2={440} y2={146} />
      <Box x={20} y={150} w={260} h={90} c={GOOD} />
      <T x={150} y={185} anchor="middle" bold size={17}>
        ✅ Light stick (NT$300)
      </T>
      <T x={150} y={215} anchor="middle" size={15}>
        Her choice
      </T>
      <Box x={320} y={150} w={260} h={90} c={A1} dashed />
      <T x={450} y={185} anchor="middle" bold size={17}>
        📕 Manga (NT$200)
      </T>
      <T x={450} y={215} anchor="middle" size={15}>
        Given up = opportunity cost
      </T>
    </Fig>
  ),

  trade: () => (
    <Fig h={220} caption="Specialize, then trade: both sides gain.">
      <Box x={10} y={40} w={160} h={130} c={A1} />
      <T x={90} y={112} anchor="middle" bold size={20}>
        Taiwan
      </T>
      <Box x={430} y={40} w={160} h={130} c={A2} />
      <T x={510} y={112} anchor="middle" bold size={20}>
        USA
      </T>
      <Arrow x1={180} y1={80} x2={420} y2={80} c={A1} w={4} />
      <T x={300} y={66} anchor="middle" size={16}>
        💻 computer chips
      </T>
      <Arrow x1={420} y1={135} x2={180} y2={135} c={A2} w={4} />
      <T x={300} y={164} anchor="middle" size={16}>
        🌾 wheat, soybeans
      </T>
    </Fig>
  ),

  savings: () => {
    const bars = [
      ['3 months', 650],
      ['6 months', 1300],
      ['9 months', 1950],
      ['1 year', 2600],
    ]
    const base = 240
    const scale = 180 / 2600
    return (
      <Fig h={290} caption="Plan B: NT$50 a week adds up (before interest). Plan A saves NT$0.">
        <line x1={60} y1={base} x2={590} y2={base} style={{ stroke: 'var(--line)', strokeWidth: 3 }} />
        {bars.map(([label, v], i) => {
          const cx = 140 + i * 130
          const hgt = v * scale
          return (
            <g key={label}>
              <rect x={cx - 38} y={base - hgt} width={76} height={hgt} rx={8} style={{ fill: A2 }} />
              <T x={cx} y={base - hgt - 10} anchor="middle" bold size={16}>
                NT${v.toLocaleString('en-US')}
              </T>
              <T x={cx} y={base + 26} anchor="middle" soft size={15}>
                {label}
              </T>
            </g>
          )
        })}
      </Fig>
    )
  },

  risk: () => (
    <Fig h={180} caption="Higher reward usually means higher risk.">
      <Arrow x1={40} y1={90} x2={565} y2={90} c={SOFT} both w={4} />
      <T x={130} y={66} anchor="middle" size={32}>
        🏦
      </T>
      <T x={130} y={124} anchor="middle" bold size={16}>
        Savings account
      </T>
      <T x={470} y={66} anchor="middle" size={32}>
        📈
      </T>
      <T x={470} y={124} anchor="middle" bold size={16}>
        Stocks
      </T>
      <T x={20} y={165} soft size={14}>
        Safer, grows slowly
      </T>
      <T x={580} y={165} anchor="end" soft size={14}>
        Riskier, may grow faster
      </T>
    </Fig>
  ),
}

export function LessonFigure({ id }) {
  const F = FIGURES[id]
  return F ? <F /> : null
}

export const FIGURE_IDS = Object.keys(FIGURES)
