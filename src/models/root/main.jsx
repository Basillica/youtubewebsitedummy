// @ts-nocheck
import "./styles.css";
import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { TextureLoader } from "three";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import { OrbitControls, Sky, Stars, useGLTF } from "@react-three/drei";
import { Glitch } from "../../components/glitch";
import { useLoader } from "@react-three/fiber";
import { UpcomingVideos } from "../upcoming";
import { Videos } from "../videos";
import { YouTubeGallery } from "../youtube";

const App = (props) => {
    return (
        <>
            {props.state === "HOME" && <Home />}
            {props.state === "YOUTUBE" && <YouTubeGallery />}
            {props.state === "VIDEOS" && <Videos />}
            {props.state === "UPCOMING" && <UpcomingVideos />}
        </>
    );
};

const Home = () => {
    const colorMap2 = useLoader(TextureLoader, "house_4k.jpeg");
    return (
        <>
            <div
                style={{
                    textAlign: "center",
                }}
            >
                <div
                    style={{
                        display: "inline-block",
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                >
                    <Glitch children={"MAKE DEV EASY"} />

                    <div style={{ height: "30%", margin: "5px auto" }}>
                        <a
                            type="button"
                            href="https://www.youtube.com/channel/UChFU5sDCF3QNFL456_JegzA/"
                            target="_blank"
                        >
                            <button
                                style={{
                                    position: "relative",
                                    float: "left",
                                    height: "100%",
                                    width: "130px",
                                    borderRadius: "20px",
                                    margin: "10px",
                                }}
                            >
                                Stay Upto Date
                            </button>
                        </a>
                        <a type="button" href="https://x.com/easydev4all?s=09" target="_blank">
                            <button
                                style={{
                                    position: "relative",
                                    float: "right",
                                    height: "100%",
                                    width: "130px",
                                    borderRadius: "20px",
                                    margin: "10px",
                                }}
                            >
                                Follow our Story
                            </button>
                        </a>
                    </div>
                </div>

                <div style={{ paddingTop: "20px", height: "500px" }}>
                    <Overlay />
                    <Canvas>
                        <ambientLight intensity={Math.PI / 2} />
                        <spotLight position={[10, 10, 10]} angle={0.4} penumbra={1} decay={0} intensity={Math.PI} />
                        <directionalLight castShadow={true} />
                        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
                        <Sphere
                            visible
                            position={[-4.2, 0, 0]}
                            args={[1, 16, 200]}
                            scale={1}
                            onClick={(e) => console.log(e)}
                            onPointerEnter={(e) => console.log(e)}
                        >
                            <MeshDistortMaterial
                                color="green"
                                attach="material"
                                distort={0.5}
                                speed={2.2}
                                roughness={0}
                                map={colorMap2}
                            />
                        </Sphere>
                        <Sphere
                            visible
                            position={[0, 0, 0]}
                            args={[1, 16, 200]}
                            scale={1}
                            onClick={(e) => console.log(e)}
                            onPointerEnter={(e) => console.log(e)}
                        >
                            <MeshDistortMaterial
                                color="pink"
                                attach="material"
                                distort={0.8}
                                speed={2}
                                roughness={0}
                                map={colorMap2}
                            />
                        </Sphere>
                        <Sphere
                            visible
                            position={[4.2, 0, 0]}
                            args={[1, 16, 200]}
                            scale={1}
                            onClick={(e) => console.log(e)}
                            onPointerEnter={(e) => console.log(e)}
                        >
                            <MeshDistortMaterial
                                color="white"
                                attach="material"
                                distort={0.6}
                                speed={1.8}
                                roughness={0}
                                map={colorMap2}
                            />
                        </Sphere>

                        <OrbitControls
                            autoRotate
                            enablePan={false}
                            enableZoom={false}
                            maxPolarAngle={Math.PI / 2}
                            minPolarAngle={Math.PI / 2}
                        />
                        <Stars radius={500} depth={50} count={1000} factor={10} />
                        <Sky />
                        <Model position={[5, 5, -40]} />
                        <Model position={[45, 0, 0]} />
                        <Model position={[25, 10, 40]} />
                    </Canvas>
                </div>
            </div>
        </>
    );
};

function Model(props) {
    const mesh = useRef();
    const { nodes, materials } = useGLTF("scene.gltf");
    useFrame(
        (state, delta) => (
            (mesh.current.rotation.y += 0.01), (mesh.current.rotation.x += 0.01), (mesh.current.rotation.z += 0.01)
        )
    );
    useFrame((state, delta) => (mesh.current.position.z += delta * 10) > 180 && (mesh.current.position.z = -180));
    let meshes = [];
    for (var i = 0; i < Object.keys(nodes).length; i++) {
        meshes.push(<mesh {...nodes[i]} {...materials.materials} key={i} />);
    }
    return (
        <mesh ref={mesh} {...props} dispose={null}>
            <mesh {...props} {...nodes["Object_2"]} castShadow receiveShadow scale={0.01} position={[0, 0, 0]}>
                <meshStandardMaterial displacementScale={0.1} />
            </mesh>
            <mesh {...nodes["Object_3"]} castShadow receiveShadow scale={0.01} position={[0, 0, 0]} />
        </mesh>
    );
}

function Overlay() {
    const date = new Date().toLocaleString();
    return (
        <div
            style={{
                position: "absolute",
                top: 40,
                left: 0,
                pointerEvents: "none",
                width: "100%",
                height: "10%",
            }}
        >
            <div style={{ position: "absolute", top: 120, left: 20, fontSize: "13px" }}>— ezeabasili anthony</div>
            <div style={{ position: "absolute", top: 120, right: 20, fontSize: "13px" }}>— {date}</div>
        </div>
    );
}

export default App;
