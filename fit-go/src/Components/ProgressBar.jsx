import React from "react";
import '../styles/Components/ProgressBar.scss';

function ProgressBar(props) {
  const { bgcolor, completed } = props;
  return (
    <div className="ProgressBar">
      <div className="ProgressContainer" style={{backgroundColor: `${bgcolor}`, 
        width: `${completed}%`}}>
        <div>&nbsp;</div>
      </div>
    </div>
  );
};

export default ProgressBar;
