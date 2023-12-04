import { PresentationControls, Stage } from '@react-three/drei'
import React from 'react'
import { Canvas } from 'react-three-fiber'
import Model3dMake from './Model3dMake'

const CanvasComponent: React.FC<{ model: string | undefined, width: string, height: string }> = ({ model, width, height }) => {
  return (
    <Canvas className='rounded-md' dpr={[1, 2]} shadows camera={{ fov: 45 }} style={{ marginTop: "3%", width: width, height: height }}>
      <color attach="background" args={["#000"]} />
      <PresentationControls speed={1.5} global zoom={.5} polar={[-0.1, Math.PI / 4]}>
        <Stage environment={"sunset"}>
          <Model3dMake model={model} />
        </Stage>
      </PresentationControls>
    </Canvas>
  )
}

export default CanvasComponent;
