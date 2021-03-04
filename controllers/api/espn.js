const User = require("../../models/user");
const fetch = require("node-fetch");
const mongoose = require("mongoose");

const HIST_URL = "https://fantasy.espn.com/apis/v3/games/ffl/leagueHistory";

module.exports = {
  create,
};

//       .then((res) => res.json())
//       .then((res) => res[0].seasonId);
async function seasonData(user, year) {
  const data = await fetch(
        `${HIST_URL}/${user.league}?seasonId=${year}&view=mTeam`
      )
}

async function create(req, res) {
  // Find the user in the database
  const user = await User.findById(req.user._id);
  // Create array with the years of previous seasons
  const seasonArr = req.body.status.previousSeasons.map((num) => {
    return {
      year: num,
      // data: seasonData(req.user.league, num)
    };
  });
  seasonArr.forEach((year) => {
    user.seasons.unshift(year);
  });
  console.log("seasonArr: ", seasonArr);
  try {
    console.log("req.body: ", req.body.seasonId);
    // For each previous season, add to user.seasons
    // Add the current year the user signed up with to seasons[0]
    user.seasons.unshift({ year: user.year, data: req.body });
    // "Shloop" the data from req.body to the user
    // user.seasons[0].data = req.body;
    // Retrieve historical season data
    console.log("seasons: ", user.seasons);
    // user.seasons.forEach(async (season) => {
    //   if (!season.data) {
    //     let seasonData = await fetch(
    //       `${HIST_URL}/${user.league}?seasonId=${season.year}&view=mTeam`
    //     )
    //       .then((res) => res.json())
    //       .then((res) => console.log(res[0].seasonId));
    //     // console.log("season: ", season);
    //     // console.log("seasonData: ", season.year, seasonData);
    //   }
    // });

    const data = await seasonData(req.user.league, );

    // Save!
    console.log("user2: ", user.seasons);
    mongoose.set("debug", false);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
  user.save(function (err) {
    if (err) {
      console.log(err);
      return;
    }
  });
}

// for (var i=1; i < user.seasons.length; i++) {
//   let newData;
//   fetch(
//       `${HIST_URL}/${user.league}?seasonId=${user.seasons[i].year}&view=mTeam`
//     )
//     .then((res) => res.json())
//     .then((res) => newData = res);
//   user.seasons[i].data = newData;
//   console.log("newData: ", newData);
// }
