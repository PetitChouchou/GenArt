import Head from 'next/head'
import React from 'react'
import dynamic from 'next/dynamic'
import readSketches from '../lib/readSketches'
import Link from 'next/link'

const SketchComponent = dynamic(
  () => import("./sketch/sketch1"),
  { ssr: false }
)

export interface HomeProps {
  sketches: Array<{
    slug: string
  }>
}

export default function Home(props: HomeProps) {
  return (
    <>
      <Head>
        <title>Generative Art</title>
        <meta name="description" content="Generative art baby" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <>
          <div>Welcome to my generative sketches</div>
          { props.sketches.map((sketch) => {
            return (
              <div key={sketch.slug}>
                <Link href={`/sketch/${sketch.slug}`}>
                  {sketch.slug}
                </Link>
              </div>
            )
          })}
        </>
      </main>
    </>
  )
}

export function getStaticProps() {
  return {
    props: {
      sketches: readSketches()
    }
  }
}