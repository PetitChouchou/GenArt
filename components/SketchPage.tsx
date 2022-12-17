import dynamic from "next/dynamic";
import p5Types from "p5";

const Sketch = dynamic(() => import('react-p5'), { ssr: false });

export interface SketchPageProps {
  draw: (p5: p5Types) => void
  setup: (p5: p5Types, canvasParentRef: Element) => void
}

export default function SketchPage(props: SketchPageProps) {
  return (
    <main>
      <Sketch setup={props.setup} draw={props.draw} />
    </main>
  )
}