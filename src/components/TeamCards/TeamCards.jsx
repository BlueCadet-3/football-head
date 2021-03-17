import TeamCard from "./TeamCard/TeamCard";
import "./TeamCards.css";

export default function TeamCards({ teams }) {
  const data = teams.map((team) => {
    return {
      logo: team.logo,
      name: team.location + " " + team.nickname,
      points: Math.round(team.points),
    };
  });
  return (
    <div id="logos">
      {data.map((idx, team) => {
        return <TeamCard key={idx} team={team} />;
      })}
    </div>
  );
}
