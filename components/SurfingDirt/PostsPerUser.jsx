import React, {useState, useEffect, useRef} from 'react';
import * as d3 from 'd3';

import { AxisLeft, AxisBottom } from '@vx/axis'
import { Group } from '@vx/group';
import { Bar, Line } from '@vx/shape';
import { scaleLog, scaleLinear, scaleBand, scaleTime } from '@vx/scale';

const AVATAR_SIZE = 64;
const barWidth = 20;

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

const PostsPerUser = ({ width, height, margin, data, label, classes }) => {
  const yMax = height - margin.top - margin.bottom;

  // X and Y
  const x = ({ username }) => username;
  const y = (d) => {
    return d.posts;
  }

  // Domain, range and scales
  const xScale = scaleBand({
    range: [0, width],
    domain: data.map(({ username }) => username),
    padding: 1
  });

  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [0, Math.max(...data.map(y))],
  });

  const xPoint = d => {
    const xValue = xScale(x(d));
    return xValue;
  };
  const yPoint = d => {
    const yValue = yMax - yScale(y(d));
    return yValue;
  };

  const barColor = ({ posts }) => {
    if (posts > 10000) return classes[0];
    if (posts > 2000) return classes[1];
    return classes[2];
  };

  return (
    <svg width={width} height={height}>
      <Group>
        {data.map((d, i) => {
          const y = yPoint(d);
          const barHeight = y;
          // console.log({ yMax, barHeight, y, yPoint: yPoint(d) });
          return (
            <Group key={`bar-${i}`}>
              <Bar
                x={xPoint(d) + margin.left - barWidth / 2}
                y={margin.top + yMax - barHeight}
                height={barHeight}
                width={barWidth}
                className={barColor(d)}
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
        top={margin.top + height - margin.bottom -20}
        left={margin.left}
        scale={xScale}
      >
        {axis => {
          const tickLabelSize = 10;
          const tickRotate = 45;
          const tickColor = '#8e205f';
          const axisCenter = (axis.axisToPoint.x - axis.axisFromPoint.x) / 2;
          return (
            <>
              {axis.ticks.map((tick, i) => {
                const tickX = tick.to.x;
                const tickY = tick.to.y + tickLabelSize + axis.tickLength;
                return (
                  <Group key={`vx-tick-${tick.value}-${i}`} className={'vx-axis-tick'}>
                    <Line from={tick.from} to={tick.to} stroke={tickColor} />
                    <text
                      transform={`translate(${tickX}, ${tickY}) rotate(${tickRotate})`}
                      fontSize={tickLabelSize}
                      textAnchor="left"
                      fill={tickColor}
                    >
                      {tick.formattedValue}
                    </text>
                  </Group>
                );
              })}
              <text textAnchor="middle" transform={`translate(${axisCenter}, 80)`} fontSize="16">
                {axis.label}
              </text>
              <Line from={axis.axisFromPoint} to={axis.axisToPoint} stroke={tickColor}></Line>
            </>
          );
        }}
      </AxisBottom>
    </svg>
  );
};

export default PostsPerUser;