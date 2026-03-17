const regions = [
  { value: "na1",  label: "NA"   },
  { value: "euw1", label: "EUW"  },
  { value: "eun1", label: "EUNE" },
  { value: "kr",   label: "KR"   },
  { value: "br1",  label: "BR"   },
  { value: "la1",  label: "LAN"  },
  { value: "la2",  label: "LAS"  },
  { value: "oc1",  label: "OCE"  },
  { value: "tr1",  label: "TR"   },
  { value: "ru",   label: "RU"   },
  { value: "jp1",  label: "JP"   },
  { value: "sg2",  label: "SG"   },
  { value: "tw2",  label: "TW"   },
  { value: "vn2",  label: "VN"   },
  { value: "th2",  label: "TH"   },
  { value: "ph2",  label: "PH"   },
]

export default function App() {
  const handleSearch = () => {
    const input = document.querySelector('.search-input').value
    console.log(input)
  }

  return (
    <main className="hero">
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
