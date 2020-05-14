import Head from 'next/head';
import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

const parse = d3.timeParse("%Y%m%d");
const initialBooks = [
  {
    date: parse("20111001"),
    name: "Harry Potter and the Philosophers Stone",
    author: "J. K. Rowling",
    genre: "fantasy",
    price: 12,
  }, {
    date: parse("20121002"),
    name: "The Pedagogy of Freedom",
    author: "Bell hooks",
    genre: "non-fiction",
    price: 5,
  }, {
    date: parse("20120703"),
    name: "Harry Potter and the Chamber of Secrets",
    author: "J. K. Rowling",
    genre: "fantasy",
    price: 6,
  }, {
    date: parse("20120304"),
    name: "Gilgamesh",
    author: "Derrek Hines",
    genre: "poetry",
    price: 9,
  },
];

const width = 800;
const height = 300;
const margin = {top: 20, bottom: 20, left: 20, right: 20};

export default function Home() {
  const h = 400;
  const vis = useRef();
  const [ books, setBooks ] = useState(initialBooks);
  useEffect(() => {
    const data = books;

    const svg = d3.select(vis.current);

    // scales
    const xExtent = d3.extent(data, d => d.date);
    const yExtent = [0, d3.max(data, d => d.price)];

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
      .attr('y', d => yScale(d.price))
      .attr('height', d => heightScale(d.price))
      .attr('fill', 'blue');

    // add the axes
    const xAxis = d3.axisBottom().scale(xScale)
    svg.append('g').call(xAxis).attr('transform', `translate(0, ${height - margin.bottom})`);

    const yAxis = d3.axisLeft().scale(yScale);
    svg.append('g').call(yAxis).attr('transform', `translate(${margin.left}, 0)`);

  }, [books]);

  return (
    <div className="container">
      <Head>
        <title>D3 explorations</title>
        <link rel="icon" href="/favicon.ico" />

      </Head>

      <main>
        <svg ref={vis}></svg>
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
