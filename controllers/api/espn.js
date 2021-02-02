const User = require("../../models/user");
const fetch = require("node-fetch");
const puppeteer = require("puppeteer");

const BASE_URL = "http://fantasy.espn.com/apis/v3/games/ffl/seasons";

module.exports = {
  create,
};

async function create(req, res) {
  console.log("HELLO WORLD");
  let seasonArr = req.body.status.previousSeasons.map((num) => {
    return { year: num };
  });
  try {
    const user = await User.findById(req.user._id);
    seasonArr.forEach((year) => {
      user.seasons.unshift(year);
    });
    user.seasons.unshift({ year: req.user.year });
    console.log(user.seasons);
    // user.seasons[0].data = req.body;
    user.seasons.forEach(async (season) => {
      if (season.year > 2017) {
        let seasonData = await getData(req.user.league, season.year);
        console.log(seasonData);
        season.data = seasonData;
      } else {
        console.log("Invalid Year");
      }
    });
    user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function getData(league, year) {
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.goto(
    `${BASE_URL}/${year}/segments/0/leagues/${league}?view=mTeam`, {waitUntil: "networkidle2"}
  );
  console.log(page);
  // let content = await page.content();
  // let innerText = await page.evaluate(() => {
  //   return JSON.parse(document.querySelector("body:first-child").innerText);
  // });
  await browser.close();
  // return innerText;
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
