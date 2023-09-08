import React from "react";
import TipsAndUpdatesRoundedIcon from "@mui/icons-material/TipsAndUpdatesRounded";

function HintBtn(props) {
  return (
    <div className="iconBtn2">
      <TipsAndUpdatesRoundedIcon
        onClick={props.clickHint}
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
        <span className="tooltiptext">Hint</span>
      </div>
    </div>
  );
}

export default HintBtn;
