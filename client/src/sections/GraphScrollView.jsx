import { useState, useCallback } from 'react'
import {
  CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Sector, ReferenceArea,
} from 'recharts'
import { matches, ranked } from '../data/mockData'
import useGraphScroll from '../hooks/useGraphScroll'

// --- Rank system ---
// Each division = 100 units. Tiers stack: Iron(0-400), Bronze(400-800), ...
// Master/GM/Chall share 2800+ as LP-only (no divisions).
const TIERS = ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Emerald', 'Diamond']
const TIER_COLORS = {
  Iron:       '#7a6a5a',
  Bronze:     '#a0522d',
  Silver:     '#8a9bb0',
  Gold:       '#c89b3c',
  Platinum:   '#4a9e8a',
  Emerald:    '#2d9e5a',
  Diamond:    '#5b7fcb',
  Master:     '#9b4dca',
  Grandmaster:'#c0392b',
  Challenger: '#f0c040',
}
const DIVISION_MAP = { IV: 0, III: 1, II: 2, I: 3 }

function tierBase(tier) {
  const idx = TIERS.indexOf(tier)
  if (idx !== -1) return idx * 400
  if (tier === 'Master')       return 2800
  if (tier === 'Grandmaster')  return 2800
  if (tier === 'Challenger')   return 2800
  return 0
}

function toAbsoluteLP(tier, division, lp) {
  const divOffset = DIVISION_MAP[division] ?? 0
  return tierBase(tier) + divOffset * 100 + lp
}

// Y-axis bands — one per division for Iron–Diamond, one block for Master+
const RANK_BANDS = []
TIERS.forEach(tier => {
  ['IV', 'III', 'II', 'I'].forEach(div => {
    const y1 = tierBase(tier) + DIVISION_MAP[div] * 100
    RANK_BANDS.push({ label: `${tier} ${div}`, y1, y2: y1 + 100, color: TIER_COLORS[tier] })
  })
})
RANK_BANDS.push({ label: 'Master+', y1: 2800, y2: 3200, color: TIER_COLORS.Master })

function rankLabelFromAbsLP(absLP) {
  const band = RANK_BANDS.find(b => absLP >= b.y1 && absLP < b.y2)
  if (!band) return ''
  const lpInDiv = absLP - band.y1
  return `${band.label} — ${Math.round(lpInDiv)} LP`
}

// --- Build LP curve in absolute units ---
function buildLPCurve(matches, tier, division, currentLP) {
  let absLP = toAbsoluteLP(tier, division, currentLP)
  const reversed = [...matches].reverse().map((match, i) => {
    const p = match.info.participants[0]
    absLP -= p.win ? 20 : -18
    const kda = p.deaths === 0 ? p.kills + p.assists : (p.kills + p.assists) / p.deaths
    const kp = match.info.teamKills > 0 ? ((p.kills + p.assists) / match.info.teamKills) * 100 : 0
    return {
      idx: i,
      champion: p.championName,
      win: p.win,
      lp: absLP,
      date: match.info.gameCreation,
      kills: p.kills,
      deaths: p.deaths,
      assists: p.assists,
      cs: p.totalMinionsKilled,
      visionScore: p.visionScore,
      kda,
      kp,
    }
  })
  return reversed.reverse()
}

// --- Pie chart data ---
const mockWinLoss = [
  { name: 'Wins', value: 34 },
  { name: 'Losses', value: 22 },
]
const PIE_COLORS = ['#4ade80', '#f87171']

function renderActiveShape(props) {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props
  const filterId = `glow-${payload.name}`
  return (
    <g>
      <defs>
        <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feFlood floodColor={fill} floodOpacity="0.8" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <text x={cx} y={cy - 10} textAnchor="middle" fill="#f5f5f5" fontSize={20} fontFamily="newsreader" fontStyle="italic">
        {payload.name}
      </text>
      <text x={cx} y={cy + 18} textAnchor="middle" fill="#a3a3a3" fontSize={14} fontFamily="geist">
        {value} ({(percent * 100).toFixed(1)}%)
      </text>
      <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 4} startAngle={startAngle} endAngle={endAngle} fill={fill} filter={`url(#${filterId})`} />
    </g>
  )
}

// --- Section content ---
const sections = [
  {
    heading: 'Your LP Over Time',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  },
  {
    heading: 'Win / Loss Breakdown',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
  },
  {
    heading: 'Recent Performance',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus nulla accumsan.',
  },
]

function yAxisFormatter(value) {
  // Find which band this tick falls in
  const band = RANK_BANDS.find(b => value >= b.y1 && value < b.y2)
  if (!band) return ''
  // Only label at the bottom of each division band
  if (value === band.y1) return band.label
  return ''
}

