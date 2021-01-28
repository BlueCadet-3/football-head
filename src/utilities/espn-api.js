import sendRequest from "./send-request";

const BASE_URL =
  "http://fantasy.espn.com/apis/v3/games/ffl/seasons";

export function get2020Season(league) {
  return sendRequest(`${BASE_URL}/2020/segments/0/leagues/${league}?view=mTeam`);
}

export function getById(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}
