import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import PropTypes from "prop-types";
import "./Dashboard.css";

const colors = [
  "#000",
  "#111",
  "#222",
  "#333",
  "#444",
  "#555",
  "#555",
  "#555",
  "#555",
  "#555",
  "#555",
  "#555",
  "#555",
  "#555",
  "#555",
  "#555",
];

export default function Dashboard({ user, setUser, getUser }) {
  const teams = user.seasons[0].data.teams;
  const data = teams.map((team, idx) => {
    return {
      logo: teams[idx].logo,
      name: teams[idx].location + " " + teams[idx].nickname,
      points: teams[idx].points,
    };
  });

  return (
    <>
      <div id="logos">
        {data.map((logo) => {
          return <img className="logo" src={logo.logo} alt="team logo" />;
        })}
      </div>
      <ResponsiveContainer width="100%" height="40%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="4 1 2" />
          <YAxis type="number" domain={["auto", "auto"]} />
          <Tooltip />
          <Legend />
          {/* <Bar dataKey="points" fill="#8884d8" /> */}
          <Bar dataKey="points">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index]}
                strokeWidth={index === 2 ? 4 : 1}
              />
            ))}
          </Bar>
          <XAxis
            dataKey="name"
            interval={0}
            angle="-90"
            padding={{ left: 10, right: 10 }}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

// <Bar
//   dataKey="female"
//   fill="#8884d8"
//   label={{ position: "top" }}
// >
//   {data.map((entry, index) => (
//     <Cell key={`cell-${index}`} />
//   ))}
// </Bar>
