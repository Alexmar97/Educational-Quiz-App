import { NavLink, Form, redirect, useNavigate } from "react-router-dom";
import styles from "./MainNavigation.module.css";
import { isAuthenticated } from "../Util/Auth";

const MainNavigation = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    navigate("/");
  };

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
          {!isAuthenticated() ? (
            <NavLink
              to="signup"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Sign Up
            </NavLink>
          ) : (
            <NavLink
              to="leaderboard"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Leaderboard
            </NavLink>
          )}
        </li>
        <li>
          {!isAuthenticated() ? (
            <NavLink
              to="login"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Login
            </NavLink>
          ) : (
            <NavLink
              to="logout"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Logout
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
