import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import './AvatarPart.css';
import axios from "axios";


function AvatarPart(props) {

  const [avatarData, setAvatarData] = useState([]);

  const getAllAvatars = () => {
    axios
      .get("https://sudoku2-0-akash1907.vercel.app/getAvatars")
      // .get('http//localhost:8000/getAvatars')
      .then((response) => {
        setAvatarData(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getAllAvatars();
  }, []);


  return (
    <div className = 'AvatarContainer'>
          <div className="userArea">
            <div className="imgArea">
              {props.userAvatarUrl === "" ? (
                <img className="userImg" src= 'https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg' alt = 'no avatar found'/>
              ) : (
                <img className="userImg" src={props.userAvatarUrl} alt = 'no avatar found'/>
              )}
            </div>
            <div className="userDetail">
              <p className="name">{props.name ? props.name.charAt(0).toUpperCase() +  props.name.slice(1) : ""}</p>
              <p className="username">{props.username}</p>
            </div>
          </div>
          <div className="avatarPart">
            <div className="avatarP">
              <p className="avatarP2">Please select an Avatar</p>
            </div>
            <div className="avatarcon">
              <div className="listOfImg"> 
                    {avatarData?.map((i) => {
                      return (
                        <img
                          className="avatarImg"
                          id={props.userAvatarUrl === i.url ? "selected" : ""}
                          onClick={() => props.handleOptionClick(i.url)}
                          src={i.url} alt = 'no avatar found'
                        />
                      );
                    })}
              </div>
            </div>
            <Dialog
            open={props.open}
            keepMounted
            onClose={props.handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Please select an Avatar"}</DialogTitle>
            <DialogActions>
              <Button onClick={props.handleClose}>OKAY</Button>
            </DialogActions>
            </Dialog>
          </div>
        </div>
  )
}

export default AvatarPart;