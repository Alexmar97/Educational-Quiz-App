import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RootLayout from "./Navigation/RootLayout";
import HomePage from "./HomePage";
import Quiz from "./Quiz/Quiz";
import { QuizProvider } from "./Quiz/QuizContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "quiz",
        element: (
          <QuizProvider>
            <Quiz />
          </QuizProvider>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
