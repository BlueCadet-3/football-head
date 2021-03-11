const User = require("../../models/user");
const fetch = require("node-fetch");
const mongoose = require("mongoose");

const HIST_URL = "https://fantasy.espn.com/apis/v3/games/ffl/leagueHistory";

module.exports = {
  create,
};

function seasonData(league, year) {
  return fetch(`${HIST_URL}/${league}?seasonId=${year}&view=mTeam`)
    .then((res) => res.json())
    .then((res) => res[0]);
}

async function create(req, res) {
  // Find the user in the database
  const user = await User.findById(req.user._id);
  // Create array with the years of previous seasons
  const seasonArr = await req.body.status.previousSeasons.map(async (num) => {
    let promise = await seasonData(req.user.league, num);
    console.log("promise: ", promise);
    return {
      year: num,
      data: promise,
    };
  });
  const updatedData = await Promise.all(seasonArr);
  console.log("updatedData: ", updatedData);
  console.log("seasonArr: ", seasonArr);
  // Add previous season data to user.seasons
  updatedData.forEach((year) => {
    user.seasons.unshift(year);
  });
  // Add the current year the user signed up with to seasons[0]
    // "Shloop" the data from req.body to the user
  user.seasons.unshift({ year: user.year, data: req.body });
  mongoose.set("debug", false);
  res.status(200).json(user);
  // Save!
  user.save(function (err) {
    if (err) {
      console.log(err);
      return;
    }
  });
}
