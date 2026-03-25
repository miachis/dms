import { GreenButton } from "./GreenButton";
import styles from "../static/GetStarted.module.css";
import { Link } from "react-router-dom";

export function GetStarted() {
  return (
    <div id={styles.getStartedContainer}>
      <p id={styles.landingPageText}>
        A fast and <span id={styles.easyText}>Easy</span>
        <br />
        way to Text
      </p>
      <div id={styles.getStarted}>
        <p id={styles.getStartedText}>Get Started</p>
        <Link to={"login"}>
          <GreenButton text="Login" />
        </Link>
      </div>
    </div>
  );
}
