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
            Policy
          </Link>
        </li>
        <li className={styles.navLinks}>
          <Link to={"/dashboard"} className={styles.navLinksInPage}>
            Dashboard
          </Link>
        </li>
        <Link to={"register"} className={styles.registerBtn}>
          <button className={styles.registerBtn}>Register</button>
        </Link>
      </ul>
    </nav>
  );
}
