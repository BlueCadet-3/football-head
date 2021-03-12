import sendRequest from "./send-request";

const BASE_URL = "https://fantasy.espn.com/apis/v3/games/ffl/seasons";

export function initSeason(league, year) {
  return sendRequest(
    `${BASE_URL}/${year}/segments/0/leagues/${league}?&view=mMatchupScore&view=mPendingTransactions&view=mPositionalRatings&view=mSettings&view=mTeam&view=modular&view=mNav`
  );
}

export function getPastData(data) {
  return sendRequest("/api/espn", "POST", data);
}
