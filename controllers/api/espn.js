const User = require("../../models/user");

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
    // user.seasons[0].data.push(req.body);
    // const data = Object.assign(user.seasons[0].data, req.body);
    // console.log("dataPush?", user.seasons[0].data[0].data);
    user.save();
    console.log("controllerUser:", user);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
}

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
