import Head from 'next/head';
import {useRef, useEffect, useState, Fragment} from 'react';
import Link from 'next/link'

import { AxisLeft, AxisBottom } from '@vx/axis'
import { Group } from '@vx/group';
import { Bar, Line } from '@vx/shape';
import { scaleLinear, scaleBand, scaleTime } from '@vx/scale';

import WeekTable from '../components/WeekTable';
import postsPerWeek from '../public/surfingdirt_posts_per_week.csv';

const initialData = postsPerWeek; //.slice(0,5);

const width = 800;
const height = 400;
const margin = {top: 20, bottom: 150, left: 80, right: 70};

const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;

const x = ({posts, week}) => {
  const [y, w] = week.split('-');
  const d = (1 + (w - 1) * 7);
  const xValue = new Date(y, 0, d);
  return xValue;
};
const y = d => d.posts;

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

export default function Module3() {
  const [data, setData] = useState(initialData);
  const domain = [x(data[0]), x(data[data.length - 1])];
  const range = [0, xMax];
  // console.log({domain, range});
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
    // console.log({x: x(d), xValue});
    return xValue;
  };
  const yPoint = data => yScale(y(data));

  return (
    <div className="container">
      <Head>
        <title>D3 and VX explorations</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Link href="/">
          <a>Back to home</a>
        </Link>
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
                  fill="#fc2e1c"
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
              label="New posts per week"
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
              left={0}
              scale={xScale}
              numTicks={numTicksForWidth(width)}
              label="Time"
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
        <details>
          <summary>Data points</summary>
          <WeekTable data={data} setData={setData}/>
        </details>
      </main>

      <style jsx global>{`
          body { margin:20px; font-family: Helvetica }
          main {
            width: 100%;
            min-height: 100%;
          }
          svg {
          }
          table { border-collapse: collapse;}
          td { border: 1px solid; padding: 5px;}

      `}</style>
    </div>
  )
}
