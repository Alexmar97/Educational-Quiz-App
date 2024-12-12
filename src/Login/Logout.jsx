import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DotLottiePlayer } from "@dotlottie/react-player";
import goodbye from "../Animations/goodbye.json";

const Logout = () => {
  console.log("Logout component rendered");
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");

      // Simulate a delay for the animation
      await new Promise((resolve) => setTimeout(resolve, 3000));
      navigate("/");
    };

    logout();
  }, [navigate]);
  //Any time Navigate changes, the component will re-render. Navigate of course will change depending if the user is logged in or not.

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Logging Out...</h2>
      <DotLottiePlayer
        src={goodbye}
        autoplay
        loop={false}
        style={{ height: "300px", width: "300px" }}
      />
    </div>
  );
};

export default Logout;
