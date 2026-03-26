import { BackButton } from "../components/BackButton";
import { policies } from "../legal/policies";
import styles from "../static/PrivacyPolicy.module.css";

export function PrivacyPolicy() {
  return (
    <div id={styles.div}>
      <BackButton />
      <ol id={styles.ol}>
        {policies.map((policy) => {
          return <li className={styles.li}>- {policy}</li>;
        })}
      </ol>
    </div>
  );
}
