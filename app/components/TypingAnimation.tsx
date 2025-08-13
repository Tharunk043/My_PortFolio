'use client';

import { useState, useEffect } from 'react';

export default function TypingAnimation() {
  const phrases = [
    'Building amazing web applications',
    'Creating seamless user experiences',
    'Developing scalable solutions',
    'Crafting clean, efficient code',
    'Solving complex problems'
  ];

  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typeSpeed, setTypeSpeed] = useState(100);

  useEffect(() => {
    const handleType = () => {
      const current = phrases[currentPhrase];
      
      if (isDeleting) {
        setDisplayText(current.substring(0, displayText.length - 1));
        setTypeSpeed(50);
      } else {
        setDisplayText(current.substring(0, displayText.length + 1));
        setTypeSpeed(100);
      }

      if (!isDeleting && displayText === current) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setCurrentPhrase((prev) => (prev + 1) % phrases.length);
      }
    };

    const timer = setTimeout(handleType, typeSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentPhrase, typeSpeed, phrases]);

  return (
    <span>
      {displayText}
      <span className="animate-pulse text-blue-400">|</span>
    </span>
  );
}