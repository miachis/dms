import styles from "../static/Footer.module.css";

export function Footer() {
  return (
    <footer>
      <ul className={styles.footerUnorderedList}>
        <li className={styles.listHeading}>Company</li>
        <li className={styles.footerListItem}>About</li>
        <li className={styles.footerListItem}>Features</li>
      </ul>
      <ul className={styles.footerUnorderedList}>
        <li className={styles.listHeading}>Legal</li>
        <li className={styles.footerListItem}>Privacy Policy</li>
        <li className={styles.footerListItem}>Delete Account</li>
        <li className={styles.footerListItem}>Terms of Service</li>
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
      <p id="copyright-text">©2026 DM's. All rights reserverd.</p>
    </footer>
  );
}
