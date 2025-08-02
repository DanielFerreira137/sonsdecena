import React, { useState, useEffect } from 'react';
import './TheatreCurtainPreloader.css';

interface TheatreCurtainPreloaderProps {
  onComplete?: () => void;
  duration?: number;
}

const TheatreCurtainPreloader: React.FC<TheatreCurtainPreloaderProps> = ({ 
  onComplete, 
  duration = 3000 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) {
        setTimeout(onComplete, 2500); // Wait for curtain animation to complete
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="theatre-curtain-container">
      {/* Left curtain */}
      <div className="curtain left-curtain">
        <div className="curtain-panel"></div>
        <div className="curtain-panel"></div>
        <div className="curtain-panel"></div>
        <div className="curtain-panel"></div>
        <div className="curtain-panel"></div>
        <div className="curtain-panel"></div>
        <div className="curtain-panel"></div>
        <div className="curtain-panel"></div>
      </div>
      
      {/* Right curtain */}
      <div className="curtain right-curtain">
        <div className="curtain-panel"></div>
        <div className="curtain-panel"></div>
        <div className="curtain-panel"></div>
        <div className="curtain-panel"></div>
        <div className="curtain-panel"></div>
        <div className="curtain-panel"></div>
        <div className="curtain-panel"></div>
        <div className="curtain-panel"></div>
      </div>
      
      {/* Center stage light */}
     
      
      {/* Loading text */}
      <div className="loading-text">
       
      </div>
    </div>
  );
};

export default TheatreCurtainPreloader; 