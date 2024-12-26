import Confetti from 'react-confetti';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
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
  { language: 'Hebrew', translation: 'מריה' },
  { language: 'Bengali', translation: 'মারিয়া' },
  { language: 'Persian', translation: 'ماریا' },
  { language: 'Thai', translation: 'มาเรีย' },
  { language: 'Vietnamese', translation: 'Maria' },
];

const App = () => {
  const [index, setIndex] = useState(0);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextTranslation = () => {
    setIndex((prevIndex) => (prevIndex + 1) % translations.length);
  };

  const currentTranslation = translations[index];

  const motionProps = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 },
    className: "translation"
  };

  return (
    <div className="app-container">
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={false}
        numberOfPieces={200}
      />
      <div className="content-wrapper">
        <h1>Happy Name Day, Maria!</h1>
        <p>
          In <strong>{currentTranslation.language}</strong>, your name is:
          <motion.span {...motionProps}>
            {currentTranslation.translation}
          </motion.span>
        </p>
        <button onClick={nextTranslation}>Show Next</button>
      </div>
    </div>
  );
};

export default App;