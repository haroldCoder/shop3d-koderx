"use client"
import { useGLTF } from '@react-three/drei';
import { useLoader } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { PerspectiveCamera, Scene, Mesh, BoxGeometry, MeshBasicMaterial } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import uploadToCloudinary from '../services/UploadCloudinary';
import { saveAs } from 'file-saver';


const Model3dMake: React.FC<{ model: string | undefined}> = ({ model}) => {   
    const { scene } = useGLTF(model!)
    return <primitive object={scene} />
}
export default Model3dMake