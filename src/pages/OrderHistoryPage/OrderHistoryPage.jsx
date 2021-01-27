import * as usersService from '../../utilities/users-service';

export default function Dashboard() {

  async function handleCheckToken() {
    // Promise will resolve to a Date object
    const expDate = await usersService.checkToken();
    console.log(new Date(expDate));
  }

  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={handleCheckToken}>Check When My Login Expires</button>
    </>
  );
}
