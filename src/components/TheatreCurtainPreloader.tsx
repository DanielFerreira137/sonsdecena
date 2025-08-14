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
        setTimeout(onComplete, 1500); // Wait for enhanced fade out animation
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="vinyl-preloader-container">
      {/* Background with gradient */}
      <div className="vinyl-background"></div>
      
      {/* Vinyl record with logo */}
      <div className="vinyl-record">
        <div className="vinyl-disc">
          {/* Logo in the center */}
          <div className="vinyl-logo">
            <h1>SONS DE CENA</h1>
          </div>
          
          {/* Vinyl grooves */}
          <div className="vinyl-grooves">
            <div className="groove groove-1"></div>
            <div className="groove groove-2"></div>
            <div className="groove groove-3"></div>
            <div className="groove groove-4"></div>
            <div className="groove groove-5"></div>
          </div>
        </div>
        
        {/* Vinyl arm */}
        <div className="vinyl-arm">
          <div className="arm-base"></div>
          <div className="arm-body"></div>
          <div className="arm-head"></div>
          <div className="arm-needle"></div>
        </div>
      </div>
      

    </div>
  );
};

export default TheatreCurtainPreloader; 