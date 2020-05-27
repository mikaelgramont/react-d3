import React, {useState, useEffect, useRef} from 'react';
import * as d3 from 'd3';

import { AxisLeft, AxisBottom } from '@vx/axis'
import { Group } from '@vx/group';
import { Bar, Line } from '@vx/shape';
import { scaleLinear, scaleBand, scaleTime } from '@vx/scale';

function numTicksForHeight(height) {
  if (height <= 300) return 3;
  if (300 < height && height <= 600) return 5;
  return 10;
}

function numTicksForWidth(width) {
  if (width <= 300) return 2;
  if (300 < width && width <= 400) return 5;
  return 10;
}

const PostsPer = ({ width, height, margin, data, dataKey, label, barClass }) => {
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // X and Y
  const x = ({ week }) => {
    const [y, w] = week.split('-');
    const d = (1 + (w - 1) * 7);
    const xValue = new Date(y, 0, d);
    return xValue;
  };
  const y = d => d[dataKey];

  // Domain, range and scales
  const domain = [x(data[0]), x(data[data.length - 1])];
  const range = [0, xMax];
  const xScale = scaleTime({
    domain,
    range,
    padding: 0.4,
  });
  const yScale = scaleLinear({
    rangeRound: [yMax, 0],
    domain: [0, Math.max(...data.map(y))],
  });

  const xPoint = d => {
    const xValue = xScale(x(d));
    return xValue;
  };
  const yPoint = data => yScale(y(data));

  return (
    <svg width={width} height={height}>
      <Group>
        {data.map((d, i) => {
          const barHeight = yMax - yPoint(d);
          return (
            <Group key={`bar-${i}`}>
              <Bar
                x={xPoint(d) + margin.left}
                y={yMax - barHeight}
                height={barHeight}
                width={1}
                className={barClass}
              />
            </Group>
          );
        })}
      </Group>
      <Group left={margin.left}>
        <AxisLeft
          top={margin.top}
          left={0}
          scale={yScale}
          hideZero
          numTicks={numTicksForHeight(height)}
          label={label}
          labelProps={{
            fill: '#8e205f',
            textAnchor: 'middle',
            fontSize: 12,
            fontFamily: 'Arial'
          }}
          stroke="#1b1a1e"
          tickStroke="#8e205f"
          tickLabelProps={(value, index) => ({
            fill: '#8e205f',
            textAnchor: 'end',
            fontSize: 10,
            fontFamily: 'Arial',
            dx: '-0.25em',
            dy: '0.25em'
          })}
          tickComponent={({ formattedValue, ...tickProps }) => (
            <text {...tickProps}>{formattedValue}</text>
          )}
        />
      </Group>
      <AxisBottom
        top={height - margin.bottom -20}
        left={margin.left}
        scale={xScale}
        numTicks={numTicksForWidth(width)}
        label="Year"
      >
        {axis => {
          //console.log('ticks', axis.ticks);
          const tickLabelSize = 10;
          const tickRotate = 90;
          const tickColor = '#8e205f';
          const axisCenter = (axis.axisToPoint.x - axis.axisFromPoint.x) / 2;
          return (
            <g className="my-custom-bottom-axis">
              {axis.ticks.map((tick, i) => {
                const tickX = tick.to.x;
                const tickY = tick.to.y + tickLabelSize + axis.tickLength;
                return (
                  <Group key={`vx-tick-${tick.value}-${i}`} className={'vx-axis-tick'}>
                    <Line from={tick.from} to={tick.to} stroke={tickColor} />
                    <text
                      transform={`translate(${tickX}, ${tickY}) rotate(${tickRotate})`}
                      fontSize={tickLabelSize}
                      textAnchor="middle"
                      fill={tickColor}
                    >
                      {tick.formattedValue}
                    </text>
                  </Group>
                );
              })}
              <text textAnchor="middle" transform={`translate(${axisCenter}, 50)`} fontSize="8">
                {axis.label}
              </text>
              <Line from={axis.axisFromPoint} to={axis.axisToPoint} stroke={tickColor}></Line>
            </g>
          );
        }}
      </AxisBottom>
    </svg>
  );
};

export default PostsPer;