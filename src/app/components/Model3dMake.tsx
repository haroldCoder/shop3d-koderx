"use client"
import { useGLTF } from '@react-three/drei';


const Model3dMake: React.FC<{ model: string | undefined}> = ({ model}) => {   
    const { scene } = useGLTF(model!)
    return <primitive object={scene} />
}
export default Model3dMake