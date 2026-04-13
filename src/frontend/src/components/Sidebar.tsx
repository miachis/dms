import { Link, useNavigate } from "react-router-dom";
import styles from "../static/Sidebar.module.css";

export function Sidebar() {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <aside>
      <ul id={styles.ul}>
        <li className={styles.li}>
          <Link to={"profile"} className={styles.link}>
            Profile
          </Link>
        </li>
        <li className={styles.li}>
          <Link to={"messages"} className={styles.link}>
            Messages
          </Link>
        </li>
        <li className={styles.li}>
          <Link to={"search"} className={styles.link}>
            Search
          </Link>
        </li>
        <li className={styles.li} onClick={logOut}>
          Logout
        </li>
      </ul>
    </aside>
  );
}
