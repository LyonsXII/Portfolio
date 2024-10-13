import React, { useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";

const StyledOptionFlexbox = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  gap: 30px;
`;

const StyledOptionFlexboxEntry = styled.div`
  display: flex;
  width: 100%;
  min-width: 100%;
  gap: 40px;
`;

const Slider = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 25px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  transition: opacity .2s;

  &:hover {
    opacity: 1;
  }

  //Webkit browsers
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    background: #04AA6D;
    cursor: pointer;
  }

  //Firefox
  &::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: #04aa6d;
    cursor: pointer;
  }

  //Custom thumb styling for internet explorer and edge
  &::-ms-thumb {
    width: 25px;
    height: 25px;
    background: #04AA6D;
    cursor: pointer;
  }
`;

function SettingsMenuGeneral({ active }) {
  const { theme } = useContext(ThemeContext);
  const { volume, changeVolume } = useContext(AudioContext);

  return (
      <StyledOptionFlexbox>
        <StyledOptionFlexboxEntry>
          <h4>Volume</h4>
          <Slider type="range" min="0" max="100" value={volume} id="VolumeControl" onChange={changeVolume}/>
        </StyledOptionFlexboxEntry>
      </StyledOptionFlexbox>
  )
}

export default SettingsMenuGeneral