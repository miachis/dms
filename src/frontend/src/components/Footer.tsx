import styles from "../static/Footer.module.css";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer>
      <ul className={styles.footerUnorderedList}>
        <li className={styles.listHeading}>Company</li>
        <li className={styles.footerListItem}>
          <a href="#about" className={styles.footerLinks}>
            About
          </a>
        </li>
        <li className={styles.footerListItem}>
          <a href="#features" className={styles.footerLinks}>
            Features
          </a>
        </li>
      </ul>
      <ul className={styles.footerUnorderedList}>
        <li className={styles.listHeading}>Legal</li>
        <li className={styles.footerListItem}>
          <Link to={"/privacy-policy"} className={styles.footerLinks}>
            Privacy Policy
          </Link>
        </li>
        <li className={styles.footerListItem}>
          <Link to={"/delete-account"} className={styles.footerLinks}>
            Delete Account
          </Link>
        </li>
        <li className={styles.footerListItem}>
          <Link to={"/terms-of-service"} className={styles.footerLinks}>
            Terms of Service
          </Link>
        </li>
      </ul>
      <ul className={styles.footerUnorderedList}>
        <li className={styles.listHeading}>Contact</li>
        <li className={styles.footerListItem}>dms@gmail.com</li>
        <li className={styles.footerListItem}>
          <a href="https://github.com/miachis/dms" id={styles.githubLink}>
            GitHub
          </a>
        </li>
      </ul>
      <div id={styles.lastFooterElement}>
        <p id="copyright-text">©2026 DM's. All rights reserved.</p>
      </div>
    </footer>
  );
}
