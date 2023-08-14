import React from 'react';
import './LoadingBar.css';

const LoadingBar = ({ current, final }) => {
  const maxWidth = 56; // in pixels
  const widthPercentage = (current / final) * 100;
  const widthInPixels = (widthPercentage * maxWidth) / 100;

  return (
    <div className="loading-bar-container">
      <div className="loading-bar-fill" style={{ width: `${widthInPixels}px` }}></div>
    </div>
  );
};

export default LoadingBar;