import './Logo.css';
import logo from "../Logo/logo-original.png";

export default function Logo() {
  return (
    <div className="Logo">
      <img preload="preload" as="image" src={logo} alt="Football Head logo" width="934" height="572"></img>
    </div>
  );
}
