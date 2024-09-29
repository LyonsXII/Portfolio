import { createContext, useState } from 'react';

const AudioContext = createContext();

function AudioProvider({ children }) {
  const [volume, setVolume] = useState(40);

  function changeVolume(event) {
    setVolume(event.target.value);
  }

  return (
    <AudioContext.Provider value={{ volume, changeVolume }}>
      {children}
    </AudioContext.Provider>
  );

};

export{ AudioProvider, AudioContext }