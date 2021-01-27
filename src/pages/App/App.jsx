import { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import "./App.css";
import AuthPage from "../AuthPage/AuthPage";
import NewOrderPage from "../NewOrderPage/NewOrderPage";
import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";
import NavBar from "../../components/NavBar/NavBar";
import YearBar from "../../components/YearBar/YearBar";

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <YearBar user={user} />
          <Switch>

            <Route path="/orders/new">
              <NewOrderPage />
            </Route>

            <Route path="/orders">
              <OrderHistoryPage />
            </Route>

            <Redirect to="/orders" />

          </Switch>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
