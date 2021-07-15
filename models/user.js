const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SALT_ROUNDS = 6;

const seasonSchema = new Schema(
  {
    year: {
      type: Number,
      required: true,
    },
    data: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    league: {
      type: Number,
      required: true,
    },
    team: {
      type: Number,
      max: 1000,
      required: true,
    },
    year: {
      type: Number,
      max: 2020,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      minLength: 3,
      required: true,
    },
    seasons: [seasonSchema],
    ownerId: {
      type: Object,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

userSchema.methods.getTeamData = function () {
  return mongoose
    .model("User")
    .find(this.seasons[0].data.teams({ id: this.team }));
};
// userSchema.virtual("currentSeason").get(function () {
//   return this.seasons[0].data;
// });

userSchema.virtual('domain').get(function () {
  return this.email.slice(this.email.indexOf('@') + 1);
});

userSchema.pre("save", function (next) {
  // Save the reference to the user doc
  const user = this;
  if (!user.isModified("password")) return next();
  // password has been changed - salt and hash it
  bcrypt.hash(user.password, SALT_ROUNDS, function (err, hash) {
    if (err) return next(err);
    // Update the password property with the hash
    user.password = hash;
    return next();
  });
});

module.exports = mongoose.model("User", userSchema);
