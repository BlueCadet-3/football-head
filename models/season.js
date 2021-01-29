const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const seasonSchema = new Schema(
  {
    year: {
      type: Number,
      required: true
    },
    wins: {
      type: Number, 
      required: true
    },
    losses: {
      type: Number,
      required: true
    },
    userID: { 
      type: Schema.Types.ObjectId, ref: 'User'
    }
  }
)

module.exports = mongoose.model("Season", seasonSchema);
