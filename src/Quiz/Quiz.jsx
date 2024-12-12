import { createContext, useContext, useState } from "react";
import GetQuizForm from "./GetQuizForm";
import QuizItem from "./QuizItem";
import QuizResults from "./QuizResults";
import { QuizContext } from "./QuizContext.jsx";
import Modal from "../UI/Modal";
import { isAuthenticated } from "../Util/Auth";
import { useNavigate } from "react-router-dom";
import styles from "./Quiz.module.css";

const popularQuizzes = [
  {
    id: 1,
    title: "Science Quiz",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500",
    category: "science",
    difficulty: "easy",
    numberOfQuestions: 10,
  },
  {
    id: 2,
    title: "History Quiz",
    image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=500",
    category: 23,
    difficulty: "easy",
    numberOfQuestions: 10,
  },
  {
    id: 3,
    title: "Geography Quiz",
    image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=500",
    category: 22,
    difficulty: "easy",
    numberOfQuestions: 10,
  },
  {
    id: 4,
    title: "Math Quiz",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500",
    category: 19,
    difficulty: "easy",
    numberOfQuestions: 10,
  },
];

const Quiz = () => {
  const navigate = useNavigate();
  const {
    isQuizStarted,
    isQuizCompleted,
    quizData,
    setQuizData,
    setIsQuizStarted,
    completedLeaderBoardQuiz,
    setStartedLeaderBoardQuiz,
  } = useContext(QuizContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(isQuizStarted);

  const onCloseModal = () => {
    setIsModalOpen(false);
    console.log("Modal closed");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const getLeaderBoardQuiz = async () => {
    setStartedLeaderBoardQuiz(true);

    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=15&category=9&difficulty=hard `
      );

      const data = await response.json();
      console.log("Leaderboard quiz data: ", data);
      setQuizData(data.results);
      setIsQuizStarted(true);
    } catch (error) {
      console.error("Error fetching leaderboard quiz data: ", error);
    }
  };

  return (
    <>
      <h1>Welcome to EduQuiz!</h1>
      {!isQuizStarted && !isQuizCompleted && (
        <div className={styles.quizOptionsContainer}>
          <>
            <div className={styles.customQuizSection}>
              <div>
                <h2>Ready to test your knowledge?</h2>
                <p>
                  Create your own personalized quiz by selecting your preferred
                  category, difficulty level, and number of questions. Click the
                  button below to get started and challenge yourself with a
                  custom-tailored quiz experience!
                </p>
              </div>

              <button onClick={openModal}>Get Your Custom Quiz</button>
            </div>

            <div className={styles.presetQuizSection}>
              {/* Preset quizzes here */}
              <h2>Popular Quizzes</h2>
              <div className={styles.quizTilesContainer}>
                {popularQuizzes.map((quiz) => (
                  <div key={quiz.id} className={styles.quizTile}>
                    <img
                      src={quiz.image}
                      alt={quiz.title}
                      className={styles.quizImage}
                    />
                    <div className={styles.quizContent}>
                      <h3 className={styles.quizTitle}>{quiz.title}</h3>
                      <button
                        className={styles.startButton}
                        onClick={() => {
                          getQuiz(
                            quiz.category,
                            quiz.difficulty,
                            quiz.numberOfQuestions
                          );
                        }}
                      >
                        Start Quiz
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Leaderboard Challenge section */}
            <div className={styles.leaderboardSection}>
              {!completedLeaderBoardQuiz &&
              !isQuizStarted &&
              isAuthenticated() ? (
                <div>
                  <h2>Weekly Leaderboard Challenge</h2>
                  <p>
                    Test your knowledge against other quiz enthusiasts in our
                    Weekly Leaderboard Challenge! Take on our curated set of
                    challenging questions and see how you rank among other
                    players. Each week features 15 hard difficulty questions
                    from general knowledge. Can you make it to the top of the
                    leaderboard?
                  </p>
                  <button onClick={getLeaderBoardQuiz}>
                    Get Weekly Leaderboard Quiz
                  </button>
                </div>
              ) : (
                !isQuizStarted && (
                  <div>
                    <h2>Weekly Leaderboard Challenge</h2>
                    <p>
                      Test your knowledge against other quiz enthusiasts in our
                      Weekly Leaderboard Challenge! Take on our curated set of
                      challenging questions and see how you rank among other
                      players. Each week features 15 hard difficulty questions
                      from general knowledge. Please sign in or create an
                      account in order to participate!
                    </p>
                    <button onClick={() => navigate("/signup")}>
                      Create an Account!
                    </button>
                  </div>
                )
              )}
            </div>
          </>
        </div>
      )}

      {isModalOpen && (
        <Modal onClose={onCloseModal}>
          <GetQuizForm onCloseModal={onCloseModal} />
        </Modal>
      )}

      {isQuizStarted && <QuizItem />}
      {isQuizCompleted && <QuizResults />}
    </>
  );
};

export default Quiz;
