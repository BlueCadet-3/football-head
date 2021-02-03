import * as usersService from "../../utilities/users-service";
// import { useEffect } from "react";
// import * as espnService from "../../utilities/espn-api";
import "../../../node_modules/react-vis/dist/style.css";
import {
  XYPlot,
  // LineSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
  VerticalBarSeries,
  // VerticalBarSeriesCanvas,
  // LabelSeries,
} from "react-vis";
import "./Dashboard.css";
import { render } from "@testing-library/react";

export default function Dashboard({ user, setUser, getUser }) {
  async function handleCheckToken() {
    // Promise will resolve to a Date object
    const expDate = await usersService.checkToken();
    console.log(new Date(expDate));
  }

  const teams = user.seasons[0].data.teams;
  const data = [
    { x: 1, y: teams[0].points },
    { x: 2, y: teams[1].points },
    { x: 3, y: teams[2].points },
    { x: 4, y: teams[3].points },
    { x: 5, y: teams[4].points },
    { x: 6, y: teams[5].points },
    { x: 7, y: teams[6].points },
    { x: 8, y: teams[7].points },
    { x: 9, y: teams[8].points },
    { x: 10, y: teams[9].points },
    { x: 11, y: teams[10].points },
    { x: 12, y: teams[11].points },
  ];

  return (
    <>
      <h1>Dashboard</h1> - <span><img className="logo" src={teams[1].logo} alt="team logo" /></span>
      <h5> League ID: {user.league} </h5>
      <h5>Team ID: {user.team} </h5>
      <h5>
        Season: {user.seasons.length} | {user.year}
      </h5>
      <h5>
        Record: {teams[1].record.overall.wins} -{" "}
        {teams[1].record.overall.losses}
      </h5>
      <XYPlot
        style={{ backgroundColor: "#333", color: "white" }}
        width={600}
        height={400}
      >
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <VerticalBarSeries data={data} />
      </XYPlot>
    </>
  );
}
