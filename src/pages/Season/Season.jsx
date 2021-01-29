import { useEffect } from "react";
import * as usersService from "../../utilities/users-service";
import * as espnService from "../../utilities/espn-api";
import "../../../node_modules/react-vis/dist/style.css";
import {
  XYPlot,
  LineSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
  VerticalBarSeries,
  VerticalBarSeriesCanvas,
  LabelSeries,
} from "react-vis";
import "./Season.css";

export default function Season({ user }) {
  useEffect(() => {
    let season = espnService.getSeason(user.league, 2020);
    console.log(season);
  }, [user.league]);

  async function handleCheckToken() {
    // Promise will resolve to a Date object
    const expDate = await usersService.checkToken();
    console.log(new Date(expDate));
  }

  const data = [
    { x: 1, y: 122 },
    { x: 2, y: 134 },
    { x: 3, y: 109 },
    { x: 4, y: 145 },
    { x: 5, y: 117 },
    { x: 6, y: 116 },
    { x: 7, y: 123 },
    { x: 8, y: 132 },
    { x: 9, y: 99 },
    { x: 10, y: 89 },
    { x: 11, y: 119 },
    { x: 12, y: 129 },
    { x: 13, y: 139 },
    { x: 14, y: 109 },
  ];

  const dataz = [
    { x: 1, y: 122 },
    { x: 2, y: 134 },
    { x: 3, y: 109 },
    { x: 4, y: 145 },
    { x: 5, y: 117 },
    { x: 6, y: 116 },
    { x: 7, y: 123 },
    { x: 8, y: 132 },
    { x: 9, y: 99 },
    { x: 10, y: 89 },
    { x: 11, y: 119 },
    { x: 12, y: 129 },
    { x: 13, y: 139 },
    { x: 14, y: 109 },
  ];

  return (
    <>
      <h1>2020</h1>
      <p>
        League ID: {user.league} <br />
        Team ID: {user.team}
      </p>
      <button onClick={handleCheckToken}>Check When My Login Expires</button>
      {/* <button onClick={handleESPNRequest}>2020</button> */}
      <XYPlot width={600} height={400}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <VerticalBarSeries data={data} />
        <VerticalBarSeries data={dataz} />
      </XYPlot>
    </>
  );
}
