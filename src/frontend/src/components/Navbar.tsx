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
        <li className={styles.navLinks}>About</li>
        <li className={styles.navLinks}>Features</li>
        <li className={styles.navLinks}>FAQ</li>
        <li className={styles.navLinks}>Privacy Policy</li>
        <li>
          <Link to={"register"}>
            <GreenButton text="Register" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
