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
      <main className="bg-slate-50 h-screen flex flex-row text-stone-900 place-content-center">
        <div className="w-3/4 md:w2/3 lg:w-1/2 text-lg">
          <h1 className="pt-16 pb-1 text-4xl font-bold">~ Generative</h1>
          <h3 className="font-medium italic text-xl pb-6">sketches in <a href='https://p5js.org/' target="_blank" className='hover:text-stone-500' rel="noreferrer">p5.js</a></h3>
          { props.sketches.map((sketch) => {
            return (
              <p key={sketch.slug} className="text-slate-500 mt-3">
                <Link
                href={`/sketch/${sketch.slug}`}
                className="hover:text-slate-800"
                >{sketch.slug}</Link>
              </p>
            )
          })}
        </div>
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