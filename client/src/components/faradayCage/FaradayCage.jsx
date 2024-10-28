import React, { useState, useContext } from "react";
import styled from "styled-components";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Highcharts3D from 'highcharts/highcharts-3d';
import HeatmapModule from 'highcharts/modules/heatmap';
import HighchartsContour from 'highcharts-contour';

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

  // Generate heatmap data from xx, yy, uu
  function updateData(n, r, sides) {
    const tempHeatmapData = [];

    const { xx, yy, uu, disk } = Faraday(n, r, sides);

    for (let i = 0; i < 120; i++) {
      for (let j = 0; j < 120; j++) {
        tempHeatmapData.push([xx[i][j], yy[i][j], uu[i][j]]);
      }
    }

    setHeatmapData(tempHeatmapData);
  }

  const n = 10; // Number of disks
  const r = 0.1; // Radius of disks
  const sides = 360; // Number of sides for cage
  
  // Initialize the 3D module
  HeatmapModule(Highcharts);

  let [heatmapData, setHeatmapData] = useState([]);

  // Chart options
  const options = {
    chart: {
      type: 'heatmap',
      options3d: {
        enabled: false,
      },
      plotBorderWidth: 1,
      height: "100%"
    },
    title: {
      text: 'Faraday Cage',
      style: { textShadow: "none"}
    },
    xAxis: {
      min: -1.4,
      max: 1.8,
      startOnTick: false,
      endOnTick: false
    },
    yAxis: {
      min: -1.8,
      max: 1.8,
      startOnTick: false,
      endOnTick: false
    },
    colorAxis: {
      stops: [
        [0.0, '#000'],      // Black at min value (-2)
        [0.1, '#222'],      // Very dark gray
        [0.2, '#444'],      // Dark gray
        [0.3, '#666'],      // Medium dark gray
        [0.4, '#888'],      // Medium gray
        [0.5, '#aaa'],      // Gray at midpoint (0)
        [0.6, '#bbb'],      // Light gray
        [0.7, '#ccc'],      // Lighter gray
        [0.8, '#ddd'],      // Very light gray
        [0.9, '#eee'],      // Almost white
        [1.0, '#fff']       // White at max value (2)
      ],
      min: -2,
      max: 2,
    },
    series: [
      {
        name: 'Heatmap',
        borderWidth: 0,
        data: heatmapData,
        colormap: 'black',
        pointPadding: 0.05
      }
    ],
  };

  return (
    <StyledFlexboxContainer>
      <StyledChartContainer>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
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