import sendRequest from "./send-request";

const BASE_URL = "https://fantasy.espn.com/apis/v3/games/ffl/seasons";

const HIST_URL = "https://fantasy.espn.com/apis/v3/games/ffl/leagueHistory";

export function initSeason(league, year) {
  return sendRequest(
    `${BASE_URL}/${year}/segments/0/leagues/${league}?view=mTeam`
  );
}

export function getPastData(data) {
  return sendRequest("/api/espn", "POST", data);
}

// export function getPastData(league, year) {
//   return sendRequest(`${HIST_URL}/${league}/?seasonId=${year}&view=mTeam`);
// }
