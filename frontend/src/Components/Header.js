import React, { useState } from "react";
import "./Header.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle"

function Header(props) {
  const [openAbout, setOpenAbout] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);

  const handleClickOpenAbout = () => {
    setOpenAbout(true);
  };
  const handleCloseAbout = () => {
    setOpenAbout(false);
  };

  const handleClickOpenHelp = () => {
    setOpenHelp(true);
  };
  const handleCloseHelp = () => {
    setOpenHelp(false);
  };



  return (
    <>
      <div className="headerContainer">
        <div className="headerContainer2">
         {props.checkPage ? <div className = "userInfo">
            <div className = 'userAvatar'>
              <img src = {props.avatarUrl} className = 'headerAvatar' alt = 'no avatar found'/>
            </div>
            <div className = 'username'>
              <p className = 'username2'>{props.name ? props.name.charAt(0).toUpperCase() + props.name.slice(1) : ""}</p>
            </div>
          </div> : ""}
          {props.checkPage ? <div className="logoImg" >
            <img className="logoImg2" src="logo1.png" />
          </div> : <div className="logoImg" style={{marginLeft: "91vh"}}>
            <img className="logoImg2" src="logo1.png" />
          </div>}
          {!props.checkPage ? <div className="buttonContainer" style={{marginLeft : "70vh"}}>
            <div className="aboutContainer">
              <div className="aboutButton">
                <Button variant="outlined" className = 'aboutBtn' onClick={handleClickOpenAbout} sx={{ backgroundColor : '#6CAAD9', color : 'white', fontSize : '3vh', height : '3rem', width : '8rem', borderRadius : '10px', textTransform: 'none', ':hover' : {backgroundColor : "white", color : "#6CAAD9", border : "2px solid #6CAAD9", fontWeight : '500'}}} >
                  About
                </Button>
              </div>
              <div>
                <Dialog
                  open={openAbout}
                  onClose={handleCloseAbout}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title" sx = {{ fontFamily: "Nunito"}}>{"ABOUT"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Sudoku (/suːˈdoʊkuː, -ˈdɒk-, sə-/; Japanese: 数独,
                      romanized: sūdoku, lit. 'digit-single'; originally called
                      Number Place) is a logic-based,combinatorial
                      number-placement puzzle. The sole purpose of this game is
                      having fun with mental exercise. Soduko is one of the
                      famous mind games. We are solving problems like boredom,
                      mental fatigue through this game.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseAbout}>Close</Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
            <div className="helpContainer">
              <div className="helpButton">
                <Button variant="outlined" onClick={handleClickOpenHelp} sx={{ backgroundColor : 'white', color : '#6CAAD9', border : "2px solid #6CAAD9",  fontSize : '3vh', fontWeight : "500", height : '3rem', width : '8rem', borderRadius : '10px'  , textTransform: 'none', ':hover' : {backgroundColor : "#6CAAD9", color : "white"}}}>
                  Help
                </Button>
              </div>
              <div>
                <Dialog
                  open={openHelp}
                  onClose={handleCloseHelp}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title" sx = {{ fontFamily: "Nunito"}}>{"HELP"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      <div className="helpDesc">
                        <div className="helpHead">
                          <p className="helpHead2">Goal</p>
                        </div>
                        <div className="helpPara">
                          <p className="helpPara2">
                            The goal is to fill all the empty cells with the
                            correct numbers.
                          </p>
                        </div>
                        <div className="helpHead">
                          <p className="helpHead2">Rules</p>
                        </div>
                        <div className="helpPara">
                          <p className="helpPara2">
                            Cells each take a number between 1 and 9. A number
                            may appear only once in a row, column and 3x3 box.
                          </p>
                        </div>
                        <div className="helpHead">
                          <p className="helpHead2">How to Play</p>
                        </div>
                        <div className="helpPara">
                          <p className="helpPara2">
                            Click a cell to select it. Then enter the number
                            from your device and backspace to remove it.
                          </p>
                        </div>
                      </div>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseHelp}>Close</Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
          </div> : <div className="buttonContainer">
            <div className="aboutContainer">
              <div className="aboutButton">
                <Button variant="outlined" className = 'aboutBtn' onClick={handleClickOpenAbout} sx={{ backgroundColor : '#6CAAD9', color : 'white', fontSize : '3vh', height : '3rem', width : '8rem', borderRadius : '10px', textTransform: 'none', ':hover' : {backgroundColor : "white", color : "#6CAAD9", border : "2px solid #6CAAD9", fontWeight : '500'}}}>
                  About
                </Button>
              </div>
              <div>
                <Dialog
                  open={openAbout}
                  onClose={handleCloseAbout}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title" sx = {{ fontFamily: "Bebas Neue"}}>{"ABOUT"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Sudoku (/suːˈdoʊkuː, -ˈdɒk-, sə-/; Japanese: 数独,
                      romanized: sūdoku, lit. 'digit-single'; originally called
                      Number Place) is a logic-based,combinatorial
                      number-placement puzzle. The sole purpose of this game is
                      having fun with mental exercise. Soduko is one of the
                      famous mind games. We are solving problems like boredom,
                      mental fatigue through this game.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseAbout}>Close</Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
            <div className="helpContainer">
              <div className="helpButton">
                <Button variant="outlined" onClick={handleClickOpenHelp}sx={{ backgroundColor : 'white', color : '#6CAAD9', border : "2px solid #6CAAD9",  fontSize : '3vh', fontWeight : "500", height : '3rem', width : '8rem', borderRadius : '10px', textTransform: 'none', ':hover' : {backgroundColor : "#6CAAD9", color : "white"}}}>
                  Help
                </Button>
              </div>
              <div>
                <Dialog
                  open={openHelp}
                  onClose={handleCloseHelp}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title" sx = {{ fontFamily: "Bebas Neue"}}>{"HELP"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      <div className="helpDesc">
                        <div className="helpHead">
                          <p className="helpHead2">Goal</p>
                        </div>
                        <div className="helpPara">
                          <p className="helpPara2">
                            The goal is to fill all the empty cells with the
                            correct numbers.
                          </p>
                        </div>
                        <div className="helpHead">
                          <p className="helpHead2">Rules</p>
                        </div>
                        <div className="helpPara">
                          <p className="helpPara2">
                            Cells each take a number between 1 and 9. A number
                            may appear only once in a row, column and 3x3 box.
                          </p>
                        </div>
                        <div className="helpHead">
                          <p className="helpHead2">How to Play</p>
                        </div>
                        <div className="helpPara">
                          <p className="helpPara2">
                            Click a cell to select it. Then enter the number
                            from your device and backspace to remove it.
                          </p>
                        </div>
                      </div>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseHelp}>Close</Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
          </div>}
        </div>
      </div>
    </>
  );
}

export default Header;
