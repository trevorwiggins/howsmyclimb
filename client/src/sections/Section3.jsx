import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { matches, ranked } from '../data/mockData'
import useReveal from '../hooks/useReveal'

function buildLPCurve(matches, currentLP) {
  let lp = currentLP
  const reversed = [...matches].reverse().map(match => {
    const p = match.info.participants[0]
    lp -= p.win ? 20 : -18
    return { champion: p.championName, win: p.win, lp }
  })
  return reversed.reverse()
}

export default function Section3() {
  const ref = useReveal()
  const currentLP = ranked.find(r => r.queueType === 'RANKED_SOLO_5x5')?.leaguePoints ?? 0
  const data = buildLPCurve(matches, currentLP)

  return (
    <div className="graph-section">
      <div ref={ref} className="section" style={{ width: '60%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis hide />
            <YAxis />
            <Tooltip formatter={(value) => [value, 'LP']} labelFormatter={(_, payload) => payload[0]?.payload.champion ?? ''} />
            <Line dataKey="lp" stroke="#ffffff" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
