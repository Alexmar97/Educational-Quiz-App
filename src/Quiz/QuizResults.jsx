import { useContext } from "react";
import { QuizContext } from "./QuizContext";
import { decodeHtmlEntities } from "../Util/utils";
import styles from "./QuizResults.module.css";

const QuizResults = () => {
  const { userQuizItem } = useContext(QuizContext);

  const getButtonClassName = (item, opt) => {
    // setSelectedOption(option);

    if (opt === item.correct_answer) {
      return styles.correct; // Highlight the correct answer
    }
    if (item.userChose === opt) {
      return styles.selected; // Highlight the selected option before checking
    }
    if (
      item.correct_answer &&
      item.userChose === opt &&
      opt !== item.correct_answer
    ) {
      return styles.incorrect; // Highlight incorrect selection after checking
    }
    return ""; // Default styling
  };

  return (
    <div>
      <h1>TEST FROM QUIZ RESULTS</h1>
      {userQuizItem.quizArray.map((item, index) => (
        <div key={index}>
          <h4>Question: {decodeHtmlEntities(item.question)}</h4>

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
          </div>

          {/* <ul>
            {item.options.map((opt, idx) => (
              <li key={idx}>
                {decodeHtmlEntities(opt)} -
                {opt === item.userChose ? " (Your Choice)" : ""}
                {opt === item.correct_answer ? " (Correct)" : ""}
              </li>
            ))}
          </ul> */}
        </div>
      ))}
    </div>
  );
};

export default QuizResults;
