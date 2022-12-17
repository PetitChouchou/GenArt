import Head from 'next/head'
import React from 'react'
import dynamic from 'next/dynamic'

const SketchComponent = dynamic(
  () => import("./sketch/sketch1"),
  { ssr: false }
)


export default function Home() {
  return (
    <>
      <Head>
        <title>Generative Art</title>
        <meta name="description" content="Generative art baby" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>Welcome to my generative sketches</div>
        <SketchComponent></SketchComponent>
      </main>
    </>
  )
}
