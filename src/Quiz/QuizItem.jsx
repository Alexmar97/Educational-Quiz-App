import { useContext, useEffect, useState } from "react";
import styles from "./QuizItem.module.css";
import { QuizContext } from "./QuizContext";
import QuizResults from "./QuizResults";
import { decodeHtmlEntities } from "../Util/utils";
import Card from "../UI/Card";

const QuizItem = () => {
  const [questionIndex, setQuestionIndex] = useState(0);

  const [combinedOptions, setCombinedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [userAnswered, setUserAnswered] = useState(false);

  const { quizData, setIsQuizStarted, isQuizCompleted, setIsQuizCompleted } =
    useContext(QuizContext);
  const currentQuestion = quizData[questionIndex];

  //To store the questions and answers for review by the user:
  // const userQuizItem = {quizQuestions: [...props.quizData.question]};
  // const [userQuizItem, setUserQuizItem] = useState({
  //   score: 0,
  //   quizArray: [],
  // });

  const { userQuizItem, setUserQuizItem } = useContext(QuizContext);

  //userQuizItem object will store the entire quiz we got from API with correct and incorrect answers
  //needs to also have the user's selections they made during the quiz
  //Maybe also final score?

  //To use when user reaches end of quiz:
  // const [quizCompleted, setQuizCompleted] = useState(null);

  const nextButtonHandler = () => {
    if (questionIndex >= quizData.length - 1) {
      // Show results or disable the "Next" button

      return;
    }
    setQuestionIndex((prevQuestionIndex) => {
      return prevQuestionIndex + 1;
    });
    console.log(quizData[questionIndex]);

    setSelectedOption(null);
    setCorrectOption(null);
    setUserAnswered(false);

    console.log("Current score is: " + userQuizItem.score);
  };

  const previousButtonHandler = () => {
    setQuestionIndex((prevQuestionIndex) => {
      return prevQuestionIndex - 1;
    });
  };

  useEffect(() => {
    const shuffledOptions = shuffleArray([
      ...currentQuestion.incorrect_answers,
      currentQuestion.correct_answer,
    ]);

    setCombinedOptions(shuffledOptions);
  }, [questionIndex, currentQuestion]);

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  const anserCheck = () => {
    setCorrectOption(currentQuestion.correct_answer); // Set the correct answer
    setUserAnswered(true);

    const isCorrect = selectedOption === currentQuestion.correct_answer;

    console.log("isCorrect variable value: " + isCorrect);

    setUserQuizItem((prevState) => ({
      ...prevState,
      score: isCorrect ? prevState.score + 1 : prevState.score,
      quizArray: [
        ...prevState.quizArray,
        {
          question: currentQuestion.question,
          options: combinedOptions,
          userChose: selectedOption,
          correct_answer: currentQuestion.correct_answer,
        },
      ],
    }));

    console.log("userQuizItem variable value: " + userQuizItem.score);

    if (questionIndex == quizData.length - 1) {
      setIsQuizCompleted(true);
      setIsQuizStarted(false);
    }
  };

  const getButtonClassName = (option) => {
    // setSelectedOption(option);

    if (correctOption && option === correctOption) {
      return styles.correct; // Highlight the correct answer
    }
    if (selectedOption === option && correctOption === null) {
      return styles.selected; // Highlight the selected option before checking
    }
    if (
      correctOption &&
      selectedOption === option &&
      option !== correctOption
    ) {
      return styles.incorrect; // Highlight incorrect selection after checking
    }
    return ""; // Default styling
  };

  return (
    <>
      <Card>
        <div>
          <h3>{decodeHtmlEntities(currentQuestion.question)}</h3>
          {combinedOptions.map((option) => (
            <div key={option}>
              <button
                value={option}
                onClick={() => setSelectedOption(option)}
                className={getButtonClassName(option)}
              >
                {decodeHtmlEntities(option)}
              </button>
            </div>
          ))}
          {questionIndex > 0 && (
            <button onClick={previousButtonHandler}>Previous</button>
          )}
          {selectedOption != null && (
            <button onClick={anserCheck}>Check Answer</button>
          )}
          {questionIndex < quizData.length - 1 && (
            <button onClick={nextButtonHandler} disabled={!userAnswered}>
              Next
            </button>
          )}
          {userQuizItem.score != 0 && (
            <span>
              <p>
                Score: {userQuizItem.score} / {quizData.length}
              </p>
            </span>
          )}
          {/* the below block shows the completed quiz */}
          {/* {isQuizCompleted && <QuizResults />} */}
        </div>
      </Card>
    </>
  );
};

export default QuizItem;
