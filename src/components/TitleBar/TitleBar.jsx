import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../Logo/Logo";
import * as userService from "../../utilities/users-service";
import "./TitleBar.css";

export default function TitleBar({ user, setUser, year }) {
  function handleLogOut() {
    // Delegate to the users-service
    userService.logOut();
    // Update state will also cause a re-render
    setUser(null);
  }

  return (
    <div className="TitleBar">
      <nav className="TitleBar">
        <Logo />
        <div id="TitleBar">
        <h1>FOOTBALL HEAD</h1>
        {/* <h3>{user.seasons[year].data.settings.name}</h3> */}
        </div>
        <div id="logOut">
        <Link to="/" onClick={handleLogOut} id="logOut">
          <FontAwesomeIcon icon="sign-out-alt" id="logOut" />
        </Link>
        </div>
      </nav>
    </div>
  );
}
