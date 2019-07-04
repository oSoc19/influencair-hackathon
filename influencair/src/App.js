import React, { Component } from "react";
import "../node_modules/react-vis/dist/style.css";
import "./App.css";
import { dummyDataPM10, dummyDataPM25 } from "./dummyData.js";
import {
  XAxis,
  YAxis,
  XYPlot,
  LineSeries,
  Hint,
  Highlight,
  ChartLabel
} from "react-vis";

class App extends Component {
  constructor() {
    super();
    this.state = {
      lastDrawLocationPM10: null,
      lastDrawLocationPM25: null,
      data: [],
      hoverValuePM10: null,
      hoverValuePM25: null,
      graphData: {
        PM10: [],
        PM25: []
      },
      dummyData: {
        PM10: dummyDataPM10,
        PM25: dummyDataPM25
      }
    };
  }

  componentDidMount() {
    this.prepareDataLineGraph();
  }

  prepareDataLineGraph() {
    let lineGraphDataPM10 = [];
    let lineGraphDataPM25 = [];

    this.state.dummyData.PM10.dailyAverages.map((element, index) =>
      lineGraphDataPM10.push({
        x: element["Date"].slice(-5),
        y: element["Value"]
      })
    );

    this.state.dummyData.PM25.dailyAverages.map((element, index) =>
      lineGraphDataPM25.push({
        x: element["Date"].slice(-5),
        y: element["Value"]
      })
    );

    this.setState({
      graphData: {
        PM10: lineGraphDataPM10,
        PM25: lineGraphDataPM25
      }
    });
  }

