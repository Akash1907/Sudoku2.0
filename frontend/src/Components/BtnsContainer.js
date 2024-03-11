import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function BtnSudoku(a) {
  console.log("list of components-",a.listOfComponents);

  const indexes = Object. keys(a.listOfComponents).length - 1;
  console.log(indexes);
  const [step, setStep] = useState(0);

  const handleNext = () => {
    console.log("Next button is clicked");
    console.log(step);
    setStep(step + 1);

  const handlePrevious = () => {
    console.log("Previous button is clicked");
    console.log(step);
    setStep(step - 1);
  }

  const handleSubmit = () => {
    console.log("Submit button is clicked");
  };

  return (
    <div className="BtnsContainer">
      {/* {props.listOfComponents[step].page} */}
      {a.listOfComponents[step].page}
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
          <button
            className="btnsss"
            style={{
              backgroundColor: "#6CAAD9",
              height: "5vh",
              width: "12vh",
              cursor: "pointer",
              borderRadius: "5px",
              border: "none",
              color: "white",
              fontSize: "2.5vh",
            }}
            onClick={handleNext}
          >
            Next
          </button>
        )}
        {step > 0 && (
          <button
            className="btnsss"
            style={{
              backgroundColor: "#6CAAD9",
              height: "5vh",
              width: "12vh",
              cursor: "pointer",
              borderRadius: "5px",
              border: "none",
              color: "white",
              fontSize: "2.5vh",
            }}
            onClick={handlePrevious}
          >
            Previous
          </button>
        )}
        {step === indexes - 1 && (
          <button
            className="btnsss"
            style={{
              backgroundColor: "#6CAAD9",
              height: "5vh",
              width: "12vh",
              cursor: "pointer",
              borderRadius: "5px",
              border: "none",
              color: "white",
              fontSize: "2.5vh",
            }}
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

export default BtnSudoku;
