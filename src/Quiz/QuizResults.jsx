import { useContext, useEffect } from "react";
import { QuizContext } from "./QuizContext";
import { decodeHtmlEntities } from "../Util/utils";
import styles from "./QuizResults.module.css";
import Card from "../UI/Card";
import { getDatabase, ref, get, set, update } from "firebase/database";
import { getAuth } from "firebase/auth";

const QuizResults = () => {
  const { userQuizItem, startedLeaderBoardQuiz, completedLeaderBoardQuiz } =
    useContext(QuizContext);

  const auth = getAuth();
  const user = auth.currentUser;

  const submitResultToLeaderBoard = async (score) => {
    //If this is not a leaderboard quiz, then return (not needed to submit to leaderboard)
    if (!startedLeaderBoardQuiz || !completedLeaderBoardQuiz) {
      return;
    }
    //If started but not completed the quiz:
    else if (startedLeaderBoardQuiz && !completedLeaderBoardQuiz) {
      console.log("Leaderboard quiz started and completed");
    }

    //if started and completed the leaderboard quiz:
    else {
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
    }

    // const response = await fetch(
    //   "https://eduquiz-89c97-default-rtdb.firebaseio.com/leaderboard",
    //   { method: "POST", body: JSON.stringify(userQuizItem) }
    // );
  };

  // Should be
  useEffect(() => {
    submitResultToLeaderBoard(userQuizItem.score);
  }, [userQuizItem.score]);

  const getButtonClassName = (item) => {
    // setSelectedOption(option);

    if (item.correct_answer === item.userChose) {
      return styles.correct; // Highlight the correct answer
    }

    if (item.correct_answer !== item.userChose) {
      return styles.incorrect; // Highlight incorrect selection after checking
    }

    return ""; // Default styling
  };

  return (
    <>
      <div>
        {userQuizItem.quizArray.map((item, index) => (
          <div key={index}>
            <Card>
              <h4>Question: {decodeHtmlEntities(item.question)}</h4>
              {/* 
              <div>
                {item.options.map((opt, idx) => (
                  <button
                    value={opt}
                    className={getButtonClassName(item, opt)}
                    disabled
                  >
                    {decodeHtmlEntities(opt)}
                  </button>
                ))}
              </div> */}
              <div>
                {item.correct_answer === item.userChose && (
                  <>
                    <p>You got it!</p>
                    <button
                      value={item.correct_answer}
                      className={getButtonClassName(item)}
                      disabled
                    >
                      {decodeHtmlEntities(item.correct_answer)}
                    </button>
                  </>
                )}

                {item.correct_answer !== item.userChose && (
                  <>
                    <p>Correct Answer: </p>
                    <button
                      value={item.correct_answer}
                      className={getButtonClassName(item)}
                      disabled
                    >
                      {decodeHtmlEntities(item.correct_answer)}
                    </button>

                    <p>Your Answer: </p>
                    <button
                      value={item.userChose}
                      className={getButtonClassName(item)}
                      disabled
                    >
                      {decodeHtmlEntities(item.userChose)}
                    </button>
                  </>
                )}
              </div>
            </Card>
          </div>
        ))}
      </div>
      <h2>
        You scored {userQuizItem.score} out of {userQuizItem.quizArray.length}
      </h2>
      {/* <p>{user.email}</p>
      <p>{user.uid}</p>
      <p>TEST 2</p> */}
      {/* XATQRIGfekRbkdbfgayXp022TDl2 */}
    </>
  );
};

export default QuizResults;
