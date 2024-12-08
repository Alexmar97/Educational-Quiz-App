import styles from "./ProgressBar.module.css";

const Filler = (props) => {
  return (
    <div
      className={styles.filler}
      style={{ width: `${(props.progress / props.quizLength) * 100}%` }}
    ></div>
  );
};

export default Filler;
