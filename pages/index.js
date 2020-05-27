import Head from 'next/head';
import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>D3 explorations</title>
        <link rel="icon" href="/favicon.ico" />

      </Head>

      <main>
        <ul>
          <li>
            <Link href="/module1">
              <a>Module 1</a>
            </Link>
            &nbsp;
            <span>[select/enter/append, scales, axis]</span>
          </li>
          <li>
            <Link href="/module2">
              <a>Module 2</a>
            </Link>
            &nbsp;
            <span>[shapes: line]</span>
          </li>
          <li>
            <Link href="/module3">
              <a>Module 3</a>
            </Link>
            &nbsp;
            <span>One graph</span>
          </li>
          <li>
            <Link href="/surfingdirt">
              <a>Surfing Dirt</a>
            </Link>
            &nbsp;
            <span>Surfing Dirt history</span>
          </li>
        </ul>
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
