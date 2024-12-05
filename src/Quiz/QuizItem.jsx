import { useEffect, useState } from "react";
import styles from "./QuizItem.module.css";

const QuizItem = (props) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const currentQuestion = props.quizData[questionIndex];
  const [combinedOptions, setCombinedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);

  //To store the questions and answers for review by the user:
  // const userQuizItem = {quizQuestions: [...props.quizData.question]};
  const [userQuizItem, setUserQuizItem] = useState([]);

  //userQuizItem object will store the entire quiz we got from API with correct and incorrect answers
  //needs to also have the user's selections they made during the quiz
  //Maybe also final score?

  //To use when user reaches end of quiz:
  const [quizCompleted, setQuizCompleted] = useState(null);

  function decodeHtmlEntities(text) {
    const parser = new DOMParser();
    const decodedString = parser.parseFromString(text, "text/html")
      .documentElement.textContent;
    return decodedString;
  }

  const nextButtonHandler = () => {
    if (questionIndex >= props.quizData.length - 1) {
      // Show results or disable the "Next" button

      return;
    }
    setQuestionIndex((prevQuestionIndex) => {
      return prevQuestionIndex + 1;
    });
    console.log(props.quizData[questionIndex]);

    setSelectedOption(null);
    setCorrectOption(null);
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

    setUserQuizItem((prevState) => [
      ...prevState,
      {
        question: currentQuestion.question,
        options: combinedOptions,
        userChose: selectedOption,
      },
    ]);

    if (questionIndex == props.quizData.length - 1) setQuizCompleted(true);
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
      <div>
        <p>TEST FROM QUIZ ITEM</p>
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
        {questionIndex < props.quizData.length - 1 && (
          <button onClick={nextButtonHandler}>Next</button>
        )}
        {quizCompleted && (
          <div>
            {userQuizItem.map((item, index) => (
              <div key={index}>
                <h4>Question: {decodeHtmlEntities(item.question)}</h4>
                <ul>
                  {item.options.map((opt, idx) => (
                    <li key={idx}>
                      {decodeHtmlEntities(opt)} -
                      {opt === item.userChose ? " (Your Choice)" : ""}
                      {opt === currentQuestion.correct_answer
                        ? " (Correct)"
                        : ""}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default QuizItem;
