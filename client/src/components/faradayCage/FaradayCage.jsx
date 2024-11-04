import React, { useState, useContext, useEffect } from "react";
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
  height: 80vh;
  width: 40vw;
  border: 4px solid black;
`;

const StyledButton = styled.button`
  height: 80px;
  width: 10%;
  border: 4px solid black;
  border-radius: 20px;
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.primaryColor};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryColor};
    color: ${({ theme }) => theme.tertiaryColor};
  }
`;

function FaradayCage(props) {
  const { theme } = useContext(ThemeContext);

  const [plotData, setPlotData] = useState({ contour: [] });
  const [axisValues, setAxisValues] = useState({ xValues: [], yValues: [] });
  const [diskValues, setDiskValues] = useState({ diskXValues: [], diskYValues: [] });

  // Generate heatmap data from xx, yy, uu
  function updateData(n, r, sides) {
    const contour = [];
    let xValues = [];
    let yValues = [];

    const { xx, yy, uu } = Faraday(n, r, sides);

    for (let i = 0; i < 120; i++) {
      contour.push([]);
      xValues.push(-1.4 + (0.03 * i));
      yValues.push(-1.8 + (0.03) * i);
      for (let j = 0; j < 120; j++) {
        contour[i].push(uu[i][j]);
      }
    }

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

    const { diskXValues, diskYValues } = rootsOfUnity(n);

    setPlotData({ contour });
    setAxisValues({ xValues, yValues });
    setDiskValues({ diskXValues, diskYValues });
  }

  const n = 8; // Number of disks
  const r = 0.1; // Radius of disks
  const sides = 360; // Number of sides for cage
  
  return (
    <StyledFlexboxContainer>
      <StyledChartContainer>
        <Plot
          data={[
            // Contour plot
            {
              z: plotData.contour,  // This is the 2D array representing Z values (heights)
              x: axisValues.xValues,
              y: axisValues.yValues,
              type: 'contour',  // Specify contour plot
              colorscale: 'Viridis',  // Choose a colorscale or customize it
              contours: {
                coloring: 'lines',  // Options are 'heatmap', 'lines', or 'none'
                showlines: true,
                width: 3,
                line: {
                  opacity: 0
                },
                start: -3.5,
                end: 1,
                size: 0.1
              }
            },
            // Disks
            {
              x: diskValues.diskXValues,     // X-coordinates of disks
              y: diskValues.diskYValues,    // Y-coordinates of disks
              mode: 'markers',
              type: 'scatter',
              marker: {
                size: 22,                // Size of disks (in pixels)
                color: 'rgba(255, 0, 0, 0.6)',  // Disk color with transparency
                line: {
                  color: 'black',        // Outline color
                  width: 1,
                },
                symbol: 'circle',        // Ensures markers are circular
              },
              name: 'Disks',
              showlegend: false,
            }
          ]}
          layout={ {autosize: true, title: 'Faraday Cage in Two Dimensions'} }
          style={{ width: '100%', height: '100%' }}
          useResizeHandler={true} 
        />
      </StyledChartContainer>
      <StyledButton theme={theme} onClick={() => {updateData(n, r, sides)}}>
        <h4>
          Update Data
        </h4>
      </StyledButton>
    </StyledFlexboxContainer>
  )
}

export default FaradayCage