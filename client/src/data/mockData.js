// Mock data shaped to match Riot Games API responses
// Summoner: "Doublelift#NA1" on NA

// Riot Account API - /riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}
export const account = {
  puuid: "mock-puuid-1234-5678-abcd",
  gameName: "Doublelift",
  tagLine: "NA1",
}

// Summoner API - /lol/summoner/v4/summoners/by-puuid/{puuid}
export const summoner = {
  id: "mock-summoner-id",
  accountId: "mock-account-id",
  puuid: "mock-puuid-1234-5678-abcd",
  profileIconId: 4862,
  revisionDate: 1711584000000,
  summonerLevel: 247,
}

// League API - /lol/league/v4/entries/by-summoner/{summonerId}
export const ranked = [
  {
    leagueId: "mock-league-id-solo",
    queueType: "RANKED_SOLO_5x5",
    tier: "Diamond",
    rank: "II",
    summonerId: "mock-summoner-id",
    leaguePoints: 64,
    wins: 142,
    losses: 118,
    veteran: false,
    inactive: false,
    freshBlood: false,
    hotStreak: true,
  },
  {
    leagueId: "mock-league-id-flex",
    queueType: "RANKED_FLEX_SR",
    tier: "Platinum",
    rank: "IV",
    summonerId: "mock-summoner-id",
    leaguePoints: 12,
    wins: 23,
    losses: 19,
    veteran: false,
    inactive: false,
    freshBlood: false,
    hotStreak: false,
  },
]

// Champion Mastery API - /lol/champion-mastery/v4/champion-masteries/by-puuid/{puuid}/top?count=5
export const championMasteries = [
  {
    puuid: "mock-puuid-1234-5678-abcd",
    championId: 236,    // Lucian
    championLevel: 7,
    championPoints: 284320,
    lastPlayTime: 1711497600000,
    tokensEarned: 0,
  },
  {
    puuid: "mock-puuid-1234-5678-abcd",
    championId: 51,     // Caitlyn
    championLevel: 7,
    championPoints: 198450,
    lastPlayTime: 1711411200000,
    tokensEarned: 0,
  },
  {
    puuid: "mock-puuid-1234-5678-abcd",
    championId: 81,     // Ezreal
    championLevel: 6,
    championPoints: 156200,
    lastPlayTime: 1711324800000,
    tokensEarned: 2,
  },
  {
    puuid: "mock-puuid-1234-5678-abcd",
    championId: 222,    // Jinx
    championLevel: 6,
    championPoints: 112800,
    lastPlayTime: 1711238400000,
    tokensEarned: 1,
  },
  {
    puuid: "mock-puuid-1234-5678-abcd",
    championId: 145,    // Kai'Sa
    championLevel: 5,
    championPoints: 87650,
    lastPlayTime: 1711152000000,
    tokensEarned: 0,
  },
]

// Champion ID to name mapping (for the champions above)
export const championNames = {
  236: "Lucian",
  51:  "Caitlyn",
  81:  "Ezreal",
  222: "Jinx",
  145: "Kai'Sa",
  67:  "Vayne",
  119: "Draven",
  18:  "Tristana",
}

// Match History API - /lol/match/v5/matches/{matchId}
// 250 generated matches, oldest first (index 0 = 250 games ago)
const CHAMPS = [
  { id: 236, name: "Lucian" },
  { id: 51,  name: "Caitlyn" },
  { id: 81,  name: "Ezreal" },
  { id: 222, name: "Jinx" },
  { id: 145, name: "Kai'Sa" },
  { id: 67,  name: "Vayne" },
  { id: 119, name: "Draven" },
  { id: 18,  name: "Tristana" },
]

// Seeded pseudo-random so the data is consistent on every reload
function seededRand(seed) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    return (s >>> 0) / 0xffffffff
  }
}

function generateMatches(count) {
  const rand = seededRand(42)
  const baseTime = 1711584000000
  const result = []
  // ~55% win rate to simulate a climbing player
  for (let i = 0; i < count; i++) {
    const champ = CHAMPS[Math.floor(rand() * CHAMPS.length)]
    const win = rand() < 0.55
    const kills = win ? Math.floor(rand() * 10) + 4 : Math.floor(rand() * 7) + 1
    const deaths = win ? Math.floor(rand() * 4) + 1 : Math.floor(rand() * 6) + 2
    const assists = Math.floor(rand() * 10) + 2
    const teamKills = kills + Math.floor(rand() * 20) + 10
    result.push({
      metadata: { matchId: `NA1_${5001 + i}` },
      info: {
        gameCreation: baseTime - (count - i) * 3600000,
        gameDuration: Math.floor(rand() * 1200) + 1200,
        gameMode: "CLASSIC",
        queueId: 420,
        teamKills,
        participants: [{
          puuid: "mock-puuid-1234-5678-abcd",
          championId: champ.id,
          championName: champ.name,
          kills, deaths, assists,
          totalMinionsKilled: Math.floor(rand() * 80) + 150,
          goldEarned: Math.floor(rand() * 5000) + 10000,
          totalDamageDealtToChampions: Math.floor(rand() * 15000) + 10000,
          visionScore: Math.floor(rand() * 20) + 15,
          win,
          teamPosition: "BOTTOM",
        }],
      },
    })
  }
  return result
}

export const matches = generateMatches(250)
