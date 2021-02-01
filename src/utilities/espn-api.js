import sendRequest from "./send-request";

// const BASE_URL =
//   "https://cors-anywhere.herokuapp.com/https://fantasy.espn.com/apis/v3/games/ffl/seasons";

const BASE_URL =
  "https://fantasy.espn.com/apis/v3/games/ffl/seasons";

export function initSeason(league, year) {
  return sendRequest(
    `${BASE_URL}/${year}/segments/0/leagues/${league}?view=mTeam`
  );
}

export function getSeason(league, year) {
  return sendRequest(
    `${BASE_URL}/${year}/segments/0/leagues/${league}?view=mTeam`
  );
}

export function getPastSeasons(data) {
  return (
    sendRequest("/api/espn", "POST", data)
  )
}
