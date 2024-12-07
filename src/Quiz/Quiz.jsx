import { createContext, useContext, useState } from "react";
import GetQuizForm from "./GetQuizForm";
import QuizItem from "./QuizItem";
import QuizResults from "./QuizResults";
import { QuizContext } from "./QuizContext.jsx";
const Quiz = () => {
  const { isQuizStarted, isQuizCompleted, quizData } = useContext(QuizContext);

  console.log(isQuizStarted);

  return (
    <>
      {!isQuizStarted && !isQuizCompleted && <GetQuizForm />}
      {isQuizStarted && <QuizItem />}

      {/* Wanna add a modal for the results maybe? */}
      {isQuizCompleted && <QuizResults />}
    </>
  );
};

export default Quiz;
