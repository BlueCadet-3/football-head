import { Link } from "react-router-dom";
import "./YearBar.css";

export default function YearBar({ user }) {
  console.log(user);
  return (
    <nav className="YearBar">
      <Link to="/2020">2020</Link>
      <Link to="/2019">2019</Link>
    </nav>
  );
}
