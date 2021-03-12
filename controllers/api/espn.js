const User = require("../../models/user");
const fetch = require("node-fetch");

module.exports = {
  create,
};

function seasonData(league, year) {
  return fetch(
    `https://fantasy.espn.com/apis/v3/games/ffl/leagueHistory/${league}?seasonId=${year}&view=mMatchupScore&view=mPendingTransactions&view=mPositionalRatings&view=mSettings&view=mTeam&view=modular&view=mNav`
  )
    .then((res) => res.json())
    .then((res) => res[0]);
}

async function create(req, res) {
  // Find the user in the database
  const user = await User.findById(req.user._id);
  // Create array with the years of previous seasons
  const seasonArr = await req.body.status.previousSeasons.map(async (num) => {
    let promise = await seasonData(req.user.league, num);
    return {
      year: num,
      data: promise,
    };
  });
  const updatedData = await Promise.all(seasonArr);
  // Add previous season data to user.seasons
  updatedData.forEach((year) => {
    user.seasons.unshift(year);
  });
  // Add the current year the user signed up with to seasons[0]
  // "Shloop" the data from req.body to the user
  user.seasons.unshift({ year: user.year, data: req.body });
  // Save!
  res.status(200).json(user);
  user.save(function (err) {
    if (err) {
      console.log(err);
      return;
    }
  });
}
