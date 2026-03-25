import styles from "../static/GreenButton.module.css";

interface GreenButtonProps {
  text: string;
}

export function GreenButton({ text }: GreenButtonProps) {
  return <button className={styles.greenBtn}>{text}</button>;
}
