import Head from 'next/head';
import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import Link from 'next/link'

import Table from '../components/Table';

const initialData = [
  {
    date: new Date(2011, 10 ,1),
    value: 12,
  }, {
    date: new Date(2012, 10 ,2),
    value: 5,
  }, {
    date: new Date(2012, 7 ,3),
    value: 6,
  }, {
    date: new Date(2012, 3 ,4),
    value: 9,
  },
];

const width = 800;
const height = 300;
const margin = {top: 20, bottom: 20, left: 20, right: 20};

export default function Module1() {
  const h = 400;
  const vis = useRef();
  const dateInput = useRef();
  const valueInput = useRef();

  const [ data, setData ] = useState(initialData);
  useEffect(() => {
    const svg = d3.select(vis.current);

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

    // create the rectangles
    const barWidth = 2;
    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(d.date) )
      .attr('width', barWidth)
      .attr('y', d => yScale(d.value))
      .attr('height', d => heightScale(d.value))
      .attr('fill', 'blue');

    // add the axes
    const xAxis = d3.axisBottom().scale(xScale)
    svg.append('g').call(xAxis).attr('transform', `translate(0, ${height - margin.bottom})`);

    const yAxis = d3.axisLeft().scale(yScale);
    svg.append('g').call(yAxis).attr('transform', `translate(${margin.left}, 0)`);

  }, [data]);

  return (
    <div className="container">
      <Head>
        <title>D3 explorations - module 1</title>
        <link rel="icon" href="/favicon.ico" />

      </Head>

      <main>
        <Link href="/">
          <a>Back to home</a>
        </Link>
        <svg ref={vis}></svg>
        <Table data={data} dateInput={dateInput} valueInput={valueInput} setData={setData} />
      </main>

      <style jsx global>{`
          body { margin:20px; }
          main {
            width: 100%;
            min-height: 100%;
          }
          svg {
            width: 100%;
            height: 400px;
          }

      `}</style>
    </div>
  )
}
