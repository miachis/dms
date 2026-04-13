import styles from "../static/Features.module.css";

export function Features() {
  return (
    <section id={styles.features}>
      <section id="features"></section>
      <h1 id={styles.featuresHeading}>Current Features Available</h1>
      <ul id={styles.featuresUnorderedList}>
        <li>
          <img src="/chat (1).png" alt="chat image" height={50} />
          Real time messaging between users
        </li>
        <li>
          <img src="user.png" alt="chat image" height={50} />
          User profile and profile picture
        </li>
        <li>
          <img src="time.png" alt="chat image" height={50} />
          Swift sending and receiving of messages
        </li>
        <li>
          <img src="communication.png" alt="chat image" height={50} />
          Friendships and Friendships status
        </li>
        <li>
          <img src="insurance.png" alt="chat image" height={50} />
          Secure and encrypted text transfers
        </li>
        <li>
          <img src="programming.png" alt="chat image" height={50} />
          Many other features ongoing development...
        </li>
      </ul>
    </section>
  );
}
