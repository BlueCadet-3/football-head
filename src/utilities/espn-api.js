import sendRequest from "./send-request";

const BASE_URL = "https://fantasy.espn.com/apis/v3/games/ffl/seasons";

export function getSeason(league, year) {
  return sendRequest(
    `${BASE_URL}/${year}/segments/0/leagues/${league}?view=mTeam`
  );
}

// export function getById(id) {
//   return sendRequest(`${BASE_URL}/${id}`);
// }
