import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Plot from 'react-plotly.js';

import { StyledFlexboxContainer, StyledChartContainer, StyledButtonContainer, StyledRowContainer, StyledButton, StyledTextBox, StyledIncrementButton, StyledToggle, StyledTextH3, StyledTextH4 } from './FaradayCage.styles';

import ReturnButton from "../general/ReturnButton";
import FaradaySettingsRow from "./FaradaySettingsRow";
import FaradayWorker from "./faraday.worker.js?worker";
import LoadingIcon from "../general/LoadingIcon.jsx"
import { initialData } from "./initialData";  // Faraday function output for initial scenario

import { ThemeContext } from "../../context/ThemeContext";
import { StyledTextContainer } from "../songGuesser/SongGuesser.styles";

function FaradayCage({ transition, home }) {
  const { theme } = useContext(ThemeContext);

  const [plotData, setPlotData] = useState(initialData.uu);
  const [plotDataHeat, setPlotDataHeat] = useState(initialData.uu_heat);
  const [plotDataGradient, setPlotDataGradient] = useState([]);
  const [centerGradient, setCenterGradient] = useState(0);
  const [axisValues, setAxisValues] = useState({ 
    xValues: Array.from({ length: 120 }, (_, i) => -1.4 + (i * 0.03)), 
    yValues: Array.from({ length: 120 }, (_, i) => -1.8 + (i * 0.03))
  });
  const [diskValues, setDiskValues] = useState({ 
    diskXValues: [
      0.29401699437494744,
      -0.8240169943749474,
      -0.8240169943749475,
      0.2940169943749472,
      0.985
  ], diskYValues: [
      0.9360565162951535,
      0.5727852522924732,
      -0.602785252292473,
      -0.9660565162951537,
      -0.015000000000000244
  ]});

  const [numDisks, setNumDisks] = useState(5);
  const [radiusDisks, setRadiusDisks] = useState(0.1);
  const [tempRadiusDisks, setTempRadiusDisks] = useState(0.1);
  const [numSides, setNumSides] = useState(360);
  const numSidesDict = {3: "Triangle", 4: "Square", 5: "Pentagon", 6: "Hexagon", 7: "Septagon", 8: "Octagon", 360: "Circle"};
  const [heatmap, setHeatmap] = useState(false);

  const [loading, setLoading] = useState(false);

  // Update values used in plots
  function updatePlotValues(uu, uu_heat, diskXValues, diskYValues, centerGradient) {
    // Values used in contour and heatmap plots
    const contour = [];
    const contour_heat = [];
    // X and Y values used for axes divisions
    let xValues = [];
    let yValues = [];

    // Correcting Plotly marker placement
    diskXValues.forEach((value, i) => diskXValues[i] = diskXValues[i] - 0.015);
    diskYValues.forEach((value, i) => diskYValues[i] = diskYValues[i] - 0.015);

    for (let i = 0; i < uu.length; i++) {
      contour.push([]);
      contour_heat.push([]);
      xValues.push(-2 + (0.03333333 * i));
      yValues.push(-2 + (0.03333333 * i));
      for (let j = 0; j < uu[0].length; j++) {
        contour[i].push(uu[i][j]);
        contour_heat[i].push(uu_heat[i][j]);
      }
    }

    setPlotData(contour);
    setPlotDataHeat(contour_heat);
    setAxisValues({ xValues, yValues });
    setDiskValues({ diskXValues, diskYValues });
    setCenterGradient(centerGradient);
  }

  // Generate heatmap data from xx, yy, uu using using separate worker process
  function updateData() {
    setLoading(true);
    const worker = new FaradayWorker();

    worker.postMessage({
      n: numDisks,
      r: tempRadiusDisks,
      sides: numSides 
    })

    worker.onmessage = (event) => {
      const {
        uu,
        uu_heat,
        diskXValues,
        diskYValues,
        centerGradient,
      } = event.data;

      // Update the UI state
      updatePlotValues(
        uu,
        uu_heat,
        diskXValues,
        diskYValues,
        centerGradient,
      );

      setLoading(false);
      worker.terminate(); // Clean up the worker
    };
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
    const radiusOptions = [0.01, 0.05, 0.1, 0.2, 0.5];
    setTempRadiusDisks((prev) => {
      if (direction === "Add") {
        const index = radiusOptions.indexOf(prev);
        return radiusOptions[Math.min(index + 1, radiusOptions.length - 1)];
      } else if (direction === "Subtract" && prev > 0) {
        const index = radiusOptions.indexOf(prev);
        return radiusOptions[Math.max(index - 1, 0)];
      }
      return prev;
    });
  }

  function incrementNumSides(direction) {
    const sidesOptions = [360, 3, 4, 5, 6, 7, 8];
    setNumSides((prev) => {
      const index = sidesOptions.indexOf(prev);
      if (direction === "Add") {
        return sidesOptions[Math.min(index + 1, sidesOptions.length - 1)];
      } else if (direction === "Subtract") {
        return sidesOptions[Math.max(index - 1, 0)];
      }
      return prev;
    });
  }

  function toggleMode() {
    setHeatmap(prev => !prev);
  }

  // Updating radiusDisks, stops plot disks updating prematurely when value adjusted in menu
  useEffect(() => {
    setRadiusDisks(tempRadiusDisks);
  }, [plotData]);

  return (
    <StyledFlexboxContainer $transition={transition}>
      <ReturnButton returnFunction={home}/>
      {loading && <LoadingIcon/>}

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
        <StyledTextH3>Configuration</StyledTextH3>
        <StyledTextH4 style={{marginTop: "-30px"}}>Center Gradient: {centerGradient}</StyledTextH4>
        <StyledButton theme={theme} onClick={() => {updateData(numDisks, radiusDisks, numSides)}}>
          <StyledTextH4>Update Data</StyledTextH4>
        </StyledButton>
        <FaradaySettingsRow theme={theme} name="Number of Disks" value={numDisks} onClick={incrementNumDisks}/>
        <FaradaySettingsRow theme={theme} name="Radius of Disks" value={tempRadiusDisks} onClick={incrementRadiusDisks}/>
        <FaradaySettingsRow theme={theme} name="Shape" value={numSidesDict[numSides]} onClick={incrementNumSides}/>
        <StyledRowContainer>
          <StyledTextBox theme={theme}>
            <StyledTextH4>Heatmap?</StyledTextH4>
            <StyledToggle theme={theme} type="checkbox" checked={heatmap} onChange={toggleMode}/>
          </StyledTextBox>
        </StyledRowContainer>
      </StyledButtonContainer>

    </StyledFlexboxContainer>
  )
}

export default FaradayCage