import Head from 'next/head';
import react from 'react';
import Link from 'next/link'

import PostsPer from "../components/SurfingDirt/PostsPer";

import postsPerWeek from '../public/surfingdirt_posts_per_week.csv';
import topicsPerWeek from '../public/surfingdirt_topics_per_week.csv';

const width = 800;
const height = 400;
const margin = {top: 20, bottom: 150, left: 80, right: 70};

export default function SurfingDirt() {
  return (
    <div className="container">
      <Head>
        <title>Surfing Dirt forum stats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Link href="/">
          <a>Back to home</a>
        </Link>

        <article>
          <h1>New topics per week</h1>
          <div className="statWrapper">
            <PostsPer width={width} height={height} margin={margin} data={topicsPerWeek} dataKey="topics" label="Topics" barClass="topicBar" />
          </div>
        </article>

        <article>
          <h1>Posts per week</h1>
          <div className="statWrapper">
            <PostsPer width={width} height={height} margin={margin} data={postsPerWeek} dataKey="posts"  label="Posts" barClass="postBar" />
          </div>
        </article>

      </main>

      <style jsx global>{`
          body { margin:20px; font-family: Helvetica }
          main {
            width: 100%;
            min-height: 100%;
          }
          .statWrapper {
          }

          .topicBar {
            fill: #26a3bc;
          }

          .postBar {
            fill: #986934;
          }
      `}</style>
    </div>
  );
}