export default function GraphScrollView() {
  const { containerRef, sectionsRef, activeIndex } = useGraphScroll(sections.length)
  const [pieActiveIndex, setPieActiveIndex] = useState(0)
  const onPieEnter = useCallback((_, i) => { setPieActiveIndex(i) }, [])
  const onPieLeave = useCallback(() => { setPieActiveIndex(0) }, [])
  const [hoveredPoint, setHoveredPoint] = useState(null)

  const soloQ = ranked.find(r => r.queueType === 'RANKED_SOLO_5x5')
  const currentLP = soloQ?.leaguePoints ?? 0
  const tier = soloQ?.tier ?? 'Gold'
  const division = soloQ?.rank ?? 'IV'

  const lpData = buildLPCurve(matches.slice(-50), tier, division, currentLP)
  const lpValues = lpData.map(d => d.lp)
  const yMin = Math.floor(Math.min(...lpValues) / 100) * 100
  const yMax = Math.ceil(Math.max(...lpValues) / 100) * 100

  // Only render bands that are visible in the current y range
  const visibleBands = RANK_BANDS.filter(b => b.y2 > yMin && b.y1 < yMax)

  // Y-axis ticks: one per division boundary in range
  const yTicks = []
  for (let v = yMin; v <= yMax; v += 100) yTicks.push(v)

  function CustomTooltip({ active, payload }) {
    if (active && payload && payload.length) {
      const point = payload[0].payload
      if (hoveredPoint?.champion !== point.champion || hoveredPoint?.lp !== point.lp) {
        setTimeout(() => setHoveredPoint(point), 0)
      }
    }
    return null
  }

  return (
    <div className="gs-container" ref={containerRef}>

      <div className="gs-graph-row">
        <div className="gs-graph">
          <div className={`gs-chart ${activeIndex === 0 || activeIndex === 2 ? 'gs-chart-visible' : ''}`}>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={lpData} onMouseLeave={() => setHoveredPoint(null)}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,20%)" />
                <XAxis hide />
                <YAxis
                  stroke="#aaa"
                  domain={[yMin, yMax]}
                  ticks={yTicks}
                  tickFormatter={yAxisFormatter}
                  width={90}
                  tick={{ fill: '#aaa', fontSize: 11, fontFamily: 'geist' }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(0,0%,40%)', strokeDasharray: '4 2' }} />

                {visibleBands.map(band => (
                  <ReferenceArea
                    key={band.label}
                    y1={Math.max(band.y1, yMin)}
                    y2={Math.min(band.y2, yMax)}
                    fill={band.color}
                    fillOpacity={0.15}
                    ifOverflow="hidden"
                  />
                ))}

                <Line dataKey="lp" stroke="#ffffff" strokeWidth={1.5} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div
            className={`gs-chart ${activeIndex === 1 ? 'gs-chart-visible' : ''}`}
          >
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  activeIndex={pieActiveIndex}
                  activeShape={renderActiveShape}
                  data={mockWinLoss}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                  onMouseLeave={onPieLeave}
                >
                  {mockWinLoss.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="gs-side-panel">
          {hoveredPoint ? (
            <>
              <p className="gs-side-result" style={{ color: hoveredPoint.win ? '#4ade80' : '#f87171' }}>
                {hoveredPoint.win ? 'Victory' : 'Defeat'}
              </p>
              <p className="gs-side-date">
                {new Date(hoveredPoint.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </>
          ) : (
            <p className="gs-side-lorem">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          )}
          <p className="gs-side-champion">
            {hoveredPoint
              ? <>You played <em>{hoveredPoint.champion}</em> and {hoveredPoint.win ? 'won' : 'lost'} this game.</>
              : 'Hover over the graph to see champion details.'
            }
          </p>
          {hoveredPoint ? (
            <div className="gs-side-stats">
              <span>{rankLabelFromAbsLP(hoveredPoint.lp)}</span>
              <span>KDA: {hoveredPoint.kills}/{hoveredPoint.deaths}/{hoveredPoint.assists} ({hoveredPoint.kda.toFixed(1)})</span>
              <span>CS: {hoveredPoint.cs}</span>
              <span>KP: {hoveredPoint.kp.toFixed(1)}%</span>
              <span>Vision: {hoveredPoint.visionScore}</span>
            </div>
          ) : (
            <>
              <p className="gs-side-lorem">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
              <p className="gs-side-lorem">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            </>
          )}
        </div>
      </div>

      <div className="gs-sections">
        {sections.map((s, i) => (
          <div
            key={i}
            ref={el => sectionsRef.current[i] = el}
            className={`gs-section ${activeIndex === i ? 'gs-section-active' : ''}`}
          >
            <h2>{s.heading}</h2>
            <p>{s.body}</p>
          </div>
        ))}
      </div>

    </div>
  )
}
