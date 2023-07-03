import React from 'react'
import './Loader.css';
import  CircularProgress  from "@mui/material/CircularProgress";

function Loader() {
  return (
    <div className='loader-wrapper'>
        <CircularProgress sx={{color: "black"}}/>
    </div>
  )
}

export default Loader