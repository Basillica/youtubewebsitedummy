// @ts-nocheck
import { Canvas } from "react-three-fiber";
import { useLoader } from "@react-three/fiber";
// import { TextureLoader } from "three/src/loaders/TextureLoader";
import { TextureLoader } from "three";
import "./styles.css";
import {
    MeshDistortMaterial,
    MeshWobbleMaterial,
    Sphere
} from "@react-three/drei";

const name = (texture: any, type: any) => `${texture}-JPG_${type}.jpg`;
export default function App() {
    const [
        colorMap,
        displacementMap,
        normalMap,
        roughnessMap,
        aoMap,
        metalness,
    ] = useLoader(TextureLoader, [
        name("Rock051_1K", "Color"),
        name("Rock051_1K", "Displacement"),
        name("Rock051_1K", "NormalDX"),
        name("Rock051_1K", "Roughness"),
        name("Rock051_1K", "AmbientOcclusion"),
        name("Rock051_1K", "Metalness"),
    ]);

    const colorMap2 = useLoader(TextureLoader, 'house_4k.jpeg')

    return (
        <Canvas style={{ width: "50vw" }}>
            <ambientLight intensity={0.9} />
            <directionalLight />
            <mesh
                visible
                userData={{ test: "hello" }}
                position={[0, 0, 0]}
                rotation={[0, 0, 0]}
                castShadow
                scale={2}
            >
                <sphereGeometry attach="geometry" args={[1, 16, 200]} />
                <meshStandardMaterial
                    // attach="material"
                    // color="#7222D3"
                    // transparent
                    roughness={0.1}
                    metalness={0.1}
                    displacementScale={0.1}
                    map={colorMap}
                    displacementMap={displacementMap}
                    normalMap={normalMap}
                    roughnessMap={roughnessMap}
                    aoMap={aoMap}
                    metalnessMap={metalness}
                // normaal
                />
            </mesh>
            {/*An ambient light that creates a soft light against the object */}
            <ambientLight intensity={0.5} />
            {/*An directional light which aims form the given position */}
            <directionalLight position={[10, 10, 5]} intensity={1} />
            {/*An point light, basically the same as directional. This one points from under */}
            <pointLight position={[0, -10, 5]} intensity={1} />

            {/* We can use the drei Sphere which has a simple API. This sphere has a wobble material attached to it */}
            <Sphere visible position={[-3, 0, 0]} args={[1, 16, 200]} scale={2} onClick={(e) => console.log(e)}>
                <MeshWobbleMaterial
                    attach="material"
                    color="#EB1E99"
                    factor={1} // Strength, 0 disables the effect (default=1)
                    speed={2} // Speed (default=1)
                    roughness={0}
                />
            </Sphere>

            {/* This sphere has a distort material attached to it */}
            <Sphere visible position={[3, 0, 0]} args={[1, 16, 200]} scale={2} onClick={(e) => console.log(e)} onPointerEnter={(e) => console.log(e)}>
                <MeshDistortMaterial
                    color="white"
                    attach="material"
                    distort={0.5} // Strength, 0 disables the effect (default=1)
                    speed={2} // Speed (default=1)
                    roughness={0}
                    map={colorMap2}
                />
            </Sphere>

        </Canvas>
    );
}
