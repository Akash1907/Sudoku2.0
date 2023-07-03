import React, { useState } from "react";
import {useNavigate, Link} from "react-router-dom";
import "./LoginContainer.css";
import axios from "axios";
import TextField from '@mui/material/TextField';

function LoginContainer(props) {
  localStorage.clear();
  const[username, setUsername] = useState('');
  const[password, setPassword] = useState('');
  const obj = {
    username : username,
    password : password
  }

  const userLogin = async () => {
    if(username === '' && password !== '')
    {
      alert('Please enter the username to login');
    }
    else if(password === '' && username !== '')
    {
      alert('Please enter the Password to login');
    }
    else if(password === '' && username === '')
    {
      alert('Please enter the username and password to login')
    }
    else{
      (axios
        .post("http://localhost:8000/auth", obj)
        .then((response) => {
          console.log(response);
          console.log("login Success");
          localStorage.setItem("username",obj.username);
        }).then(() => NavigateToDifficulty())
        .catch((error) => {
          console.error(error);
          console.log("Credentials are not correct");
          alert('Username or password is incorrect');
        })
      )
    }
  };

  const guestClick = () =>{
    localStorage.setItem("username","guest");
    NavigateToDifficulty();
  }
  const navigate = useNavigate();
  const NavigateToDifficulty = () => {
    navigate("/difficulty");
  };

  return (
    <>
      <div className="loginContainer">
        <div className="loginContainer2">
          <div className="loginHeading">
            <p className="loginHeading2">Welcome Back!</p>
          </div>
          <div className="userID">
            <TextField id="outlined-basic" label="Username" variant="outlined" value = {username} onChange={(e) => setUsername(e.target.value)} sx =  {{width : "51vh"}} />
          </div>
          <div className="password">
            <TextField id="outlined-basi" label="Password" variant="outlined" type = 'password' value = {password} onChange={(e) => setPassword(e.target.value)} sx =  {{width : "51vh"}} />
          </div>
          <div className="signinBtn">
              <button className="signinBtn2" onClick={userLogin}>Login</button>
          </div>
          <div className="guestBtn">
              <button className="guestBtn2" onClick = {guestClick}>Continue as guest</button>
          </div>
        </div>
      </div>
      <div className="signUp">
        <div className="signUp2">
          <p className="signUpPara">
            Don't have an account yet?{" "}
            <button className="signUpBtn" onClick={props.click}>
              SignUp
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginContainer;
