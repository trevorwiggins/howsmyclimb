import { regions } from '../data/regions'
import { useState, useEffect } from "react";

export default function Home({ onLoaded }) {
  const [state, setState] = useState("home") // states: "home" | "leaving" | "loading"

  const handleSearch = () => {
    /*const input = document.querySelector('.search-input').value
    console.log(input)

    const summonerFound = true; // swap with api result when added 

    if (summonerFound) { */
    setState("leaving")
    setTimeout(() => setState("loading"), 600)
  }

    useEffect(() => {
      if (state === "loading") {
        //fake data load
        //const res = await fetch('/api/matches')
        //const matches = await res.json()
        setTimeout(() => onLoaded(), 2000)
      }
    }, [state])

    if (state === "loading") {
      return (
        <div className="loading-wrapper">
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
        <input type="text" className="search-input" placeholder="Summoner name + #NA1" />
        <button className="search-btn" onClick={handleSearch}>SEARCH</button>
      </div>
    </main>
  )
}