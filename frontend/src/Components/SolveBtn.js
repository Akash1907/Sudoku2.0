import React from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

function SolveBtn(props) {
  return (
    <div className="iconBtn2">
      <CheckCircleRoundedIcon
        onClick={props.solveSudoku}
        sx={{
          height: "7vh",
          width: "7vh",
          border: "4px solid white",
          borderRadius: "15px",
          cursor: "pointer",
          color: "white",
        }}
      />
      <div className="kk">
        <span className="tooltiptext">Solve</span>
      </div>
    </div>
  );
}

export default SolveBtn;
