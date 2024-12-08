import { useContext } from "react";
import { QuizContext } from "./QuizContext";
import { decodeHtmlEntities } from "../Util/utils";
import styles from "./QuizResults.module.css";
import Card from "../UI/Card";
import { getAuth } from "firebase/auth";

const QuizResults = () => {
  const { userQuizItem } = useContext(QuizContext);

  const auth = getAuth();
  const user = auth.currentUser;

  const getButtonClassName = (item) => {
    // setSelectedOption(option);

    if (item.correct_answer === item.userChose) {
      return styles.correct; // Highlight the correct answer
    }

    if (item.correct_answer !== item.userChose) {
      return styles.incorrect; // Highlight incorrect selection after checking
    }

    // if (item.userChose === item.correct_answer) {
    //   return styles.selected; // Highlight the selected option before checking
    // }
    // if (
    //   item.correct_answer &&
    //   item.userChose === opt &&
    //   opt !== item.correct_answer
    // ) {
    //   return styles.incorrect; // Highlight incorrect selection after checking
    // }
    return ""; // Default styling
  };

  return (
    <>
      {" "}
      <div>
        <h1>TEST FROM QUIZ RESULTS</h1>
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
      <p>{user.email}</p>
      <p>{user.uid}</p>
      <p>TEST 2</p>
      {/* XATQRIGfekRbkdbfgayXp022TDl2 */}
    </>
  );
};

export default QuizResults;
