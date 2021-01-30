const User = require("../../models/user");

module.exports = {
  create,
};

async function create(req, res) {
  let seasonArr = req.body.map((num) => {
    return { year: num };
  });
  try {
    const user = await User.findById(req.user._id);
    seasonArr.forEach((year) => {
      user.seasons.push(year);
    });
    // user.seasons.push(req.user.year);
    console.log(req.user.year);
    user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
}
