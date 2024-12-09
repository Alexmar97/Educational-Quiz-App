import { useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import styles from "./HomePage.module.css";
import { QuizContext } from "./Quiz/QuizContext.jsx";
import { Navigate } from "react-router-dom";

const HomePage = () => {
  const { setIsQuizStarted, setQuizData } = useContext(QuizContext);

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log("uid", uid);
      } else {
        // User is signed out
        // ...
        console.log("user is logged out");
      }
    });
  }, []);

  const popularQuizzes = [
    {
      id: 1,
      title: "Science Quiz",
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500",
      category: "science",
      difficulty: "easy",
      numberOfQuestions: 10,
    },
    {
      id: 2,
      title: "History Quiz",
      image:
        "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=500",
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
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500",
      category: 19,
      difficulty: "easy",
      numberOfQuestions: 10,
    },
  ];

  const getQuiz = async (category, difficulty, numberOfQuestions) => {
    setIsQuizStarted(true);
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty} `
      );

      const data = await response.json();
      console.log("Quiz data: ", data);
      setQuizData(data.results);
      setIsQuizStarted(true);
    } catch (error) {
      console.error("Error fetching leaderboard quiz data: ", error);
    }

    navigate("/quiz");
  };

  return (
    <>
      <div>
        <h1>Welcome Home</h1>
        <div>
          <h2>What is EduQuiz?</h2>
          <p>
            EduQuiz is a platform that allows you to take quizzes on a variety
            of topics. Test Your Knowledge Across a World of Topics! Ready to
            Challenge Your Brain?
          </p>
        </div>

        <div>
          <h2>How to use EduQuiz</h2>
          <p>
            To get started, simply click the "Get Quiz" button. You can choose
            the category, difficulty, and number of questions. Once you've
            selected your preferences, click "Get Quiz" to start the quiz.
          </p>
        </div>

        <div>
          <h2>What does EduQuiz offer?</h2>
          <p>
            EduQuiz offers a wide range of quizzes on a variety of topics. You
            can choose the category, difficulty, and number of questions. Once
            you've selected your preferences, click "Get Quiz" to start the
            quiz.
          </p>
        </div>
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
    </>
  );
};

export default HomePage;
