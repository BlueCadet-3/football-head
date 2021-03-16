import React, { useState, PureComponent } from "react";
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
  "#FF0AEF",
  "#B001EB",
  "#860DFF",
  "#3A00E8",
  "#073DE8",
  "#1C8AFF",
  "#15B0EB",
  "#14F7FF",
  "#15E8B9",
  "#2BFF99",
  "#1CE850",
  "#34FF33",
];

export default function Dashboard({ user, year }) {
  const teams = user.seasons[year].data.teams;
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
