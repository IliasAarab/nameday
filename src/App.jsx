import React, { useState, useEffect, useCallback } from 'react';
import Confetti from 'react-confetti';
import ConfettiExplosion from 'react-confetti-explosion';
import { motion } from 'framer-motion';
import './App.css';

const translations = [
    { type: 'translation', language: 'Greek', translation: 'Μαρία' },
    { type: 'translation', language: 'English', translation: 'Maria' },
    { type: 'translation', language: 'Spanish', translation: 'María' },
    { type: 'translation', language: 'French', translation: 'Marie' },
    { type: 'translation', language: 'Arabic', translation: 'ماريا' },
    { type: 'translation', language: 'Chinese', translation: '玛丽亚' },
    { type: 'translation', language: 'Japanese', translation: 'マリア' },
    { type: 'translation', language: 'Russian', translation: 'Мария' },
    { type: 'translation', language: 'Hindi', translation: 'मारिया' },
    { type: 'translation', language: 'Korean', translation: '마리아' },
    { type: 'translation', language: 'Thai', translation: 'มาเรีย' },
    { type: 'fact', text: "Maria's brain is so powerful, it could probably calculate the trajectory of a popcorn kernel launched into space." },
    { type: 'fact', text: "Maria's sock drawer is a explosion of weird ass patterns and colors!" },
    { type: 'fact', text: "If hamsters could talk, they'd for sure choose Maria as their spokesperson..." },
    { type: 'fact', text: "Maria's squirrel impressions are so convincing, they could fool even the most discerning baby squirrel." },
    { type: 'fact', text: "Just like Cassiopeia graces the night sky, Maria brightens the lives of everyone she meets." },
    { type: 'fact', text: "Maria's kindness and helpfulness are as boundless as her imagination." },
    { type: 'fact', text: "If you offer Maria ice, prepare for some trouble... It's her only weakness!" },
    { type: 'fact', text: "Give Maria a bag of popcorn, and watch her happiness levels skyrocket." },
    { type: 'fact', text: "Maria's mind is a constant source of brilliant, sometimes crazy, but always exciting ideas." },
    { type: 'fact', text: "Maria is not just smart; she's the kind of smart that inspires others to learn and grow." },
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
                    {currentTranslation.type === 'translation' ? (
                        <React.Fragment key={currentIndex}>
                            In <strong>{currentTranslation.language}</strong>, your name is:
                            <motion.span {...motionProps}>
                                {currentTranslation.translation}
                            </motion.span>
                        </React.Fragment>
                    ) : (
                        <motion.span {...motionProps} key={currentIndex}>
                            {currentTranslation.text}
                        </motion.span>
                    )}
                </p>
                <button onClick={showNextTranslation}>Tell me more!</button>
            </div>
        </div>
    );
};

export default App;