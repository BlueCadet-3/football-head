import './Logo.css';
import logo from "../Logo/logo-original.png";

export default function Logo() {
  return (
    <div className="Logo">
      <img src={logo} alt="logo"></img>
    </div>
  );
}
