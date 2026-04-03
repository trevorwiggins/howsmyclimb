import Home from './sections/Home'
import Graph from './sections/Graph'
import Section2 from './sections/Section2'
import Section3 from './sections/Section3'
import { useState } from 'react'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="snap-container">
      {!loaded
        ? <Home onLoaded={() => setLoaded(true)} />
        : <>
            <Graph />
            <Section2 />
            <Section3 />
          </>
      }
    </div>
  )
}
