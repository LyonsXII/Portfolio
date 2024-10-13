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
  -webkit-appearance: none;  /* Override default CSS styles */
  appearance: none;
  width: 100%; /* Full-width */
  height: 25px; /* Specified height */
  background: #d3d3d3; /* Grey background */
  outline: none; /* Remove outline */
  opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
  transition: opacity .2s;

  &:hover {
    opacity: 1;
  }

  /* WebKit browsers (Chrome, Safari, etc.) */
  &::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 25px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    background: #04AA6D; /* Green background */
    cursor: pointer; /* Cursor on hover */
  }

  /* Firefox */
  &::-moz-range-thumb {
    width: 25px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    background: #04AA6D; /* Green background */
    cursor: pointer; /* Cursor on hover */
  }

  /* Custom thumb styling for Internet Explorer and Edge */
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