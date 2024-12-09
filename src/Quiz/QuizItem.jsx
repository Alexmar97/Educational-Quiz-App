import { useContext, useEffect, useState } from "react";
import styles from "./QuizItem.module.css";
import { QuizContext } from "./QuizContext";
import QuizResults from "./QuizResults";
import { decodeHtmlEntities } from "../Util/utils";
import Card from "../UI/Card";
import ProgressBar from "../ProgressBar";
import { getDatabase, ref, get, set, update } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const QuizItem = () => {
  const [questionIndex, setQuestionIndex] = useState(0);

  const [combinedOptions, setCombinedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [userAnswered, setUserAnswered] = useState(false);

  const { quizData, setIsQuizStarted, isQuizCompleted, setIsQuizCompleted } =
    useContext(QuizContext);
  const currentQuestion = quizData[questionIndex];

  const { userQuizItem, setUserQuizItem } = useContext(QuizContext);

  const navigate = useNavigate();

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

      //Only for leaderboard quizzes:
      setCompletedLeaderBoardQuiz(true);
      setStartedLeaderBoardQuiz(false);
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

  const resetQuiz = () => {
    setIsQuizCompleted(false);
    setIsQuizStarted(false);
    setQuestionIndex(0);
    setUserQuizItem({ score: 0, quizArray: [] });
    navigate("/");
  };

  const submitResultToLeaderBoard = async (score) => {
    const db = getDatabase();
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error("User not authenticated");
      return;
    }

    const userID = user.uid;
    const timeStamp = new Date().toISOString();

    //reference the leaderboard?:
    const leaderboardRef = ref(db, `leaderBoard/${userID}`);

    //Check if user exists in the leaderboard already:
    const snapshot = await get(leaderboardRef);
    const existingData = snapshot.val();

    //If there's no data in it or the new score is higher, then update:
    if (!existingData || score > existingData.maxScore) {
      await set(leaderboardRef, {
        maxScore: score,
        timeStamp: timeStamp,
      });
    }

    // const response = await fetch(
    //   "https://eduquiz-89c97-default-rtdb.firebaseio.com/leaderboard",
    //   { method: "POST", body: JSON.stringify(userQuizItem) }
    // );
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
          <button onClick={resetQuiz}>Reset Quiz</button>
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
      <ProgressBar progress={questionIndex} quizLength={quizData.length} />
      <p>
        Progress: {questionIndex} / {quizData.length}
      </p>
    </>
  );
};

export default QuizItem;

//progressMade = props.quizLength / props.progress
