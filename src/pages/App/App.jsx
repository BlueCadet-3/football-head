import { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "./App.css";
import AuthPage from "../AuthPage/AuthPage";
import Dashboard from "../Dashboard/Dashboard";
import NavBar from "../../components/NavBar/NavBar";
import YearBar from "../../components/YearBar/YearBar";

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      {user ? (
        <>
          <Redirect to="/dashboard" />
          <NavBar user={user} setUser={setUser} />
          <YearBar user={user} />
          <Switch>
            <Route path="/dashboard">
              <Dashboard user={user} setUser={setUser} getUser={getUser} />
            </Route>
          </Switch>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
