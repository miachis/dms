import styles from "../static/BackButton.module.css";

export function BackButton() {
  const handleClick = () => {
    window.history.back();
  };
  return (
    <button onClick={handleClick} id={styles.btn}>
      ← <span id={styles.span}>Back</span>
    </button>
  );
}
