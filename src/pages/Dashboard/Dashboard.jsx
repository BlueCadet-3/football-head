import * as usersService from "../../utilities/users-service";
import * as espnService from "../../utilities/espn-api";

export default function Dashboard({ user }) {
  async function handleCheckToken() {
    // Promise will resolve to a Date object
    const expDate = await usersService.checkToken();
    console.log(new Date(expDate));
  }

  async function handleESPNRequest({ user }) {
    const espnRes = await espnService;
    console.log(espnRes);
  }

  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={handleCheckToken}>Check When My Login Expires</button>
      <button onClick={handleESPNRequest}>2020</button>
    </>
  );
}
