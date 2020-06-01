import Head from 'next/head';
import react from 'react';
import Link from 'next/link'

import PostsPer from "../components/SurfingDirt/PostsPer";
import PostsPerUser from "../components/SurfingDirt/PostsPerUser";

import postsPerWeek from '../public/surfingdirt_posts_per_week.csv';
import topicsPerWeek from '../public/surfingdirt_topics_per_week.csv';
import postsPerUser from '../public/posts_per_user.csv';

const width = 800;
const height = 400;
const margin = {top: 20, bottom: 150, left: 80, right: 70};
const MAX_USERS = 30;

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

        <article>
          <h1>Posts per user</h1>
          <div className="statWrapper">
            <PostsPerUser width={width} height={height} margin={margin} data={postsPerUser.slice(0,MAX_USERS)} label="Posts" classes={['userPost1', 'userPost2', 'userPost3', ]}/>
          </div>
        </article>

      </main>

      <style jsx global>{`
          body { margin:20px; font-family: Helvetica }
          main {
            width: 100%;
            min-height: 100%;
          }
          
          .vx-axis text,
          .vx-axis-label,
          .vx-axis-tick {
            fill: #8e205f;
            fill: var(--font-color, red);
          }
          .vx-line {
            stroke: #8e205f;
            stroke: var(--font-color, red);
          }

          .topicBar {
            fill: #26a3bc;
          }

          .postBar {
            fill: #986934;
          }
          .userPost1 {
            fill: #26a3bc;
          }
          .userPost2 {
            fill: #f5d58a;
          }
          .userPost3 {
            fill: #986934;
          }
      `}</style>
    </div>
  );
}
