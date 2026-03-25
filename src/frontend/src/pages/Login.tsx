import styles from "../static/Login.module.css";

export function Login() {
  return (
    <div id={styles.loginContainer}>
      <form action="">
        <input type="email" placeholder="Enter your email" name="email" />
        <input type="password" placeholder="Password" name="password" />
      </form>
    </div>
  );
}
