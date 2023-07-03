import React, { useState } from "react";
import LoginContainer from "../Components/LoginContainer";
import Header from "../Components/Header";
import SignupContainer from "../Components/SignupContainer";

function LoginPage() {
  const [signUpPopup, setSignUpPopup] = useState(false);
  var checkPage = false;
  function signUpClick() {
    setSignUpPopup(true);
  }
  return (
    <>
      <Header checkPage = {checkPage}/>
      {!signUpPopup ? <LoginContainer click={signUpClick} /> : ""}
      {signUpPopup ? (
        <SignupContainer trigger3={signUpPopup} setTrigger3={setSignUpPopup} />
      ) : (
        ""
      )}
    </>
  );
}

export default LoginPage;
