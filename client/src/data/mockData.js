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
// 10 recent matches with realistic stats
export const matches = [
  {
    metadata: { matchId: "NA1_5001" },
    info: {
      gameCreation: 1711584000000,
      gameDuration: 1842,        // ~30 min
      gameMode: "CLASSIC",
      queueId: 420,              // solo/duo ranked
      participants: [{
        puuid: "mock-puuid-1234-5678-abcd",
        championId: 236,
        championName: "Lucian",
        kills: 8, deaths: 3, assists: 7,
        totalMinionsKilled: 214,
        goldEarned: 14820,
        totalDamageDealtToChampions: 24500,
        visionScore: 28,
        win: true,
        teamPosition: "BOTTOM",
        item0: 3031, item1: 3094, item2: 3085, item3: 3036, item4: 3006, item5: 0, item6: 3340,
      }],
    },
  },
  {
    metadata: { matchId: "NA1_5002" },
    info: {
      gameCreation: 1711497600000,
      gameDuration: 2104,
      gameMode: "CLASSIC",
      queueId: 420,
      participants: [{
        puuid: "mock-puuid-1234-5678-abcd",
        championId: 51,
        championName: "Caitlyn",
        kills: 5, deaths: 6, assists: 9,
        totalMinionsKilled: 198,
        goldEarned: 13200,
        totalDamageDealtToChampions: 19800,
        visionScore: 32,
        win: false,
        teamPosition: "BOTTOM",
        item0: 3031, item1: 3094, item2: 3085, item3: 3036, item4: 3006, item5: 0, item6: 3340,
      }],
    },
  },
  {
    metadata: { matchId: "NA1_5003" },
    info: {
      gameCreation: 1711411200000,
      gameDuration: 1560,
      gameMode: "CLASSIC",
      queueId: 420,
      participants: [{
        puuid: "mock-puuid-1234-5678-abcd",
        championId: 236,
        championName: "Lucian",
        kills: 12, deaths: 2, assists: 5,
        totalMinionsKilled: 187,
        goldEarned: 15600,
        totalDamageDealtToChampions: 28900,
        visionScore: 22,
        win: true,
        teamPosition: "BOTTOM",
        item0: 3031, item1: 3094, item2: 3085, item3: 3036, item4: 3006, item5: 3072, item6: 3340,
      }],
    },
  },
  {
    metadata: { matchId: "NA1_5004" },
    info: {
      gameCreation: 1711324800000,
      gameDuration: 2340,
      gameMode: "CLASSIC",
      queueId: 420,
      participants: [{
        puuid: "mock-puuid-1234-5678-abcd",
        championId: 81,
        championName: "Ezreal",
        kills: 6, deaths: 5, assists: 11,
        totalMinionsKilled: 230,
        goldEarned: 14100,
        totalDamageDealtToChampions: 21300,
        visionScore: 35,
        win: true,
        teamPosition: "BOTTOM",
        item0: 3042, item1: 3078, item2: 3508, item3: 3036, item4: 3158, item5: 0, item6: 3340,
      }],
    },
  },
  {
    metadata: { matchId: "NA1_5005" },
    info: {
      gameCreation: 1711238400000,
      gameDuration: 1680,
      gameMode: "CLASSIC",
      queueId: 420,
      participants: [{
        puuid: "mock-puuid-1234-5678-abcd",
        championId: 222,
        championName: "Jinx",
        kills: 9, deaths: 4, assists: 6,
        totalMinionsKilled: 202,
        goldEarned: 14500,
        totalDamageDealtToChampions: 26100,
        visionScore: 25,
        win: true,
        teamPosition: "BOTTOM",
        item0: 3031, item1: 3085, item2: 3094, item3: 3036, item4: 3006, item5: 0, item6: 3340,
      }],
    },
  },
  {
    metadata: { matchId: "NA1_5006" },
    info: {
      gameCreation: 1711152000000,
      gameDuration: 1920,
      gameMode: "CLASSIC",
      queueId: 420,
      participants: [{
        puuid: "mock-puuid-1234-5678-abcd",
        championId: 145,
        championName: "Kai'Sa",
        kills: 3, deaths: 7, assists: 4,
        totalMinionsKilled: 165,
        goldEarned: 10800,
        totalDamageDealtToChampions: 14200,
        visionScore: 19,
        win: false,
        teamPosition: "BOTTOM",
        item0: 3031, item1: 3085, item2: 3094, item3: 0, item4: 3006, item5: 0, item6: 3340,
      }],
    },
  },
  {
    metadata: { matchId: "NA1_5007" },
    info: {
      gameCreation: 1711065600000,
      gameDuration: 2010,
      gameMode: "CLASSIC",
      queueId: 420,
      participants: [{
        puuid: "mock-puuid-1234-5678-abcd",
        championId: 236,
        championName: "Lucian",
        kills: 7, deaths: 4, assists: 8,
        totalMinionsKilled: 195,
        goldEarned: 13900,
        totalDamageDealtToChampions: 22100,
        visionScore: 30,
        win: true,
        teamPosition: "BOTTOM",
        item0: 3031, item1: 3094, item2: 3085, item3: 3036, item4: 3006, item5: 3072, item6: 3340,
      }],
    },
  },
  {
    metadata: { matchId: "NA1_5008" },
    info: {
      gameCreation: 1710979200000,
      gameDuration: 1440,
      gameMode: "CLASSIC",
      queueId: 420,
      participants: [{
        puuid: "mock-puuid-1234-5678-abcd",
        championId: 51,
        championName: "Caitlyn",
        kills: 10, deaths: 1, assists: 6,
        totalMinionsKilled: 178,
        goldEarned: 14200,
        totalDamageDealtToChampions: 23400,
        visionScore: 20,
        win: true,
        teamPosition: "BOTTOM",
        item0: 3031, item1: 3094, item2: 3085, item3: 3036, item4: 3006, item5: 0, item6: 3340,
      }],
    },
  },
  {
    metadata: { matchId: "NA1_5009" },
    info: {
      gameCreation: 1710892800000,
      gameDuration: 2280,
      gameMode: "CLASSIC",
      queueId: 420,
      participants: [{
        puuid: "mock-puuid-1234-5678-abcd",
        championId: 81,
        championName: "Ezreal",
        kills: 4, deaths: 8, assists: 7,
        totalMinionsKilled: 210,
        goldEarned: 12600,
        totalDamageDealtToChampions: 18700,
        visionScore: 27,
        win: false,
        teamPosition: "BOTTOM",
        item0: 3042, item1: 3078, item2: 3508, item3: 3036, item4: 3158, item5: 0, item6: 3340,
      }],
    },
  },
  {
    metadata: { matchId: "NA1_5010" },
    info: {
      gameCreation: 1710806400000,
      gameDuration: 1740,
      gameMode: "CLASSIC",
      queueId: 420,
      participants: [{
        puuid: "mock-puuid-1234-5678-abcd",
        championId: 236,
        championName: "Lucian",
        kills: 11, deaths: 3, assists: 4,
        totalMinionsKilled: 192,
        goldEarned: 15100,
        totalDamageDealtToChampions: 27600,
        visionScore: 24,
        win: true,
        teamPosition: "BOTTOM",
        item0: 3031, item1: 3094, item2: 3085, item3: 3036, item4: 3006, item5: 3072, item6: 3340,
      }],
    },
  },
]
