import "../../../node_modules/react-vis/dist/style.css";
import {
  XYPlot,
  // LineSeries,
  // VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
  VerticalBarSeries,
  // VerticalBarSeriesCanvas,
  // LabelSeries,
} from "react-vis";
import "./Dashboard.css";

export default function Dashboard({ user, setUser, getUser }) {
  const teams = user.seasons[0].data.teams;
  // const data = [
  //   { x: 1, y: teams[0].points },
  //   { x: 2, y: teams[1].points }, 
  //   { x: 3, y: teams[2].points },
  //   { x: 4, y: teams[3].points },
  //   { x: 5, y: teams[4].points },
  //   { x: 6, y: teams[5].points },
  //   { x: 7, y: teams[6].points },
  //   { x: 8, y: teams[7].points },
  //   { x: 9, y: teams[8].points },
  //   { x: 10, y: teams[9].points },
  //   { x: 11, y: teams[10].points },
  //   { x: 12, y: teams[11].points },
  // ];

  const data = [
    teams.map((team, idx) => {
      return { x: teams[idx].location + " " + teams[idx].nickname, y: teams[idx].points}
    })
  ]

  console.log("data: ", data);

  return (
    <>
    <div className="userCard">
      <span>
        <img className="logo" src={teams[7].logo} alt="team logo" />
      </span>
      <p>
      League ID: {user.league} <br />
      Team ID: {user.team} <br />
      Season: {user.seasons.length} | {user.year} <br />
      </p>
    </div>

      <XYPlot
        style={{ backgroundColor: "#777", color: "#FFF" }}
        width={600}
        height={400}
      >
        {/* <VerticalGridLines /> */}
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <VerticalBarSeries data={data} />
      </XYPlot>
    </>
  );
}
