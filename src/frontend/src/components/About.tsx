import styles from "../static/About.module.css";

export function About() {
  return (
    <section id={styles.about}>
      <h1>About</h1>
      <div>
        <h1>Some text</h1>
        <ul>
          <li>Lorem ipsum</li>
          <li>Lorem ipsum</li>
          <li>Lorem ipsum</li>
          <li>Lorem ipsum</li>
          <li>Lorem ipsum</li>
        </ul>
      </div>
      <div>
        <h1>Some text</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam harum
          molestias ad ipsa, totam assumenda sunt iure distinctio
        </p>
      </div>
      <div>
        <h1>Some text</h1>
      </div>
    </section>
  );
}
