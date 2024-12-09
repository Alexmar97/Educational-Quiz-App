import { createContext, useState } from "react";

// Create the context
export const QuizContext = createContext();

// Create the provider
export const QuizProvider = ({ children }) => {
  // Shared state:

  //Coming from GetQuizForm.jsx(will be needed at QuizItem.jsx):
  const [quizData, setQuizData] = useState([]);

  //Coming from QuizItem.jsx (will be needed at QuizResults.jsx):
  const [userQuizItem, setUserQuizItem] = useState({
    score: 0,
    quizArray: [],
  });

  //Coming from Quiz.jsx:
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  //Additional state:
  const [completedLeaderBoardQuiz, setCompletedLeaderBoardQuiz] =
    useState(false);
  const [startedLeaderBoardQuiz, setStartedLeaderBoardQuiz] = useState(false);

  // Context value
  const contextValue = {
    quizData,
    setQuizData,
    userQuizItem,
    setUserQuizItem,
    isQuizStarted,
    setIsQuizStarted,
    isQuizCompleted,
    setIsQuizCompleted,
    completedLeaderBoardQuiz,
    setCompletedLeaderBoardQuiz,
    startedLeaderBoardQuiz,
    setStartedLeaderBoardQuiz,
  };

  return (
    <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
  );
};
