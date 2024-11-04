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

  let [plotData, setPlotData] = useState({ disk: [], contour: [] });

  // Generate heatmap data from xx, yy, uu
  function updateData(n, r, sides) {
    const contour = [];

    const { xx, yy, uu, disk } = Faraday(n, r, sides);

    for (let i = 0; i < 120; i++) {
      contour.push([]);
      for (let j = 0; j < 120; j++) {
        contour[i].push(uu[i][j]);
      }
    }

    setPlotData({ disk, contour });
  }

  const n = 4; // Number of disks
  const r = 0.1; // Radius of disks
  const sides = 360; // Number of sides for cage
  
  return (
    <StyledFlexboxContainer>
      <StyledChartContainer>
        <Plot
          data={[
            {
              z: plotData.contour,  // This is the 2D array representing Z values (heights)
              type: 'contour',  // Specify contour plot
              colorscale: 'Viridis',  // Choose a colorscale or customize it
              contours: {
                coloring: 'heatmap',  // Options are 'heatmap', 'lines', or 'none'
                start: -3.5,
                end: 1,
                size: 0.1,
                labelfont: {
                  size: 20,
                  color: 'white'
                }
              }
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