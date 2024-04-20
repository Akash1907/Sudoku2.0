import React, { useState } from "react";
import "./SignupContainer.css";
import BtnSudoku from "btn-sudoku";
import SignupPart from "./SignupPart";
import AvatarPart from "./AvatarPart";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";


const SignupContainer = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);

  const [nextBtnCheck, setNextBtnCheck] = useState(false);
  const [submitBtnCheck, setSubmitBtnCheck] = useState(false);

  const object1 = {
    username: username,
  };

  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleClose3 = () => {
    setOpen3(false);
  };
  const handleClose4 = () => {
    setOpen4(false);
  };
  const handleClose5 = () => {
    setOpen5(false);
  };
  const handleClose6 = () => {
    setOpen6(false);
  };

  const collectData = async () => {
    if (username === "") {
      setOpen3(true);
    } else if (name === "") {
      setOpen4(true);
    } else if (password === "") {
      setOpen2(true);
    } else if (password !== cnfPassword) {
      setOpen1(true);
    } else if (username.includes(" ")) {
      setOpen5(true);
    } else {
      axios
        // .post("http://localhost:8000/signupAuth", object1)
        .post('https://sudoku2-0-akash1907.vercel.app/signupAuth', object1)
        .then((response) => {
          console.log(response.data);
          localStorage.setItem("name", name);
          localStorage.setItem("username", username);
          localStorage.setItem("password", password);
          setNextBtnCheck(true);
        })
        .catch((error) => {
          console.error(error);
          setOpen6(true);
        });
    }
  };

  const [userAvatarUrl, setUserAvatarUrl] = useState("");
  const [score, setScore] = useState([]);
  const [open, setOpen] = useState(false);

  const object2 = {
    username: username,
    name: name,
    password: password,
    avatarUrl: userAvatarUrl,
    score: score,
  };

  const { setUser } = useUser();

  const handleOptionClick = (value) => {
    setUserAvatarUrl(value);
  };

  const collectUserData = async () => {
    if (userAvatarUrl === "") {
      handleClose();
    } else {
      axios
        .post("https://sudoku2-0-akash1907.vercel.app/register", object2)
        .then((response) => {
          console.log(response);
          setUser({
            username: localStorage.getItem("username"),
            name: localStorage.getItem("name"),
            avatarUrl: userAvatarUrl,
          });
          localStorage.setItem("avatarUrl", userAvatarUrl);
          setSubmitBtnCheck(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const navigate = useNavigate();
  const NavigateToNextPage = () => {
    navigate(`/difficulty`);
  };

  const listOfComponents = [
  {
    index: 0,
    page: 
      <SignupPart
        name={name}
        username={username}
        setName={setName}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        cnfPassword={cnfPassword}
        setCnfPassword={setCnfPassword}
        open1={open1}
        open2={open2}
        open3={open3}
        open4={open4}
        open5={open5}
        open6={open6}
        handleClose1={handleClose1}
        handleClose2={handleClose2}
        handleClose3={handleClose3}
        handleClose4={handleClose4}
        handleClose5={handleClose5}
        handleClose6={handleClose6}
      />
    ,
    method: collectData,
  },
  {
    index: 1,
    page: 
      <AvatarPart
        userAvatarUrl={userAvatarUrl}
        name={name}
        username={username}
        handleOptionClick={handleOptionClick}
        open={open}
        handleClose={handleClose}
      />
    ,
    method: collectUserData,
  },
  {
    index: 2,
    submitBtnCheck: submitBtnCheck,
    nextBtnCheck: nextBtnCheck,
    NavigateToNextPage : NavigateToNextPage
  },
];

  return (
    <>
      <div className="signup">
        <div className="signup2">
          <div className="signUpHead">
            <p className="signUpHead2">
              <span className="headCutout">Sign</span> Up
            </p>
          </div>
          <div className="btnContainer">
            <BtnSudoku listOfComponents = {listOfComponents}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupContainer;
