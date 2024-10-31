import React, { useState, useContext } from "react";
import styled from "styled-components";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Highcharts3D from 'highcharts/highcharts-3d';
import HeatmapModule from 'highcharts/modules/heatmap';
import HighchartsContour from 'highcharts-contour';
import HighchartsPolygon from 'highcharts/modules/polygon';

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
    const contour = [];

    const { xx, yy, uu, disk } = Faraday(n, r, sides);

    for (let i = 0; i < 120; i++) {
      for (let j = 0; j < 120; j++) {
        contour.push([xx[i][j], yy[i][j], uu[i][j]]);
      }
    }

    setPlotData({ disk, contour });
  }

  const n = 10; // Number of disks
  const r = 0.1; // Radius of disks
  const sides = 360; // Number of sides for cage
  
  // Initialize the 3D module
  Highcharts3D(Highcharts);
  HeatmapModule(Highcharts);
  HighchartsContour(Highcharts);
  HighchartsPolygon(Highcharts);

  let [plotData, setPlotData] = useState({ disk: [], contour: [] });

  // Chart options
  const diskSeries = plotData.disk.map((currDisk, index) => ({
    type: "polygon",
    name: `Disk ${index + 1}`,
    color: "rgba(255, 179, 179, 0.5)",
    data: currDisk
  }));

  const contourSeries = {
    type: "heatmap",
    name: "Contour Plot",
    data: plotData.contour,
    color: "black",
    levels: {
      start: -2,
      end: 1.2,
      step: 0.1
    },
    showInLegend: false
  }

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
    series: [...diskSeries, contourSeries]
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