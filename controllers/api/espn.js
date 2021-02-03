const User = require("../../models/user");

module.exports = {
  create,
};

async function create(req, res) {
  // Create array with the years of previous seasons
  let seasonArr = req.body.status.previousSeasons.map((num) => {
    return { year: num };
  });
  try {
    // Find the user
    const user = await User.findById(req.user._id);
    // For each previous season, add to user.seasons
    seasonArr.forEach((year) => {
      user.seasons.unshift(year);
    });
    // Add the current year the user signed up with to seasons[0]
    user.seasons.unshift({ year: req.user.year });
    // "Shloop" the data from req.body to the user
    user.seasons[0].data = req.body;
    // Save!
    user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
}
