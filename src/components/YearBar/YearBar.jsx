import { Link } from "react-router-dom";

export default function YearBar({ user }) {

  return (
    <nav>
      <Link to="http://fantasy.espn.com/apis/v3/games/ffl/seasons/2020/segments/0/leagues/{user.league}?view=mDraftDetail&view=mLiveScoring&view=mMatchupScore&view=mPendingTransactions&view=mPositionalRatings&view=mSettings&view=mTeam&view=modular&view=mNav">
        2020
      </Link>
      <Link to="http://fantasy.espn.com/apis/v3/games/ffl/seasons/2019/segments/0/leagues/{user.league}?view=mDraftDetail&view=mLiveScoring&view=mMatchupScore&view=mPendingTransactions&view=mPositionalRatings&view=mSettings&view=mTeam&view=modular&view=mNav">
        2019
      </Link>
    </nav>
  );
}
