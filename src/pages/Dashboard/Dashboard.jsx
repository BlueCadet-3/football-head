import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // Legend,
  ResponsiveContainer,
} from "recharts";
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
  const data = teams.map((team) => {
    return {
      logo: team.logo,
      name: team.location + " " + team.nickname,
      points: Math.round(team.points),
    };
  });

  return (
    <div className="Dashboard">
      {/* <div id="logos">
        {data.map((team) => {
          return (
            <img
              className="logo"
              src={team.logo}
              alt={team.name}
              width="100px"
              height="100px"
            />
          );
        })}
      </div> */}

      <ResponsiveContainer width="100%" height="100%" className="Chart">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 40,
            left: 60,
            bottom: 0,
          }}
          barCategoryGap={0}
          layout="vertical"
        >
          <CartesianGrid strokeDasharray="4" horizontal={false} />
          <Tooltip />

          <YAxis dataKey="name" type="category" tickLine={false} />

          <Bar dataKey="points" background={false}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index]}
                strokeWidth={index === 2 ? 4 : 1}
              />
            ))}
          </Bar>

          <XAxis
            dataKey="points"
            type="number"
            domain={["(Math.round((dataMin/100 * 0.1))", "auto"]}
            // domain={[Math.round("dataMin - 200"), "dataMax + 100"]}
            tickCount={5}
          />
        </BarChart>
      </ResponsiveContainer>

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
