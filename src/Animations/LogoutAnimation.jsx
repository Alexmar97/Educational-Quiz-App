import { Player } from "lottie-react";
import goodbye from "./goodbye.json";

const LogoutAnimation = () => {
  return (
    <div>
      <h2>Logging Out...</h2>
      <Player
        autoplay
        loop
        src={goodbye}
        style={{ height: "300px", width: "300px" }}
      />
    </div>
  );
};

export default LogoutAnimation;
