const User = require("../../models/user");
const fetch = require("node-fetch");

module.exports = {
  create,
};

function seasonData(league, year) {
  return fetch(
    `https://fantasy.espn.com/apis/v3/games/ffl/leagueHistory/${league}?seasonId=${year}&view=mMatchupScore&view=mPendingTransactions&view=mPositionalRatings&view=mSettings&view=mTeam&view=modular&view=mNav`
  )
    .then((res) => res.json())
    .then((res) => res[0]);
}

async function create(req, res) {
  // Find the user in the database
  const user = await User.findById(req.user._id);
  // Create array with the years of previous seasons
  const seasonArr = await req.body.status.previousSeasons.map(async (num) => {
    let promise = await seasonData(req.user.league, num);
    return {
      year: num,
      data: promise,
    };
  });
  const updatedData = await Promise.all(seasonArr);
  // Add previous season data to user.seasons
  updatedData.forEach((year) => {
    user.seasons.unshift(year);
  });
  // Add the current year the user signed up with to seasons[0]
  // "Shloop" the data from req.body to the user
  user.seasons.unshift({ year: user.year, data: req.body });
  // Remove some data
  user.seasons.forEach((season) => {
    let data = season.data;
    // Delete useless data points
    delete data.draftDetail.inProgress;
    delete data.gameId;
    delete data.segmentId;
    // Delete most of member information
    data.members.forEach((member) => {
      delete member.displayName;
      delete member.firstName;
      delete member.isLeagueCreator;
      delete member.isLeagueManager;
      delete member.lastName;
      delete member.notificationSettings;
    });
    // Delete all convoluted position against opponent data
    delete data.positionAgainstOpponent;
    // Clean up schedule
    // data.schedule.forEach((game) => {
    //   delete game.away.cumulativeScore;
    //   delete game.away.pointsByScoringPeriod;
    //   delete game.home.cumulativeScore;
    //   delete game.home.pointsByScoringPeriod;
    //   delete game.id;
    // });
    // Delete useless settings data
    delete data.settings.isCustomizable;
    delete data.settings.restrictionType;
    // Delete useless roster data settings
    delete data.settings.rosterSettings.isBenchUnlimited;
    delete data.settings.rosterSettings.isUsingUndroppable;
    delete data.settings.rosterSettings.lineupLocktimeType;
    delete data.settings.rosterSettings.rosterLocktimeType;
    delete data.settings.rosterSettings.universeIds;
    // Delete useless schedule settings
    delete data.settings.scheduleSettings.divisions.forEach((division) => {
      delete division.id;
    });
    delete data.settings.scheduleSettings.matchupPeriods;
    delete data.settings.scheduleSettings.playoffSeedingRuleBy;
    // Delete useless scoring settings
    delete data.settings.scoringSettings.allowOutOfPosition;
    delete data.settings.scoringSettings.matchupTieRuleBy;
    delete data.settings.scoringSettings.playerRankType;
    delete data.settings.scoringSettings.scoringItems;
    // Delete useless trade settings
    delete data.settings.tradeSettings.allowOutOfUniverse;
    // Delete useless status data
    delete data.status.createdAsLeagueType;
    delete data.status.currentLeagueType;
    delete data.status.isExpired;
    delete data.status.isFull;
    delete data.status.isToBeDeleted;
    delete data.status.isViewable;
    delete data.status.waiverProcessStatus;
    // Delete useless teams data
    data.teams.forEach((team) => {
      delete team.isActive;
      delete team.pointsDelta;
      delete team.record.away.gamesBack;
      delete team.record.away.pointsAgainst;
      delete team.record.away.pointsFor;
      delete team.record.home.gamesBack;
      delete team.record.home.pointsAgainst;
      delete team.record.home.pointsFor;
      delete team.record.division.gamesBack;
      delete team.record.division.pointsAgainst;
      delete team.record.division.pointsFor;
      delete team.valuesByStat;
    });
  });
}

async function create(req, res) {
  // Find the user in the database
  const user = await User.findById(req.user._id);
  // Create array with the years of previous seasons
  const seasonArr = await req.body.status.previousSeasons.map(async (num) => {
    let promise = await seasonData(req.user.league, num);
    return {
      year: num,
      data: promise,
    };
  });
  const updatedData = await Promise.all(seasonArr);
  // Add previous season data to user.seasons
  updatedData.forEach((year) => {
    user.seasons.unshift(year);
  });
  // Add the current year the user signed up with to seasons[0]
  // Add the data from req.body to the user
  user.seasons.unshift({ year: user.year, data: req.body });
  // Run data through minimizing function
  minimizeData(user);
  // Save!
  res.status(200).json(user);
  user.save(function (err) {
    if (err) {
      console.log(err);
      return;
    }
  });
}
