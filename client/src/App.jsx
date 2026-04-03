import Home from './sections/Home'
import Graph from './sections/Graph'
import { useState } from 'react'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="snap-container">
      {!loaded 
        ? <Home onLoaded={() => setLoaded(true)} />
      : <Graph />
      }
    </div>
  )
}
