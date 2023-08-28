import React, { useState } from "react";
import LoginContainer from "../Components/LoginContainer";
import SignupContainer from "../Components/SignupContainer";
import AvatarContainer from "../Components/AvatarContainer";


function LoginPage() {
  const [signUpContainerPopup, setSignUpContainerPopup] = useState(false);
  const [avatarContainerPopup, setAvatarContainerPopup] = useState(false);

  function signUpClick() {
    setSignUpContainerPopup(true);
  }
  function loginClick() {
    setAvatarContainerPopup(false);
    setSignUpContainerPopup(false);
  }
  function nextClick() {
    setAvatarContainerPopup(true);
    setSignUpContainerPopup(false);
  }

  return (
    <>
      {/* <Header checkPage={checkPage} /> */}
      {!signUpContainerPopup && !avatarContainerPopup ? (
        <LoginContainer click={signUpClick} />
      ) : (
        ""
      )}
      {signUpContainerPopup && !avatarContainerPopup ? (
        <SignupContainer
          loginClick={loginClick} 
          nextClick={nextClick}
        />
      ) : (
        ""
      )}
      {!signUpContainerPopup && avatarContainerPopup ? (
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