  render() {
    const { lastDrawLocationPM10, lastDrawLocationPM25 } = this.state;
    return (
      <div className="main-container">
        <div className="header-image" />
        <div className="content">
          <h1 className="title">Brussels</h1>
          <h2 className="sub_title">
            A data visualization story exploring the air pollution in Brussels
          </h2>
          <p className="text">Plot average PM10 per day</p>
          <XYPlot
            xType="ordinal"
            animation
            xDomain={
              lastDrawLocationPM10 && [
                lastDrawLocationPM10.left,
                lastDrawLocationPM10.right
              ]
            }
            yDomain={
              lastDrawLocationPM10 && [
                lastDrawLocationPM10.bottom,
                lastDrawLocationPM10.top
              ]
            }
            height={250}
            width={1200}
            margin={{ bottom: 60, left: 50, right: 10, top: 20 }}
          >
            <LineSeries
              className="PM10-series"
              data={this.state.graphData.PM10}
              color="red"
              onNearestX={(value, { index }) =>
                this.setState({ hoverValuePM10: value, index })
              }
              onSeriesMouseOut={() => this.setState({ hoverValuePM10: null })}
            />
            {this.state.hoverValuePM10 && (
              <Hint
                value={this.state.hoverValuePM10}
                style={{
                  fontSize: 14,
                  padding: 14,
                  margin: 10,
                  text: {
                    display: "none"
                  },
                  value: {
                    color: "red"
                  }
                }}
              >
                <div
                  style={{
                    background: " #96b9c2",
                    padding: "10px",
                    color: "white"
                  }}
                >
                  <div>PM10:</div>
                  <div>{this.state.hoverValuePM10.y}</div>
                </div>
              </Hint>
            )}
            <YAxis
              style={{
                line: { stroke: "#ADDDE1" },
                ticks: { stroke: "#ADDDE1" },
                text: { stroke: "none", fill: "#6b6b76", fontWeight: 600 }
              }}
            />
            <XAxis
              tickValues={[
                "01-01",
                "02-01",
                "03-01",
                "04-01",
                "05-01",
                "06-01",
                "07-01"
              ]}
              style={{
                line: { stroke: "#ADDDE1" },
                ticks: { stroke: "#ADDDE1" },
                text: { stroke: "none", fill: "#6b6b76", fontWeight: 600 }
              }}
            />
            <ChartLabel
              text="Days"
              includeMargin={false}
              xPercent={0.5}
              yPercent={1.4}
              style={{
                className: "axis-label"
              }}
            />
            <ChartLabel
              text="PM10"
              includeMargin={false}
              xPercent={-0.03}
              yPercent={0.5}
              style={{
                transform: "rotate(-90)",
                textAnchor: "end",
                className: "axis-label"
              }}
            />
            <Highlight
              onBrushEnd={area => this.setState({ lastDrawLocationPM10: area })}
              onDrag={area => {
                this.setState({
                  lastDrawLocationPM10: {
                    bottom:
                      lastDrawLocationPM10.bottom + (area.top - area.bottom),
                    left: lastDrawLocationPM10.left - (area.right - area.left),
                    right:
                      lastDrawLocationPM10.right - (area.right - area.left),
                    top: lastDrawLocationPM10.top + (area.top - area.bottom)
                  }
                });
              }}
            />
          </XYPlot>
          <p className="text">Plot average PM2.5 per day</p>
          <XYPlot
            xType="ordinal"
            animation
            xDomain={
              lastDrawLocationPM25 && [
                lastDrawLocationPM25.left,
                lastDrawLocationPM25.right
              ]
            }
            yDomain={
              lastDrawLocationPM25 && [
                lastDrawLocationPM25.bottom,
                lastDrawLocationPM25.top
              ]
            }
            height={250}
            width={1200}
            margin={{ bottom: 80, left: 50, right: 10, top: 20 }}
          >
            <LineSeries
              className="PM25-series"
              data={this.state.graphData.PM25}
              onNearestX={(value, { index }) =>
                this.setState({ hoverValuePM25: value, index })
              }
              onSeriesMouseOut={() => this.setState({ hoverValuePM25: null })}
            />
            {this.state.hoverValuePM25 && (
              <Hint
                value={this.state.hoverValuePM25}
                style={{
                  fontSize: 14,
                  padding: 14,
                  margin: 10,
                  text: {
                    display: "none"
                  },
                  value: {
                    color: "red"
                  }
                }}
              >
                <div
                  style={{
                    background: " #96b9c2",
                    padding: "10px",
                    color: "white"
                  }}
                >
                  <div>PM25:</div>
                  <div>{this.state.hoverValuePM25.y}</div>
                </div>
              </Hint>
            )}
            <YAxis
              style={{
                line: { stroke: "#ADDDE1" },
                ticks: { stroke: "#ADDDE1" },
                text: { stroke: "none", fill: "#6b6b76", fontWeight: 600 }
              }}
            />
            <XAxis
              tickValues={[
                "01-01",
                "02-01",
                "03-01",
                "04-01",
                "05-01",
                "06-01",
                "07-01"
              ]}
              style={{
                title: { fontSize: "18px" },
                line: { stroke: "#ADDDE1" },
                ticks: { stroke: "#ADDDE1" },
                text: { stroke: "none", fill: "#6b6b76", fontWeight: 600 }
              }}
            />
            <ChartLabel
              text="Days"
              includeMargin={false}
              xPercent={0.5}
              yPercent={1.4}
              style={{
                className: "axis-label"
              }}
            />
            <ChartLabel
              text="PM2.5"
              includeMargin={false}
              xPercent={-0.03}
              yPercent={0.5}
              style={{
                transform: "rotate(-90)",
                textAnchor: "end",
                className: "axis-label"
              }}
            />

            <Highlight
              onBrushEnd={area => this.setState({ lastDrawLocationPM25: area })}
              onDrag={area => {
                this.setState({
                  lastDrawLocationPM25: {
                    bottom:
                      lastDrawLocationPM25.bottom + (area.top - area.bottom),
                    left: lastDrawLocationPM25.left - (area.right - area.left),
                    right:
                      lastDrawLocationPM25.right - (area.right - area.left),
                    top: lastDrawLocationPM25.top + (area.top - area.bottom)
                  }
                });
              }}
            />
          </XYPlot>
        </div>
      </div>
    );
  }
}

export default App;
