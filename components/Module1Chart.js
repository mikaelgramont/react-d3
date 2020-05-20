import React, {useState, useEffect, useRef} from 'react';
import * as d3 from 'd3';

const width = 800;
const height = 300;
const margin = {top: 20, bottom: 20, left: 20, right: 20};

const Module1Chart = ({ vis, data }) => {
  const xAxisRef = useRef();
  const yAxisRef = useRef();

  const [output, setOutput] = useState((
    <>
      <g ref={xAxisRef}></g>
      <g ref={yAxisRef}></g>
    </>
  ));

  const barWidth = 20;

  useEffect(() => {
    // scales
    const xExtent = d3.extent(data, d => d.date);
    const yExtent = [0, d3.max(data, d => d.value)];

    const xScale = d3.scaleTime()
      .domain(xExtent)
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain(yExtent)
      .range([height - margin.bottom, margin.top]);

    const heightScale = d3.scaleLinear()
      .domain(yExtent)
      .range([0, height - margin.top - margin.bottom]);

    // add the axes
    const xAxis = d3.axisBottom().scale(xScale);
    // svg.append('g').call(xAxis).attr('transform', `translate(0, ${height - margin.bottom})`);
    d3.select(xAxisRef.current).call(xAxis);

    const yAxis = d3.axisLeft().scale(yScale);
    // svg.append('g').call(yAxis).attr('transform', `translate(${margin.left}, 0)`);
    d3.select(yAxisRef.current).call(yAxis);

    // This kind of works, but axis are not rendered on the server.
    // The reason is that d3 actually builds DOM elements when calling d3.select(yAxisRef.current).call(yAxis);
    // And that's not compatible with the JSX here
    setOutput(
      <svg width={width} height={height}>
        {data.map(( {date, value} ) => (
          <rect width={barWidth} fill="blue" y={yScale(value)} x={xScale(date)} height={heightScale(value)} />
        ))}
        <g ref={xAxisRef} transform={`translate(0, ${height - margin.bottom})`}></g>
        <g ref={yAxisRef} transform={`translate(0, ${margin.left})`}></g>
      </svg>
    );
  }, [data]);

  return output;
};

export default Module1Chart;