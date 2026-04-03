import { regions } from '../data/regions'
import { useState, useEffect } from "react";

export default function Home({ onLoaded }) {
  const [state, setState] = useState("home") // states: "home" | "leaving" | "loading" | "left"

  const handleSearch = () => {
    /*
    MAKE THIS HANDLE DATA LATER
    OR JUST COMPLETELY REMOVE IT LATER
    WHATEVER THE PROGRAM NEEDS
    */
    if (state !== "home") return;
    setState("leaving")
  }

    useEffect(() => {
      if (state === "loading") {
        //fake data load
        //const res = await fetch('/api/matches')
        //const matches = await res.json()
        const id = setTimeout(() => setState("left"), 2500)
        return () => clearTimeout(id)
      }

      if (state === "leaving") {
        const id = setTimeout(() => setState("loading"), 500)
        return () => clearTimeout(id)
      }

      if (state === "left") {
        const id = setTimeout(() => onLoaded(), 500)
        return () => clearTimeout(id)
      }
    }, [state, onLoaded])

    if (state === "loading" || state === "left") {
      return (
        <div className={`loading-wrapper ${state === "left" ? "fade-out" : "fade-in"}`}>
          <div className="loading-screen"></div>
        </div>
      )
    }

    return (
    <main className={`hero ${state === "leaving" ? "fade-out" : ""}`}>
      <h1>How's My Climb?</h1>
      <div className="search-box">
        <select className="region-select">
          {regions.map(r => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </select>
        <input type="text" className="search-input" placeholder="Summoner name + #NA1" onKeyDown={e => e.key === "Enter" && handleSearch()} />
        <button className="search-btn" onClick={handleSearch}>SEARCH</button>
      </div>
    </main>
  )
}