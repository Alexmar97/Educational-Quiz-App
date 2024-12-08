import Filler from "./Filler";
import styles from "./ProgressBar.module.css";

const ProgressBar = (props) => {
  return (
    <div className={styles["progress-bar"]}>
      <Filler progress={props.progress} quizLength={props.quizLength} />
    </div>
  );
};

export default ProgressBar;
