import styles from "../static/About.module.css";

export function About() {
  return (
    <section id={styles.about}>
      <section id="about"></section>
      <h1>About</h1>
      <div className={styles.div}>
        <h3 className={styles.heads}>- Next-Gen Real-Time Messaging App</h3>
        <ol>
          <li className={styles.list}>
            Chat instantly with friends and groups
          </li>
          <li className={styles.list}>
            Send and receive messages in real-time
          </li>
          <li className={styles.list}>Secure and private conversations</li>
          <li className={styles.list}>Easy-to-use, intuitive interface</li>
          <li className={styles.list}>
            Supports message history and notifications
          </li>
        </ol>
      </div>
      <div className={styles.div}>
        <h3 className={styles.heads}>- Simple & User-Friendly Messaging</h3>
        <p id={styles.p}>
          Our messaging app is designed to be simple and easy to use, letting
          you connect with friends and family effortlessly. With a clean
          interface and intuitive features, sending messages, joining
          conversations, and staying in touch has never been more
          straightforward. It's all about making communication quick, smooth,
          and enjoyable.
        </p>
      </div>
    </section>
  );
}
