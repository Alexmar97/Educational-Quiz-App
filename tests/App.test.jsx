import { render, screen, expect } from "@testing-library/react";
import App from "../src/App";

test("renders the heading", () => {
  render(<App />);
  const heading = screen.getByText(/welcome to EduQuiz/i);
  expect(heading).toBeInTheDocument();
});
