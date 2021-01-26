const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const leagueSchema = new Schema(
  {
    // name: { type: String, required: false },
    publicId: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("League", leagueSchema);
