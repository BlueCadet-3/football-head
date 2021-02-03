import { NavLink } from "react-router-dom";
import "./YearBar.css";

export default function YearBar({ user }) {
  return (
    <nav className="YearBar">
      <NavLink to="/dashboard">2020</NavLink>
    </nav>
  );
}
