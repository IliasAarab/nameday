import React, { useState, useEffect, useCallback } from 'react';
import Confetti from 'react-confetti';
import ConfettiExplosion from 'react-confetti-explosion';
import { motion } from 'framer-motion';
import './App.css';

const translations = [
  { language: 'Greek', translation: 'Μαρία' },
  { language: 'English', translation: 'Maria' },
  { language: 'Spanish', translation: 'María' },
  { language: 'French', translation: 'Marie' },
  { language: 'Italian', translation: 'Maria' },
  { language: 'German', translation: 'Maria' },
  { language: 'Arabic', translation: 'ماريا' },
  { language: 'Chinese', translation: '玛丽亚' },
  { language: 'Japanese', translation: 'マリア' },
  { language: 'Russian', translation: 'Мария' },
  { language: 'Hindi', translation: 'मारिया' },
  { language: 'Korean', translation: '마리아' },
  { language: 'Bengali', translation: 'মারিয়া' },
  { language: 'Persian', translation: 'ماریا' },
  { language: 'Thai', translation: 'มาเรีย' },
  { language: 'Vietnamese', translation: 'Maria' },
];


const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isExploding, setIsExploding] = useState(false);
  const [showInitialConfetti, setShowInitialConfetti] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Hide the initial confetti after 3 seconds
    const confettiTimer = setTimeout(() => {
      setShowInitialConfetti(false);
    }, 10000);

    return () => clearTimeout(confettiTimer);
  }, []);

  const showNextTranslation = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % translations.length);
    setIsExploding(true);
    setTimeout(() => setIsExploding(false), 2000);
  }, []);

  const currentTranslation = translations[currentIndex];

  const motionProps = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 },
    className: 'translation',
  };

  return (
    <div className="app-container">
      {showInitialConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      {isExploding && (
        <ConfettiExplosion
          width={windowSize.width}
          height={windowSize.height}
          particleCount={200}
          colors={['#FF69B4', '#8A2BE2', '#7CFC00', '#FFFF00', '#FFA500']}
        />
      )}

      <div className="content-wrapper">
        <h1>Happy Name Day, Maria!</h1>
        <p>
          In <strong>{currentTranslation.language}</strong>, your name is:
          <motion.span {...motionProps}>
            {currentTranslation.translation}
          </motion.span>
        </p>
        <button onClick={showNextTranslation}>Show Next</button>
      </div>
    </div>
  );
};

export default App;
