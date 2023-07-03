import React from "react";
import { useState, useEffect } from "react";
import "./SignupContainer.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Loader from "../Components/Loader";


function SignupContainer(props) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [score, setScore] = useState([]);
  const [cnfPassword, setCnfPassword] = useState("");
  const [userAvatarUrl, setUserAvatarUrl] = useState("");
  const [avatarData, setAvatarData] = useState([]);
  const [loading, setLoading] = useState(true);

  // const [userData, setUserData] = useState();

  const handleOptionClick = (value) => {
    setUserAvatarUrl(value);
  };

  const obj = {
    username: username,
    name: name,
    password: password,
    avatarUrl: userAvatarUrl,
    score: score
  };

  const collectData = async () => {
    if(password !== cnfPassword)
    {
      alert("Password doesn't Match");
    }
    else if(userAvatarUrl === "")
    {
      alert('Plase select a Avatar');
    }
    else if(username === '')
    {
      alert("Please enter the Username");
    }
    else if(name === "")
    {
      alert("Please enter your name");
    }
    else if(username.includes(' '))
    {
      alert("Please enter the correct username");
    }
    else(axios
      .post("http://localhost:8000/register", obj)
      .then((response) => {
        // setUserData(response.data);
        console.log(response);
        localStorage.setItem("username",obj.username);
      }).then(() => NavigateToDifficulty())
      .catch((error) => {
        console.error(error);
        alert("Username already exists");
      })  
    )
  };

  const getAvatars = () => {
    axios
      .get("http://localhost:8000/getAvatars")
      .then((response) => {
        setAvatarData(response.data);
        setLoading(false);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getAvatars();
  }, []);

  const navigate = useNavigate();
  const NavigateToDifficulty = () => {
    navigate("/difficulty");
  };

  return props.trigger3 ? (
    <>
      <div className="signUpContainer">
        <div className="signUpContainer2">
          <div className="signUpHead">
            <p className="signUpHead2">Sign Up</p>
          </div>
          <div className = 'form'>
            <div className="nameInput">
              <div className="username">
                <p className="inputTitles">Username</p>
                <input
                  className="shortInput"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="fullname">
                <p className="inputTitles">Name</p>
                <input
                  className="shortInput"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="passwrd">
              <div className="passwrd2">
                <div className="pass">
                  <p className="inputTitles">Password</p>
                  <input
                    className="longInput"
                    placeholder="Password"
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="cnfrmPassword">
                  <p className="inputTitles">Confirm Password</p>
                  <input
                    className="longInput"
                    placeholder="Confirm Password"
                    type="password"
                    onChange={(e) => setCnfPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="avatarContainer">
              <div className="avatarPara">
                <p className="avatarPara2">Please Select an Avatar</p>
              </div>
              <div className="avatarImages">
                {loading ? (<Loader/>) : (
                  <>
                    <div className="listOfImg">
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
                </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="signupBtn">
            <button className="signupBtn2" onClick={collectData}>
              SignUP
            </button>
          </div>
        </div>
        <div className="alreadyAcc">
            <p className="alreadyAcc2">
              Already have an account?{" "}
              <button
                className="loginBtn"
                onClick={() => props.setTrigger3(false)}
              >
                Log In
              </button>
            </p>
          </div>
      </div>
    </>
  ) : (
    ""
  );
}
export default SignupContainer;
