import { useContext } from "react";
import { QuizContext } from "./QuizContext.jsx";

const GetQuizForm = (props) => {
  const { setQuizData, setIsQuizStarted } = useContext(QuizContext);

  const submitFormHandler = async (event) => {
    event.preventDefault();

    const amount = event.target.elements["amount"].value || 10;
    const category = event.target.elements["category"].value || 9;
    const difficulty = event.target.elements["difficulty"].value || "easy";

    // console.log(amount);
    // console.log(category);
    // console.log(difficulty);

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

    //props.onFetchQuiz(amount, category, difficulty);
  };

  return (
    <>
      <form onSubmit={submitFormHandler}>
        <label>Category</label>
        <select name="category">
          <option value={"9"}>General Knowledge</option>
          <option value={"11"}>Film</option>
          <option value={"12"}>Music</option>
          <option value={"14"}>Television</option>
          <option value={"19"}>Mathematics</option>
          <option value={"17"}>Science & Nature</option>
          <option value={"22"}>Geography</option>
          <option value={"2"}>Sports</option>
        </select>

        <label>Difficulty</label>
        <select name="difficulty">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <label>Number of Questions</label>
        <input name="amount" type="number" min="1" max="50"></input>
        <button type="submit">Get Quiz</button>
      </form>
    </>
  );
};

export default GetQuizForm;
