import { useState, useCallback } from 'react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Sector } from 'recharts'
import { matches, ranked } from '../data/mockData'
import useGraphScroll from '../hooks/useGraphScroll'

// --- Line chart data ---
function buildLPCurve(matches, currentLP) {
  let lp = currentLP
  const reversed = [...matches].reverse().map(match => {
    const p = match.info.participants[0]
    lp -= p.win ? 20 : -18
    return { champion: p.championName, win: p.win, lp }
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
  return (
    <g>
      <text x={cx} y={cy - 10} textAnchor="middle" fill="#f5f5f5" fontSize={20} fontFamily="newsreader" fontStyle="italic">
        {payload.name}
      </text>
      <text x={cx} y={cy + 18} textAnchor="middle" fill="#a3a3a3" fontSize={14} fontFamily="geist">
        {value} ({(percent * 100).toFixed(1)}%)
      </text>
      <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 10} startAngle={startAngle} endAngle={endAngle} fill={fill} />
      <Sector cx={cx} cy={cy} innerRadius={outerRadius + 14} outerRadius={outerRadius + 18} startAngle={startAngle} endAngle={endAngle} fill={fill} />
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

export default function GraphScrollView() {
  const { containerRef, sectionsRef, activeIndex } = useGraphScroll(sections.length)
  const [pieActiveIndex, setPieActiveIndex] = useState(0)
  const onPieEnter = useCallback((_, i) => setPieActiveIndex(i), [])

  const currentLP = ranked.find(r => r.queueType === 'RANKED_SOLO_5x5')?.leaguePoints ?? 0
  const lpData = buildLPCurve(matches, currentLP)

  return (
    <div className="gs-container" ref={containerRef}>

      <div className="gs-graph">
        <div className={`gs-chart ${activeIndex === 0 || activeIndex === 2 ? 'gs-chart-visible' : ''}`}>
          <ResponsiveContainer width="100%" height={340}>
            <LineChart data={lpData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis hide />
              <YAxis stroke="#aaa" />
              <Tooltip formatter={(v) => [v, 'LP']} labelFormatter={(_, p) => p[0]?.payload.champion ?? ''} />
              <Line dataKey="lp" stroke="#ffffff" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={`gs-chart ${activeIndex === 1 ? 'gs-chart-visible' : ''}`}>
          <ResponsiveContainer width="100%" height={340}>
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
              >
                {mockWinLoss.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
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
