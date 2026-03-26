import { useState, type ChangeEvent } from "react";
import styles from "../static/Signup.module.css";
import { Link } from "react-router-dom";
import { BackButton } from "../components/BackButton";

interface UserInfo {
  email: string;
  username: string;
  password: string;
}

// Add form validation to signup and login

const initState: UserInfo = { email: "", username: "", password: "" };

export function Signup() {
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [userInfo, setUserInfo] = useState<UserInfo>(initState);

  const handleEmail = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserInfo({ ...userInfo, email: e.target.value });
  };

  const handleUsername = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserInfo({ ...userInfo, username: e.target.value });
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserInfo({ ...userInfo, password: e.target.value });
  };

  const handleConfirmPassword = (e: ChangeEvent<HTMLInputElement>): void => {
    setConfirmPassword(e.target.value);
  };

  return (
    <section>
      <BackButton />
      <div id={styles.formContainer}>
        {/* post to an api */}
        <form action="" id={styles.signUpForm}>
          <h1>Register</h1>
          <input
            type="email"
            placeholder="Enter your email"
            value={userInfo.email}
            onChange={handleEmail}
            required
          />
          <input
            type="text"
            placeholder="Enter a username"
            value={userInfo.username}
            onChange={handleUsername}
            required
          />
          <input
            type="password"
            placeholder="Create your password"
            value={userInfo.password}
            onChange={handlePassword}
            required
          />
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={handleConfirmPassword}
            required
          />
          <button type="submit" id={styles.signUpBtn}>
            Register
          </button>
          <p id={styles.p}>
            Already have an account?{" "}
            <Link to={"/login"} id={styles.loginLink}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
