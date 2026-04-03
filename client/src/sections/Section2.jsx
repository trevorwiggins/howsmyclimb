import { useState, useCallback } from 'react'
import { PieChart, Pie, Cell, Sector, ResponsiveContainer } from 'recharts'
import useReveal from '../hooks/useReveal'

const mockWinLoss = [
  { name: 'Wins', value: 34 },
  { name: 'Losses', value: 22 },
]

const COLORS = ['#4ade80', '#f87171']

function renderActiveShape(props) {
  const {
    cx, cy, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value
  } = props

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

export default function Section2() {
  const ref = useReveal()
  const [activeIndex, setActiveIndex] = useState(0)

  const onPieEnter = useCallback((_, index) => setActiveIndex(index), [])

  return (
    <div className="graph-section">
      <div ref={ref} className="section" style={{ width: '60%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={mockWinLoss}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              dataKey="value"
              onMouseEnter={onPieEnter}
            >
              {mockWinLoss.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
