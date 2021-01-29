import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../components/Logo/Logo";
import * as userService from "../../utilities/users-service";
import "./NavBar.css";

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    // Delegate to the users-service
    userService.logOut();
    // Update state will also cause a re-render
    setUser(null);
  }

  return (
    <div className="NavBar">
      <nav className="NavBar">
        <Logo />
        <h1>FOOTBALL HEAD</h1>
        <div id="logOut">
        <Link to="/" onClick={handleLogOut} id="logOut">
          <FontAwesomeIcon icon="sign-out-alt" id="logOut" />
        </Link>
        </div>
      </nav>
    </div>
  );
}
