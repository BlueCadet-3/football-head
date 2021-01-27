import { useState } from "react";
import "./AuthPage.css";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import Logo from "../../components/Logo/Logo";

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <main className="AuthPage">
      <h1 className="AuthPage">FOOTBALL HEAD</h1>
        <Logo />
      {showLogin ? (
        <SignUpForm setUser={setUser} />
      ) : (
        <LoginForm setUser={setUser} />
      )}
      <div>
        <h2 className="AuthPage" onClick={() => setShowLogin(!showLogin)}>
          {showLogin ? "LOG IN" : "SIGN UP"}
        </h2>
      </div>
    </main>
  );
}
