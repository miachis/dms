import { GreenButton } from "./GreenButton";
import { Link } from "react-router-dom";
import styles from "../static/Navbar.module.css";

export function Navbar() {
  return (
    <nav>
      <a href="#" id={styles.brandText}>
        DM's
      </a>
      <ul className={styles.unorderedList}>
        <li className={styles.navLinks}>
          <a href="#about" className={styles.navLinksInPage}>
            About
          </a>
        </li>
        <li className={styles.navLinks}>
          <a href="#features" className={styles.navLinksInPage}>
            Features
          </a>
        </li>
        <li className={styles.navLinks}>
          <Link to={"/privacy-policy"} className={styles.navLinksInPage}>
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link to={"register"}>
            <GreenButton text="Register" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
