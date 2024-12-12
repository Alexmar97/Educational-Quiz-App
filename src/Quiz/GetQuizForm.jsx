import { useContext } from "react";
import { QuizContext } from "./QuizContext.jsx";
import { isAuthenticated } from "../Util/Auth";
import styles from "./GetQuizForm.module.css";

const GetQuizForm = (props) => {
  const {
    setQuizData,
    setIsQuizStarted,
    setCompletedLeaderBoardQuiz,
    completedLeaderBoardQuiz,
    setStartedLeaderBoardQuiz,
  } = useContext(QuizContext);

  const submitFormHandler = async (event) => {
    event.preventDefault();

    const amount = event.target.elements["amount"].value || 10;
    const category = event.target.elements["category"].value || 9;
    const difficulty = event.target.elements["difficulty"].value || "easy";

    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`
      );

      const data = await response.json();
      console.log("Quiz data: ", data);
      setQuizData(data.results);
      setIsQuizStarted(true);
    } catch (error) {
      console.error("Error fetching quiz data: ", error);
    }

    props.onCloseModal();
  };

  // const getLeaderBoardQuiz = async () => {
  //   setStartedLeaderBoardQuiz(true);

  //   try {
  //     const response = await fetch(
  //       `https://opentdb.com/api.php?amount=15&category=9&difficulty=hard `
  //     );

  //     const data = await response.json();
  //     console.log("Leaderboard quiz data: ", data);
  //     setQuizData(data.results);
  //     setIsQuizStarted(true);
  //   } catch (error) {
  //     console.error("Error fetching leaderboard quiz data: ", error);
  //   }
  // };

  return (
    <>
      <form onSubmit={submitFormHandler} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Category</label>
          <select name="category" className={styles.select}>
            <option value="9">General Knowledge</option>
            <option value="11">Film</option>
            <option value="12">Music</option>
            <option value="14">Television</option>
            <option value="19">Mathematics</option>
            <option value="17">Science & Nature</option>
            <option value="22">Geography</option>
            <option value="2">Sports</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Difficulty</label>
          <select name="difficulty" className={styles.select}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Number of Questions</label>
          <input
            name="amount"
            type="number"
            min="1"
            max="50"
            className={styles.input}
            placeholder="Enter a number (1-50)"
          />
        </div>

        <button type="submit" className={styles.button}>
          Get Quiz
        </button>
      </form>
      {/* 
      {!completedLeaderBoardQuiz && isAuthenticated() && (
        <button onClick={getLeaderBoardQuiz}>
          Get Weekly Leaderboard Quiz
        </button>
      )} */}
    </>
  );
};

export default GetQuizForm;
