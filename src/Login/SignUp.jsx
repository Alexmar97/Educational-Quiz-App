import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import styles from "./SignUp.module.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //Signed in
        const user = userCredential.user;
        console.log("User: " + user);
        navigate("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <>
      <main>
        <section>
          <div className={styles.container}>
            <h1>Create an Account</h1>
            <form onSubmit={onSubmit}>
              <div>
                <label htmlFor="email-address">
                  <b>Email address:</b>
                </label>
                <input
                  type="email"
                  id="email-address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                />
              </div>

              <div>
                <label htmlFor="password">
                  <b>Password:</b>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </div>

              <button type="submit">Sign up</button>
            </form>

            <p className={styles.bottomText}>
              Already have an account? <NavLink to="/login">Sign in</NavLink>
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default SignUp;
