const Season = require("../../models/season");

module.exports = {
  create,
  findSeason,
};

async function findSeason(req, res) {
  const season = await Season.find({}).populate("user").exec();
  res.json(season);
}

async function create(req, res) {
  try {
    const season = await Season.create(req.body);
    // res.json(season);
    console.log(season);
  } catch (err) {
    res.status(400).json(err);
  }
}
