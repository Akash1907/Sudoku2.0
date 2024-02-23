import React, { useState } from "react";
import "./StartingPage.css";
import LoginContainer from "../Components/LoginContainer";
import SignupContainer from "../Components/SignupContainer";

function StartingPage() {
  const [container, setContainer] = useState(true);

  const handleContainer = () => {
    setContainer(!container);
  };
  localStorage.clear();

  return (
    <>
      {container ? <LoginContainer /> : <SignupContainer />}

      <div className="signUp">
        <div className="signUp2">
          {container ? (
            <div className="div">
              <p className="signUpPara">Don't have an account yet?</p>
              <button className="navigateToSignup" onClick={handleContainer}>
                SignUp
              </button>
            </div>
          ) : (
            <div className="div">
              <p className="signUpPara">Already have an account yet?</p>
              <button className="navigateToSignup" onClick={handleContainer}>
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default StartingPage;
