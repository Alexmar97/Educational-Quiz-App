import { useState } from "react";
import GetQuizForm from "./GetQuizForm";
import QuizItem from "./QuizItem";

const Quiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  console.log(isQuizStarted);

  const fetchQuiz = async (amount, category, difficulty) => {
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
  };

  return (
    <>
      {!isQuizStarted && <GetQuizForm onFetchQuiz={fetchQuiz} />}
      {isQuizStarted && <QuizItem quizData={quizData} />}
    </>
  );
};

export default Quiz;
