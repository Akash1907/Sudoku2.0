import React from "react";
import { Link } from "react-router-dom";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

function ReplayBtn() {
  return (
    <div className="iconBtn2">
      <Link to="/difficulty">
        <PlayArrowRoundedIcon
          sx={{
            height: "7vh",
            width: "7vh",
            border: "4px solid white",
            borderRadius: "15px",
            cursor: "pointer",
            color: "white",
          }}
        />
      </Link>
      <div className="kk">
        <span className="tooltiptext">Re-Play</span>
      </div>
    </div>
  );
}

export default ReplayBtn;
