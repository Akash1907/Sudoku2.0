import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import "./DifficultyPage.css";
import Header from "../Components/Header";
import axios from "axios";

function DifficultyPage() {

  var username = localStorage.getItem("username");
  console.log("username:",username);
  const[userData, setUserData] = useState([]);
  const[currentUser, setCurrentUser] = useState({});
  const[difficulty, setDifficulty] = useState("");
  const  getUsers = async () => {
    await axios
      .get("http://localhost:8000/getUsers")
      .then((response) => {
        setUserData(response.data);
        console.log(response.data);
        const current = response.data.find(obj => {
         return obj.username === username;
       });
       setCurrentUser(current);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getUsers();
  },[]);

  const difficultyClick = (value) =>{
    setDifficulty(value);
    localStorage.setItem("difficulty", difficulty);
    console.log(difficulty);
  }
  var checkPage = true;
  localStorage.setItem("name",currentUser.name);
  localStorage.setItem("avatarUrl", currentUser.avatarUrl);
  return (
    <>

    <Header name = {currentUser.name} avatarUrl = {currentUser.avatarUrl} checkPage = {checkPage} />
      <div className='diffLevel'>
        <div className='diffLevel2'>
          <div className='diffHead'>
            <p className='diffHead2'>DIFFICULTY</p>
          </div>
          <div className = 'diffDesc'>
            <p className = 'diffDesc2'>How good are you at Sudoku?</p>
          </div>
          <div className='diffs'>
            <Link to = '/sudokuEasy'style={{ textDecoration: 'none' }}>
              <p className='diffs2' onClick={() => difficultyClick("Beginner")} >I'm a beginner</p>
            </Link>
            <Link to = '/sudokuMedium'style={{ textDecoration: 'none' }}>
              <p className='diffs2' onClick={() => difficultyClick("Okay")} >I'm okay</p>
            </Link>
            <Link to = '/sudokuHard'style={{ textDecoration: 'none' }}>
              <p className='diffs2' onClick={() => difficultyClick("Pro")}>I'm a pro</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default DifficultyPage