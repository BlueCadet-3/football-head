import { Component } from "react";
import { signUp } from "../../utilities/users-service";
import { getSeason } from "../../utilities/espn-api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import "./SignUpForm.css";

export default class SignUpForm extends Component {
  state = {
    email: "",
    league: "",
    team: "",
    password: "",
    confirm: "",
    error: "",
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value, 
      error: "",
    });
  };

  handleSubmit = async (evt) => {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // We don't want to send the 'error' or 'confirm' property,
      //  so let's make a copy of the state object, then delete them
      const formData = { ...this.state };
      delete formData.error;
      delete formData.confirm;
      // The promise returned by the signUp service method
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await signUp(formData);
      this.props.setUser(user);
      
      const season = await getSeason(formData.league, 2020);
      console.log(season);
    } catch {
      this.setState({ error: "Sign Up Failed - Try Again" });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div>
        <div className="form-container">
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <label for="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="Required"
              required
            />
            <label for="league">
              League ID &nbsp;
              <div className="tooltip">
                <FontAwesomeIcon icon={faQuestionCircle}>
                  <span className="tooltiptext">
                    <img
                      src="https://www.scriptol.com/images/apache.png"
                      alt="League ID Tooltip"
                    />
                    <h3>How use my site</h3>
                    The description with an image.
                  </span>
                </FontAwesomeIcon>
              </div>
            </label>
            <input
              type="number"
              name="league"
              id="league"
              value={this.state.league}
              onChange={this.handleChange}
              placeholder="Required"
              required
            />
            <label for="team">
              Team ID &nbsp;
              <FontAwesomeIcon icon={faQuestionCircle} />
            </label>
            <input
              type="number"
              name="team"
              id="team"
              value={this.state.team}
              onChange={this.handleChange}
              placeholder="Required"
              required
            />
            <label for="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="Required"
              required
            />
            <label for="confirm">Confirm</label>
            <input
              type="password"
              name="confirm"
              id="confirm"
              value={this.state.confirm}
              onChange={this.handleChange}
              placeholder="Required"
              required
            />
            <button className="AuthPage" type="submit" disabled={disable}>
              SIGN UP
            </button>
          </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}
