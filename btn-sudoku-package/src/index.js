import React, { useState, useEffect } from "react";

function BtnSudoku(props) {
  const myStyle = {
    backgroundColor: "#6CAAD9",
    height: "5vh",
    width: "12vh",
    cursor: "pointer",
    borderRadius: "5px",
    border: "none",
    color: "white",
    fontSize: "2.5vh",
  };
  
  const indexes = Object.keys(props.listOfComponents).length - 1;

  const [step, setStep] = useState(0);

  const handleNext = () => {
    console.log("Next button is clicked");
    console.log(step);
    props.listOfComponents[step].method();
    if (props.listOfComponents[indexes].nextBtnCheck) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
    console.log("Previous button is clicked");
    console.log(step);
  };

  const handleSubmit = () => {
    console.log("Submit button is clicked");
    props.listOfComponents[step].method();
    if(props.listOfComponents[indexes].submitBtnCheck)
    {
      props.listOfComponents[indexes].NavigateToNextPage();
    }
  };

  return (
    <div className="BtnsContainer">
      {props.listOfComponents[step].page}
      <div
        className="BtnsContainer1"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "6vh",
        }}
      >
        {step < indexes - 1 && (
          <button className="btnsss" style={myStyle} onClick={handleNext}>
            Next
          </button>
        )}
        {step > 0 && (
          <button className="btnsss" style={myStyle} onClick={handlePrevious}>
            Previous
          </button>
        )}
        {step === indexes - 1 && (
          <button className="btnsss" style={myStyle} onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

export default BtnSudoku;
