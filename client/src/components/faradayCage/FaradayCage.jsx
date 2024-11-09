import React, { useState, useContext } from "react";
import styled from "styled-components";
import Plot from 'react-plotly.js';

import { ThemeContext } from "../../context/ThemeContext";

import FaradaySettingsRow from "./FaradaySettingsRow";
import { Faraday } from "./faraday.js";

const StyledFlexboxContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const StyledChartContainer = styled.div`
  height: 85vh;
  width: 40vw;
  border: 4px solid black;
`;

const StyledButtonContainer = styled.div`
  height: 100vh;
  width: auto;
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const StyledRowContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const StyledButton = styled.button`
  width: auto;
  padding: 15px 30px;
  word-wrap: break-word;
  white-space: normal;
  border: 4px solid black;
  border-radius: 20px;
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.primaryColor};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryColor};
    color: ${({ theme }) => theme.tertiaryColor};
    transform: scale(1.01);
    transition: transform 0.2s ease, background-color 0.8s ease;
  }
`;

const StyledIncrementButton = styled.button`
  width: 10%;
  padding: 15px 30px;
  border: 4px solid black;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.primaryColor};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryColor};
    color: ${({ theme }) => theme.tertiaryColor};
    transform: scale(1.01);
    transition: transform 0.1s ease, background-color 0.8s ease;
  }
`;

const StyledToggle = styled.input`
  // Hide default tickbox
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  width: 60px;
  height: 30px;
  background-color: ${({ theme }) => theme.secondaryColor};
  border-radius: 50px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0px 0px 10px black;

  // Knob settings
  &::after {
    content: "";
    position: absolute;
    top: 3px;
    left: 3px;
    width: 24px;
    height: 24px;
    background-color: ${({ theme }) => theme.textColor};
    border-radius: 50%;
    transition: 0.3s ease;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  // State when toggled off
  &:not(:checked) {
    opacity: 0.8;
  }

  // State changes when toggled on
  &:checked {
    background-color: ${({ theme }) => theme.tertiaryColor};
    &::after {
      left: calc(100% - 27px);
      opacity: 1;
    }
  }

  // Hover effect
  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 0px 16px black;
  }
