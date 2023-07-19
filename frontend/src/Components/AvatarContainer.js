import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./AvatarContainer.css";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function AvatarContainer(props) {
  const name = localStorage.getItem("name");
  const username = localStorage.getItem("username");
  const password = localStorage.getItem('password');
  const [avatarData, setAvatarData] = useState([]);
  const [userAvatarUrl, setUserAvatarUrl] = useState("");
  const [score, setScore] = useState([]);
  const [open, setOpen] = useState(false);


  const obj = {
    username: username,
    name: name,
    password: password,
    avatarUrl: userAvatarUrl,
    score: score,
  };

  const navigate = useNavigate();
  const NavigateToDifficulty = () => {
    navigate("/difficulty");
  };

  const handleOptionClick = (value) => {
    setUserAvatarUrl(value);
  };

  const getAvatars = () => {
    axios
      .get("https://sudoku2-0-akash1907.vercel.app/getAvatars")
      .then((response) => {
        setAvatarData(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getAvatars();
  }, []);

  const collectData = async () => {
    if(userAvatarUrl === '')
    {
      handleClose();
    }
    else{
      axios
        .post("https://sudoku2-0-akash1907.vercel.app/register", obj)
        .then((response) => {
          console.log(response);
          localStorage.setItem("username", obj.username);
        })
        .then(() => NavigateToDifficulty())
        .catch((error) => {
          console.error(error);
          alert("Username already exists");
        });
    }
  };
  const handleClose = () =>{
    setOpen(!open);
  }

  return (
    <div className="mainContainer">
      <div className="avatarContainer">
        <div className="avatarContainer2">
          <div className="userArea">
            <div className="imgArea">
              {userAvatarUrl === "" ? (
                <img className="userImg" src= 'https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg' />
              ) : (
                <img className="userImg" src={userAvatarUrl} />
              )}
            </div>
            <div className="userDetail">
              <p className="name">{name ? name.charAt(0).toUpperCase() +  name.slice(1) : ""}</p>
              <p className="username">{username}</p>
            </div>
          </div>
          <div className="avatarPart">
            <div className="avatarP">
              <p className="avatarP2">Please select an Avatar</p>
            </div>
            <div className="avatarcon">
              <div className="listOfImg">
                {
                  <>
                    {avatarData?.map((i) => {
                      return (
                        <img
                          className="avatarImg"
                          id={userAvatarUrl === i.url ? "selected" : ""}
                          onClick={() => handleOptionClick(i.url)}
                          src={i.url}
                        />
                      );
                    })}
                  </>
                }
              </div>
            </div>
            <Dialog
            open={open}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Please select an Avatar"}</DialogTitle>
            <DialogActions>
              <Button onClick={handleClose}>OKAY</Button>
            </DialogActions>
          </Dialog>
          </div>
          <div className="signupBtn1">
            <button className="signupBtn2" onClick = {collectData}>Sign Up</button>
          </div>
        </div>
        <div className="already">
          <p className="alreadyP">
            Already have an account?
            <button className="loginBtn" onClick={props.loginClick}>
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AvatarContainer;
