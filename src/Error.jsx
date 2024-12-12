import { useRouteError } from "react-router-dom";
import MainNavigation from "./Navigation/MainNavigation";
import React from "react";
import { DotLottiePlayer } from "@dotlottie/react-player";
import four04 from "./Animations/404Animation.json";
import styles from "./Error.module.css";

const ErrorPage = () => {
  const error = useRouteError();

  let title = "An error occurred";
  let message = "Something went wrong! Are you in the correct URL?";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page";
  }

  return (
    <div className={styles.container}>
      <MainNavigation />
      <div className={styles.animationContainer}>
        <DotLottiePlayer
          src={four04}
          autoplay
          loop
          style={{ height: "300px", width: "300px" }}
        />
      </div>

      <h2 className={styles.test}>Page not found! 😞</h2>
    </div>
  );
};

export default ErrorPage;
