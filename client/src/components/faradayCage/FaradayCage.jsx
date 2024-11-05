import React, { useState, useContext } from "react";
import styled from "styled-components";
import Plot from 'react-plotly.js';

import { ThemeContext } from "../../context/ThemeContext";

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
  width: 50vw;
  border: 4px solid black;
`;

const StyledButtonContainer = styled.div`
  height: 100vh;
  width: 20vw;
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
  width: 40%;
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

function FaradayCage(props) {
  const { theme } = useContext(ThemeContext);

  const [plotData, setPlotData] = useState([]);
  const [axisValues, setAxisValues] = useState({ xValues: [], yValues: [] });
  const [diskValues, setDiskValues] = useState({ diskXValues: [], diskYValues: [] });

  const [numDisks, setNumDisks] = useState(4);
  const [radiusDisks, setRadiusDisks] = useState(0.1);
  const [numSides, setNumSides] = useState(360);

  // Generate heatmap data from xx, yy, uu
  function updateData(n, r, sides) {
    const contour = [];
    let xValues = [];
    let yValues = [];

    const { xx, yy, uu } = Faraday(numDisks, radiusDisks, numSides);

    for (let i = 0; i < 120; i++) {
      contour.push([]);
      xValues.push(-1.4 + (0.03 * i));
      yValues.push(-1.8 + (0.03) * i);
      for (let j = 0; j < 120; j++) {
        contour[i].push(uu[i][j]);
      }
    }

    // Calculating n-th roots of unity to position disks for plot
    function rootsOfUnity(n) {
      const diskXValues = [];
      const diskYValues = [];
      const angleIncrement = (2 * Math.PI) / n; // The angle difference between each root
      
      for (let k = 0; k < n; k++) {
          const angle = k * angleIncrement;
          diskXValues.push(Math.cos(angle)); // x-coordinate
          diskYValues.push(Math.sin(angle)); // y-coordinate
      }
      
      return { diskXValues, diskYValues };
    }

    const { diskXValues, diskYValues } = rootsOfUnity(numDisks);

    setPlotData(contour);
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

  return (
    <StyledFlexboxContainer>
      <StyledChartContainer>
        <Plot
          data={[
            // Contour plot
            {
              z: plotData, 
              x: axisValues.xValues,
              y: axisValues.yValues,
              type: "contour",
              colorscale: "Portland",
              contours: {
                coloring: "lines",  // "heatmap" or "lines"
                width: 3,
                start: -3.5,
                end: 1,
                size: 0.1
              },
              line: {
                width: 2          // Adjust this for thicker lines
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
                size: 22,
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
              tickfont: {
                size: 18
              }
            },
            yaxis: {
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
        <StyledRowContainer>
          <StyledIncrementButton theme={theme} onClick={() => {incrementNumDisks("Subtract")}}/>
          <StyledButton theme={theme}>
            <h4>
              Number of Disks
            </h4>
            <h4>
              {numDisks}
            </h4>
          </StyledButton>
          <StyledIncrementButton theme={theme} onClick={() => {incrementNumDisks("Add")}}/>
        </StyledRowContainer>
      </StyledButtonContainer>
    </StyledFlexboxContainer>
  )
}

export default FaradayCage