import {Link} from "react-router-dom";
import "./YearBar.css";

export default function YearBar({ user, setYear }) {

  return (
    <nav className="YearBar">
      {user.seasons.map((season, idx) => (
        <Link to="/dashboard" key={idx} onClick={() => setYear(idx)}>
          {season.year}
        </Link>
      ))}
    </nav>
  );
}
