import { Link } from "react-router-dom";
import { BackButton } from "../components/BackButton";
import styles from "../static/Login.module.css";

export function Login() {
  return (
    <section>
      <BackButton />
      <div id={styles.loginContainer}>
        <form action="">
          <h1>Login</h1>
          <input type="email" placeholder="Enter your email" name="email" />
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
          />
          <button type="submit" id={styles.loginBtn}>
            Login
          </button>
          <p id={styles.p}>
            New here?{" "}
            <Link to={"/register"} id={styles.registerLink}>
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
