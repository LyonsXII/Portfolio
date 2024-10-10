import { createContext, useState } from 'react';

const SettingsContext = createContext();

function SettingsProvider({ children }) {
  const [autoplay, setAutoplay] = useState(true);
  const [autoNextQuestion, setAutoNextQuestion] = useState(true);

  function toggleAutoplay() {
    setAutoplay(!prev);
  }

  function toggleAutoNextQuestion() {
    setAutoNextQuestion(!prev);
  }

  return (
    <SettingsContext.Provider value={{ autoplay, toggleAutoplay, autoNextQuestion, toggleAutoNextQuestion }}>
      {children}
    </SettingsContext.Provider>
  );

};

export{ SettingsProvider, SettingsContext }