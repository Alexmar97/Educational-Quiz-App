const GetQuizForm = (props) => {
  const submitFormHandler = (event) => {
    event.preventDefault();

    const amount = event.target.elements["amount"].value || 10;
    const category = event.target.elements["category"].value || 9;
    const difficulty = event.target.elements["difficulty"].value || "easy";

    // console.log(amount);
    // console.log(category);
    // console.log(difficulty);

    props.onFetchQuiz(amount, category, difficulty);
  };

  return (
    <>
      <form onSubmit={submitFormHandler}>
        <label>Category</label>
        <select name="category">
          <option value={"9"}>General Knowledge</option>
          <option value={"11"}>Film</option>
          <option value={"12"}>Music</option>
          <option value={"14"}>Television</option>
          <option value={"19"}>Mathematics</option>
          <option value={"17"}>Science & Nature</option>
          <option value={"22"}>Geography</option>
          <option value={"2"}>Sports</option>
        </select>

        <label>Difficulty</label>
        <select name="difficulty">
          <option value="easy">Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <label>Number of Questions</label>
        <input name="amount" type="number" min="1" max="50"></input>
        <button type="submit">Get Quiz</button>
      </form>
      ;
    </>
  );
};

export default GetQuizForm;
