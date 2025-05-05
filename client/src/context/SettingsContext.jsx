import { createContext, useState } from 'react';

const SettingsContext = createContext();

function SettingsProvider({ children }) {
  const [autoplay, setAutoplay] = useState(false);
  const [autoNextQuestion, setAutoNextQuestion] = useState(false);
  const [autoNextQuestionDelay, setAutoNextQuestionDelay] = useState(3);
  const [skipVideo, setSkipVideo] = useState(false);

  const [plotColour, setPlotColour] = useState("Turbo");
  const [plotColourCount, setPlotColourCount] = useState(0);

  function toggleAutoplay() {
    setAutoplay(prev => !prev);
  }

  function toggleAutoNextQuestion() {
    setAutoNextQuestion(prev => !prev);
  }

  function adjustAutoNextQuestionDelay(event) {
    setAutoNextQuestionDelay(event.target.value)
  }

  function toggleSkipVideo() {
    setSkipVideo(prev => !prev);
  }

  function cyclePlotColour() {
    const plotColours = ["Portland", "Viridis", "Cividis", "Blues"];
    setPlotColourCount(prevCount => (prevCount + 1) % plotColours.length);
    setPlotColour(plotColours[plotColourCount]);
  }

  return (
    <SettingsContext.Provider value={{ autoplay, toggleAutoplay, autoNextQuestion, toggleAutoNextQuestion, autoNextQuestionDelay, adjustAutoNextQuestionDelay, skipVideo, toggleSkipVideo, plotColour, cyclePlotColour }}>
      {children}
    </SettingsContext.Provider>
  );

};

export{ SettingsProvider, SettingsContext }