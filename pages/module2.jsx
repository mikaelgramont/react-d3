import Head from 'next/head';
import {useRef, useEffect, useState, Fragment} from 'react';
import * as d3 from 'd3';
import Link from 'next/link'

import Table from '../components/Table';

const initialData = [
  {
    date: new Date('2007-03-24'),
    value: 1,
  }, {
    date: new Date('2007-03-25'),
    value: 2,
  }, {
    date: new Date('2007-03-26'),
    value: 4,
  }, {
    date: new Date('2007-03-27'),
    value: 6,
  }, {
    date: new Date('2007-03-28'),
    value: 5,
  }, {
    date: new Date('2007-03-29'),
    value: 6,
  }, {
    date: new Date('2007-03-30'),
    value: 3,
  }, {
    date: new Date('2007-03-31'),
    value: 4,
  }, {
    date: new Date('2007-04-01'),
    value: 7,
  },
];

const width = 800;
const height = 300;
const margin = {top: 20, bottom: 20, left: 20, right: 20};

export default function Module2() {
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

    const line = d3.line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.value));

    // create the path
    svg.append('path').attr('d', line(data)).attr('fill', "none").attr('stroke', 'red');

    // add the axes
    const xAxis = d3.axisBottom().scale(xScale)
    svg.append('g').call(xAxis).attr('transform', `translate(0, ${height - margin.bottom})`);

    const yAxis = d3.axisLeft().scale(yScale);
    svg.append('g').call(yAxis).attr('transform', `translate(${margin.left}, 0)`);

  }, [data]);

  const onAdd = () => {
    const newData = data.slice();
    const dateValues = dateInput.current.value.split('/');
    newData.push({
      date: new Date(dateValues[0], dateValues[1], dateValues[2]),
      value: valueInput.current.value,
    })
    setData(newData);

    dateInput.current.value = '';
    valueInput.current.value = '';
  };

  return (
    <div className="container">
      <Head>
        <title>D3 explorations - module 2</title>
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
