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
    user.seasons[0].data = req.body;
    console.log("user:", user);
    user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
}
