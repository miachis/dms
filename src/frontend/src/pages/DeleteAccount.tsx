import { BackButton } from "../components/BackButton";
import { deleteAccount } from "../legal/deleteAccount";
import styles from "../static/DeleteAccount.module.css";

export function DeleteAccount() {
  return (
    <div id={styles.div}>
      <BackButton />
      <ol id={styles.ol}>
        {deleteAccount.map((item) => {
          return <li className={styles.li}>- {item}</li>;
        })}
      </ol>
    </div>
  );
}
