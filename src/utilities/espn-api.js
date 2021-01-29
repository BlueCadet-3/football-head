import sendRequest from "./send-request";

const BASE_URL =
  "https://cors-anywhere.herokuapp.com/https://fantasy.espn.com/apis/v3/games/ffl/seasons";

export function getSeason(league, year) {
  return sendRequest(
    `${BASE_URL}/${year}/segments/0/leagues/${league}?view=mTeam`
  );
}

export function createSeasons(yearArr) {
  return sendRequest(
    "/api/espn", "POST", yearArr
  );
}

// export function getById(id) {
//   return sendRequest(`${BASE_URL}/${id}`);
// }
