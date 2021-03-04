import { Component } from "react";
import { signUp } from "../../utilities/users-service";
import { initSeason, getPastData } from "../../utilities/espn-api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import "./SignUpForm.css";

export default class SignUpForm extends Component {
  state = {
    email: "app@a.com",
    league: "660619",
    team: "2",
    year: "2020",
    password: "123",
    confirm: "123",
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
      //
      // create user
      const user = await signUp(formData);
      // make call to ESPN API with provided league ID and most recent season
      const data = await initSeason(formData.league, formData.year);
      // update user "seasons" property with previous seasons as indicated by ESPN API
      // let updatedUser = await getPastSeasons(data.status.previousSeasons);
      console.log("user: ", user);
      console.log("data: ", data);
      // let updatedUser = await getPastSeasons(data);
      let updatedUser = await getPastData(data);
      // setUser to the user with "seasons" data
      console.log("updatedUser:", updatedUser);
      this.props.setUser(updatedUser);
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="Required"
              required
            />

            <label htmlFor="league">
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

            <label htmlFor="year">
              Year &nbsp;
              <div className="tooltip">
                <FontAwesomeIcon icon={faQuestionCircle}></FontAwesomeIcon>
              </div>
            </label>

            {/* <select
              name="year"
              id="year"
              onChange={this.handleChange}
              value={this.state.year}
            >
              <option selected value={2020}>
                2020
              </option>
              <option value={2019}>2019</option>
              <option value={2018}>2018</option>
            </select> */}

            <input
              type="number"
              name="year"
              id="year"
              value={this.state.year}
              onChange={this.handleChange}
              placeholder="Required"
              required
            />

            <label htmlFor="team">
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="Required"
              required
            />
            <label htmlFor="confirm">Confirm</label>
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
