import React, { useState } from "react";
import LoginContainer from "../Components/LoginContainer";
import Header from "../Components/Header";
import SignupContainer from "../Components/SignupContainer";
import AvatarContainer from "../Components/AvatarContainer";

function LoginPage() {
  const [signUpPopup, setSignUpPopup] = useState(false);
  const [avatarPopup, setAvatarPopup] = useState(false);
  var checkPage = false;

  function signUpClick() {
    setSignUpPopup(true);
  }
  function loginClick() {
    setAvatarPopup(false);
    setSignUpPopup(false);
  }
  function nextClick() {
    setAvatarPopup(true);
    setSignUpPopup(false);
  }

  return (
    <>
      <Header checkPage={checkPage} />
      {!signUpPopup && !avatarPopup ? (
        <LoginContainer click={signUpClick} />
      ) : (
        ""
      )}
      {signUpPopup && !avatarPopup ? (
        <SignupContainer
          loginClick={loginClick} 
          nextClick={nextClick}
        />
      ) : (
        ""
      )}
      {!signUpPopup && avatarPopup ? (
        <AvatarContainer
          loginClick = {loginClick}
          
        />
      ) : (
        ""
      )}
    </>
  );
}

export default LoginPage;
