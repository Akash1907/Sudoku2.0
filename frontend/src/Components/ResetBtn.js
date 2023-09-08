import React from "react";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";

function ResetBtn(props) {
  return (
    <div className="iconBtn2">
      <RestartAltRoundedIcon
        onClick={props.resetSudoku}
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
        <span className="tooltiptext">Reset</span>
      </div>
    </div>
  );
}

export default ResetBtn;
