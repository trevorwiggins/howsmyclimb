const doSearch = () => {
    const searchTerm = document.querySelector('.search-input').value;
    console.log(searchTerm);

    
    const summonerFound = true; // swap with real result

    if (summonerFound) {
        document.querySelector('.hero').classList.add('fade-out');
    }
}

const observer = new IntersectionObserver((entries) => { //creates an observer to allow for animations when sections snap into view
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
    }
  })
}, { threshold: 0.5 }) // fires when 50% of section is visible

document.querySelectorAll('.section').forEach(section => {
  observer.observe(section)
})

const regions = [ // every available region, in the format { value: "region-code", label: "Region Name" }
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
];

const select = document.getElementById("region-select");
regions.forEach(({ value, label }) => {
  const opt = new Option(label, value);
  select.add(opt);
});