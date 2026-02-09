import React from 'react';
import '../styles/Loading.css';

function Loading({ message = 'Cargando...', fullScreen = false }) {
  return (
    <div className={`loading-container ${fullScreen ? 'fullscreen' : ''}`}>
      <div className="loading-spinner"></div>
      <p className="loading-message">{message}</p>
    </div>
  );
}

export default Loading;
