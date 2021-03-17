import "./TeamCard.css";

export default function TeamCard({team}) {
  return(
    <>
      <div>
        {team.currentProjectedRank}
      </div>
    </>
  );
}
