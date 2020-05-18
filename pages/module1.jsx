import Head from 'next/head';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link'

import Module1Chart from '../components/Module1Chart';
import Table from '../components/Table';

const initialData = [
  {
    date: new Date('2011-10-01'),
    value: 12,
  }, {
    date: new Date('2012-03-02'),
    value: 5,
  }, {
    date: new Date('2012-07-03'),
    value: 6,
  }, {
    date: new Date('2012-10-04'),
    value: 9,
  },
];

export default function Module1() {
  const dateInput = useRef();
  const valueInput = useRef();

  const [ data, setData ] = useState(initialData);
  useEffect(() => {

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

        <Module1Chart data={data} />
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
