import { NavLink } from "react-router-dom";
import styles from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="quiz"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Get Quizzes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="login"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
