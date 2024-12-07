import { useContext } from "react";
import { QuizContext } from "./QuizContext";
import { decodeHtmlEntities } from "../Util/utils";

const QuizResults = () => {
  const { userQuizItem } = useContext(QuizContext);
  return (
    <div>
      <h1>TEST FROM QUIZ RESULTS</h1>
      {userQuizItem.quizArray.map((item, index) => (
        <div key={index}>
          <h4>Question: {decodeHtmlEntities(item.question)}</h4>
          <ul>
            {item.options.map((opt, idx) => (
              <li key={idx}>
                {decodeHtmlEntities(opt)} -
                {opt === item.userChose ? " (Your Choice)" : ""}
                {opt === item.correct_answer ? " (Correct)" : ""}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default QuizResults;
