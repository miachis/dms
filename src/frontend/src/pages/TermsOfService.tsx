import { BackButton } from "../components/BackButton";
import { termsOfService } from "../legal/termsOfService";
import styles from "../static/TermsOfService.module.css";

export function TermsOfService() {
  return (
    <div id={styles.div}>
      <BackButton />
      <ol id={styles.ol}>
        {termsOfService.map((item) => {
          return <li className={styles.li}>- {item}</li>;
        })}
      </ol>
    </div>
  );
}
