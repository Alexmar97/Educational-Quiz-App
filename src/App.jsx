import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RootLayout from "./Navigation/RootLayout";
import HomePage from "./HomePage";
import Quiz from "./Quiz/Quiz";
import Login from "./Login/Login";
import SignUp from "./Login/SignUp";
import { QuizProvider } from "./Quiz/QuizContext.jsx";
import { action as logoutAction } from "./Login/Logout.jsx";
import ErrorPage from "./Error.jsx";
import Leaderboard from "./LeaderBoards/Leaderboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <QuizProvider>
            <HomePage />
          </QuizProvider>
        ),
      },
      {
        path: "quiz",
        element: (
          <QuizProvider>
            <Quiz />
          </QuizProvider>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      {
        path: "logout",
        action: logoutAction,
      },
      { path: "leaderboard", element: <Leaderboard /> },
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