`;

function FaradayCage(props) {
  const { theme } = useContext(ThemeContext);

  const [plotData, setPlotData] = useState([]);
  const [plotDataHeat, setPlotDataHeat] = useState([]);
  const [axisValues, setAxisValues] = useState({ xValues: [], yValues: [] });
  const [diskValues, setDiskValues] = useState({ diskXValues: [], diskYValues: [] });

  const [numDisks, setNumDisks] = useState(4);
  const [radiusDisks, setRadiusDisks] = useState(0.1);
  const [numSides, setNumSides] = useState(360);
  const [heatmap, setHeatmap] = useState(false);

  // Generate heatmap data from xx, yy, uu
  function updateData(n, r, sides) {
    const contour = [];
    const contour_heat = [];
    let xValues = [];
    let yValues = [];

    const { xx, yy, uu, uu_heat } = Faraday(numDisks, radiusDisks, numSides);

    for (let i = 0; i < 120; i++) {
      contour.push([]);
      contour_heat.push([]);
      xValues.push(-1.4 + (0.03 * i));
      yValues.push(-1.8 + (0.03) * i);
      for (let j = 0; j < 120; j++) {
        contour[i].push(uu[i][j]);
        contour_heat[i].push(uu_heat[i][j]);
      }
    }

    // Calculating n-th roots of unity to position disks for plot
    function rootsOfUnity(n) {
      const diskXValues = [];
      const diskYValues = [];
      const angleIncrement = (2 * Math.PI) / n; // The angle difference between each root
      
      for (let k = 0; k < n; k++) {
          const angle = k * angleIncrement;
          // Ternary deals with floating point messiness
          diskXValues.push(Math.abs(Math.cos(angle)) < 0.001 ? 0 : Math.cos(angle)); // X coordinates
          diskYValues.push(Math.abs(Math.sin(angle)) < 0.001 ? 0 : Math.sin(angle)); // Y coordinates
      }
      
      return { diskXValues, diskYValues };
    }

    const { diskXValues, diskYValues } = rootsOfUnity(numDisks);

    setPlotData(contour);
    setPlotDataHeat(contour_heat);
    setAxisValues({ xValues, yValues });
    setDiskValues({ diskXValues, diskYValues });
  }

  function incrementNumDisks(direction) {
    setNumDisks((prev) => {
      if (direction === "Add") {
        return prev + 1;
      } else if (direction === "Subtract" && prev > 0) {
        return prev - 1;
      }
      return prev;
    });
  }

  function incrementRadiusDisks(direction) {
    setRadiusDisks((prev) => {
      if (direction === "Add") {
        if (prev === 0.1) {return 0.5}
        if (prev === 0.01) {return 0.1}
      } else if (direction === "Subtract" && prev > 0) {
        if (prev === 0.5) {return 0.1}
        if (prev === 0.1) {return 0.01}
      }
      return prev;
    });
  }

  function toggleMode() {
    setHeatmap(prev => !prev);
  }

  return (
    <StyledFlexboxContainer>
      <StyledChartContainer>
        <Plot
          data={[
            // Heatmap
            {
              z: plotDataHeat, 
              x: axisValues.xValues,
              y: axisValues.yValues,
              type: "contour",
              colorscale: "Portland",
              contours: {
                coloring: "heatmap",  // "heatmap" or "lines"
                width: 3,
                start: -3.5,
                end: 1,
                size: 0.1,
                showlines: false
              },
              line: {
                width: 0
              },
              showscale: false,
              opacity: heatmap ? 0.9 : 0
            },
            // Contour plot
            {
              z: plotData, 
              x: axisValues.xValues,
              y: axisValues.yValues,
              type: "contour",
              colorscale: "Portland",
              contours: {
                coloring: "lines",
                width: 3,
                start: -3.5,
                end: 1,
                size: 0.1
              },
              line: {
                width: 2
              },
              showscale: false
            },
            // Plot Disks (Visual Aid Only)
            {
              x: diskValues.diskXValues,
              y: diskValues.diskYValues,
              mode: "markers",
              type: "scatter",
              marker: {
                size: radiusDisks * 220,
                color: "rgba(255, 0, 0, 0.6)",
                line: {
                  color: "black",
                  width: 1,
                },
                symbol: "circle",
              },
              name: "Disks",
              showlegend: false,
            }
          ]}
          layout={{
            autosize: true, 
            title: { 
              text: "Faraday Cage in Two Dimensions",
              font: {
                size: 24
              }
            },
            xaxis: {
              zeroline: false,
              showgrid: false,
              tickfont: {
                size: 18
              }
            },
            yaxis: {
              zeroline: false,
              showgrid: false,
              tickfont: {
                size: 18
              }
            },
            margin: {
              l: 80,
              r: 35,
              t: 100,
              b: 70
            }
          }}
          style={{ width: "100%", height: "100%" }}
          useResizeHandler={true} 
        />
      </StyledChartContainer>
      <StyledButtonContainer>
        <h3>Settings</h3>
        <StyledButton theme={theme} onClick={() => {updateData(numDisks, radiusDisks, numSides)}}>
          <h4>
            Update Data
          </h4>
        </StyledButton>
        <FaradaySettingsRow theme={theme} name="Number of Disks" value={numDisks} onClick={incrementNumDisks}/>
        <FaradaySettingsRow theme={theme} name="Radius of Disks" value={radiusDisks} onClick={incrementRadiusDisks}/>
        <StyledRowContainer>
          <StyledButton theme={theme}>
            <h4>Heatmap?</h4>
          </StyledButton>
          <StyledToggle theme={theme} type="checkbox" checked={heatmap} onChange={toggleMode}></StyledToggle>
        </StyledRowContainer>
      </StyledButtonContainer>
    </StyledFlexboxContainer>
  )
}

export default FaradayCage