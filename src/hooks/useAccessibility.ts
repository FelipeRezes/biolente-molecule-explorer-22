import { useState, useEffect } from 'react';

export const useAccessibility = () => {
  const [fontSize, setFontSize] = useState(100);
  const [isHighContrast, setIsHighContrast] = useState(false);

  // Load saved preferences on mount
  useEffect(() => {
    const savedFontSize = localStorage.getItem('biolente-font-size');
    const savedHighContrast = localStorage.getItem('biolente-high-contrast');
    
    if (savedFontSize) {
      const size = parseInt(savedFontSize);
      setFontSize(size);
      document.documentElement.style.fontSize = `${size}%`;
    }
    
    if (savedHighContrast === 'true') {
      setIsHighContrast(true);
      document.documentElement.classList.add('high-contrast');
    }
  }, []);

  const adjustFontSize = (increase: boolean) => {
    const newSize = increase ? Math.min(fontSize + 10, 150) : Math.max(fontSize - 10, 80);
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
    localStorage.setItem('biolente-font-size', newSize.toString());
  };

  const toggleHighContrast = () => {
    const newContrast = !isHighContrast;
    setIsHighContrast(newContrast);
    
    if (newContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    
    localStorage.setItem('biolente-high-contrast', newContrast.toString());
  };

  return {
    fontSize,
    isHighContrast,
    adjustFontSize,
    toggleHighContrast
  };
};