// @ts-nocheck
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { TrackballControls } from "three/addons/controls/TrackballControls.js";
import { CSS3DRenderer, CSS3DObject } from "three/addons/renderers/CSS3DRenderer.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Glitch } from "../../components/glitch";

const LatestVideos = () => {
    const containerRef = useRef(null);
    let camera, scene, renderer, controls, ctrl;

    function Element(id, x, y, z, ry, rx = -1) {
        const div = document.createElement("div");
        div.style.width = "640px";
        div.style.height = "360px";
        div.style.backgroundColor = "#000";

        const iframe = document.createElement("iframe");
        iframe.style.width = "640px";
        iframe.style.height = "360px";
        iframe.style.border = "0px";
        iframe.src = `https://www.youtube.com/embed/${id}?rel=0`;
        div.appendChild(iframe);

        const object = new CSS3DObject(div);
        object.position.set(x, y, z);
        object.rotation.y = ry;

        if (rx != -1) {
            object.rotation.x = rx;
        }

        return object;
    }

    function PoleElement(id, x, y, z, ry, rx = -1, top = false) {
        const div = document.createElement("div");
        const upper = document.createElement("div");
        upper.style.width = "640px";
        upper.style.height = "140px";
        upper.style.backgroundColor = "#FFE6E6";
        // upper.style.borderRadius = "20px"

        const lower = document.createElement("div");
        lower.style.width = "640px";
        lower.style.height = "135px";
        lower.style.backgroundColor = "#344955";
        // lower.style.borderRadius = "20px"

        div.style.width = "640px";
        div.style.height = "640px";
        div.style.backgroundColor = "#000";

        const iframe = document.createElement("iframe");
        iframe.style.width = "640px";
        iframe.style.height = "360px";
        iframe.style.border = "0px";
        iframe.src = `https://www.youtube.com/embed/${id}?rel=0`;

        div.appendChild(upper);
        div.appendChild(iframe);
        div.appendChild(lower);

        const object = new CSS3DObject(div);
        if (top) object.position.set(x, y - 140, z);
        else object.position.set(x, y + 140, z);

        object.rotation.y = ry;

        if (rx != -1) {
            object.rotation.x = rx;
        }

        return object;
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        render();
    }

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        // ctrl.update();
        renderer.render(scene, camera);
    }

    function init() {
        const container = containerRef.current;
        if (!container) return;

        camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 5000);
        camera.position.set(400, 350, 750);
        scene = new THREE.Scene();

        renderer = new CSS3DRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (container.childElementCount === 1) {
            container.removeChild(container.firstChild);
        }
        container.appendChild(renderer.domElement);

        const group = new THREE.Group();
        group.add(Element("CIB48xKA6TY", 0, 0, 320, 0));
        group.add(PoleElement("h8gyn2RylZo", 0, -320, 0, Math.PI, -Math.PI / 2, false));
        group.add(Element("ANVXYnbjnzM", 320, 0, 0, Math.PI / 2));
        group.add(Element("PfbYfyscFIY", 0, 0, -320, Math.PI));
        group.add(PoleElement("sHkAk0g4f7U", 0, 320, 0, -Math.PI, Math.PI / 2, true));
        group.add(Element("p3YQRGDbBjM", -320, 0, 0, -Math.PI / 2));
        scene.add(group);

        controls = new TrackballControls(camera, renderer.domElement);
        controls.rotateSpeed = 4;
        controls.minDistance = 800;
        controls.maxDistance = 4000;
        controls.addEventListener("change", render);
        window.addEventListener("resize", onWindowResize);

        // ctrl = new OrbitControls(camera, renderer.domElement);
        // ctrl.autoRotate = false;
        // ctrl.enablePan = false;
        // ctrl.enableZoom = false;
        // ctrl.enableRotate = true;
        // ctrl.maxPolarAngle = Math.PI / 4;
        // ctrl.minPolarAngle = Math.PI / 4;
        // <OrbitControls
        //     autoRotate
        //     enablePan={false}
        //     enableZoom={false}
        //     maxPolarAngle={Math.PI / 2}
        //     minPolarAngle={Math.PI / 2}
        // />;

        window.addEventListener("resize", onWindowResize);

        // Block iframe events when dragging camera
        const blocker = document.getElementById("blocker");
        if (blocker) {
            blocker.style.display = "none";
            controls.addEventListener("start", function () {
                blocker.style.display = "";
            });
            controls.addEventListener("end", function () {
                blocker.style.display = "none";
            });
            // ctrl.addEventListener("start", function () {
            //     blocker.style.display = "";
            // });
            // ctrl.addEventListener("end", function () {
            //     blocker.style.display = "none";
            // });
        }
    }

    function render() {
        renderer.render(scene, camera);
    }

    useEffect(() => {
        init();
        animate();
        return () => {
            window.removeEventListener("resize", onWindowResize);
        };
    }, []);

    return (
        <div style={{ textAlign: "center" }}>
            <div style={{ display: "inline-block", marginLeft: "auto", marginRight: "auto" }}>
                <Glitch children={"MAKE DEV EASY"} />

                <div style={{ height: "30%", margin: "5px auto" }}>
                    <a type="button" href="https://www.youtube.com/channel/UChFU5sDCF3QNFL456_JegzA/" target="_blank">
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
            <div
                style={{
                    maxWidth: "100%",
                    height: "100%",
                    overflow: "hidden",
                    background: "linear-gradient(rgba(250,0,0,0.5),transparent)",
                    backgroundColor: "grey",
                }}
            >
                <div id="container" ref={containerRef}></div>
                <div id="blocker"></div>
            </div>
        </div>
    );
};

export default LatestVideos;
