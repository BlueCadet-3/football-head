const User = require("../../models/user");
const fetch = require("node-fetch");

const BASE_URL = "http://fantasy.espn.com/apis/v3/games/ffl/seasons";

module.exports = {
  create,
};

async function create(req, res) {
  console.log("req.body1:", req.body);
  let seasonArr = req.body.status.previousSeasons.map((num) => {
    return { year: num };
  });
  try {
    const user = await User.findById(req.user._id);
    seasonArr.forEach((year) => {
      user.seasons.unshift(year);
    });
    user.seasons.unshift({ year: req.user.year });
    // user.seasons[0].data = req.body;
    user.seasons.forEach(async (season) => {
      console.log(season);
      setTimeout(
        if (season.year > 2017) {
          const seasonData = await fetch(
            `${BASE_URL}/${season.year}/segments/0/leagues/${req.user.league}?view=mTeam`,
            { headers: { "content-type": "application/json" } }
            );
            console.log("seasonData:", seasonData);
            season.data = seasonData;
          } else {
            console.log("Invalid Year");
          };
          
    ), 4000;
    user.save();
    console.log("createUser:", user);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
}

// async function create(req, res) {
//   console.log("req.body1:", req.body);
//   let seasonArr = req.body.status.previousSeasons.map((num) => {
//     return { year: num };
//   });
//   try {
//     const user = await User.findById(req.user._id);
//     seasonArr.forEach((year) => {
//       user.seasons.unshift(year);
//     });
//     user.seasons.unshift({ year: req.user.year });
//     // user.seasons[0].data = req.body;
//     user.seasons.forEach(async (season) => {
//       if (season.year > 2017) {
//         const seasonData = await setTimeout(fetch(
//           `${BASE_URL}/${season.year}/segments/0/leagues/${req.user.league}?view=mTeam`,
//           { headers: { "content-type": "application/json" } }
//         ), 1000);
//         console.log("seasonData:", seasonData);
//         season.data = seasonData;
//       } else {
//         console.log("Nope");
//       }
//     });
//     user.save();
//     console.log("createUser:", user);
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// }

// async function create(req, res) {
//   console.log("req.body1:", req.body);
//   let seasonArr = req.body.map((num) => {
//     return { year: num };
//   });
//   try {
//     const user = await User.findById(req.user._id);
//     seasonArr.forEach((year) => {
//       user.seasons.unshift(year);
//     });
//     user.seasons.unshift({ year: req.user.year });
//     user.save();
//     console.log("user:", user);
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// }
