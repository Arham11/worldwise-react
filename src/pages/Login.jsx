import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("arhamchowdhry@gmail.com");
  const [password, setPassword] = useState("qwerty");
  const { login, logout, user, isAuthenticated } = useAuth();

  function handleLogin(e) {
    e.preventDefault();
    login(email, password);
  }

  useEffect(
    function () {
      if (isAuthenticated) {
        navigate("/app", { replace: true });
      }
    },
    [isAuthenticated, navigate]
  );
  return (
    <main className={styles.login}>
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button type="primary" onClick={(e) => handleLogin(e)}>
            Login
          </button>
        </div>
      </form>
    </main>
  );
}
