import styles from "../static/Features.module.css";

export function Features() {
  return (
    <section id={styles.features}>
      <section id="features"></section>
      <h1 id={styles.featuresHeading}>Current Features Available</h1>
      <ul id={styles.featuresUnorderedList}>
        <li>
          <img src="/chat.png" alt="chat image" height={50} />
          Real time messaging between users
        </li>
        <li>
          <img src="social-media.png" alt="chat image" height={50} />
          User profile and Biography
        </li>
        <li>
          <img src="fast-time.png" alt="chat image" height={50} />
          Swift sending and receiving of messages
        </li>
        <li>
          <img src="friends.png" alt="chat image" height={50} />
          Friendships and Friendships status
        </li>
        <li>
          <img src="encrypted.png" alt="chat image" height={50} />
          Secure and encrypted text transfers
        </li>
        <li>
          <img src="new-features.png" alt="chat image" height={50} />
          Many other features ongoing development...
        </li>
      </ul>
    </section>
  );
}
