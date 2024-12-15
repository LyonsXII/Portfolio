import { createContext, useState } from 'react';

const SettingsContext = createContext();

function SettingsProvider({ children }) {
  const [autoplay, setAutoplay] = useState(false);
  const [autoNextQuestion, setAutoNextQuestion] = useState(false);

  function toggleAutoplay() {
    setAutoplay(prev => !prev);
  }

  function toggleAutoNextQuestion() {
    setAutoNextQuestion(prev => !prev);
  }

  return (
    <SettingsContext.Provider value={{ autoplay, toggleAutoplay, autoNextQuestion, toggleAutoNextQuestion }}>
      {children}
    </SettingsContext.Provider>
  );

};

export{ SettingsProvider, SettingsContext }