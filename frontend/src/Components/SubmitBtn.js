import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SubmitBtn(props) {
  return (
    <div className="submitSection">
      <Button
        variant="outlined"
        onClick={props.handleSubmit}
        sx={{
          fontFamily: "Nunito",
          backgroundColor: "#6CAAD9",
          color: "white",
          height: "6vh",
          width: "63vh",
          fontSize: "2rem",
          borderRadius: "10px",
          "&:hover": {
            background: "white",
            color: "#6CAAD9",
            border: "4px solid #6CAAD9",
            fontWeight: "400",
          },
        }}
      >
        SUBMIT
      </Button>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {"Your SUDOKU is either not completed or wrong. Keep Trying!"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={props.handleClose}>OKAY</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SubmitBtn;
