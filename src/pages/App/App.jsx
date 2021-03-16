import { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import AuthPage from "../AuthPage/AuthPage";
import Dashboard from "../Dashboard/Dashboard";
import NavBar from "../../components/NavBar/NavBar";
import YearBar from "../../components/YearBar/YearBar";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(fas);

export default function App() {
  const [user, setUser] = useState(getUser());
  const [year, setYear] = useState(0);

  return (
    <main className="App">
      {user ? (
        <>
          <Redirect to="/dashboard" />
          <NavBar user={user} setUser={setUser} />
          <YearBar user={user} year={year} setYear={setYear} />
          <Switch>
            <Route path="/dashboard">
              <Dashboard user={user} year={year} />
            </Route>
          </Switch>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
