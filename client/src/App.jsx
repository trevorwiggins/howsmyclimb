import Home from './sections/Home'
import GraphScrollView from './sections/GraphScrollView'
import { useState } from 'react'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div>
      {!loaded
        ? <Home onLoaded={() => setLoaded(true)} />
        : <GraphScrollView />
      }
    </div>
  )
}
