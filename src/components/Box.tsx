// @ts-nocheck
import React from 'react'
import './App.css'
import * as THREE from 'three'
import { useRef, useState } from 'react'
import { useFrame, ThreeElements } from '@react-three/fiber'


const Box = (props: ThreeElements['mesh']) => {
    const meshRef = useRef<THREE.Mesh>(null!)
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    useFrame((state, delta) => {
        meshRef.current.rotation.x += delta;
        meshRef.current.rotation.y += delta;
        meshRef.current.rotation.z += delta * 2;
        console.log(state)
    })

    return (
        <mesh
            {...props}
            ref={meshRef}
            scale={active ? 2 : 1}

            onClick={(event: any) => {
                setActive(!active);
            }}

            onPointerOver={(event) => {
                setHover(true);
            }}

            onPointerOut={(event) => {
                setHover(false);
            }}>

            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}


export default Box;