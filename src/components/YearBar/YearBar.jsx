import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./YearBar.css";

export default function YearBar({ user, year, setYear }) {
  useEffect(() => {
    console.log(`You clicked idx ${year}`);
  });

  return (
    <nav className="YearBar">
      {user.seasons.map((season, idx) => (
        <button key={idx} onClick={() => setYear(idx)}>
          {season.year}
        </button>
      ))}
      {/* {user.seasons.map((season, idx) => (
        <Link key={idx} onClick={() => setYear(idx)}>
          {season.year}
        </Link>
      ))} */}
    </nav>
  );
}
