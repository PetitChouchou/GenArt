import Head from 'next/head'
import { Inter } from '@next/font/google'
import React from 'react'
import Sketch from 'react-p5'
import dynamic from 'next/dynamic'
import p5Types from "p5";

const inter = Inter({ subsets: ['latin'] })

const varae = "./sketch/sketch1"
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
