import SeasonPointsChart from "../../components/SeasonPointsChart/SeasonPointsChart";
// import TeamCards from "../../components/TeamCards/TeamCards";
import TransactionBarChart from "../../components/TransactionBarChart/TransactionBarChart";
import "./Dashboard.css";

export default function Dashboard({ user, year }) {
  const teams = user.seasons[year].data.teams;
  const seasonPoints = teams.map((team) => {
    return {
      logo: team.logo,
      name: team.location + " " + team.nickname,
      points: Math.round(team.points),
    };
  });
  const transactions = teams.map((team) => {
    return {
      name: team.location + " " + team.nickname,
      acquisitions: team.transactionCounter.acquisitions,
      ir: team.transactionCounter.moveToIR,
      trades: team.transactionCounter.trades
    }
  });

  console.log("transactions: ", transactions);

  return (
    <div className="Dashboard">
      <SeasonPointsChart data={seasonPoints} />
      <TransactionBarChart data={transactions} />
      {/* <TeamCards teams={teams} /> */}


      {/* <ResponsiveContainer>
        <PieChart width="100%" height="100%" className="Chart">
          <Pie
            data={data}
            dataKey="points"
            nameKey="name"
            label={true}
            labelLine={true}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer> */}
    </div>
  );
}
