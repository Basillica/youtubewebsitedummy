// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { TrackballControls } from "three/addons/controls/TrackballControls.js";
import { CSS3DRenderer, CSS3DObject } from "three/addons/renderers/CSS3DRenderer.js";
import TWEEN from "@tweenjs/tween.js";
import "./styles.css";

const Videos = () => {
    const rendererRef = useRef(null);
    const containerRef = useRef(null);
    const controlsRef = useRef(null);
    const [link, setLink] = useState("lggZXEoueFM");
    const [video, setVideo] = useState(true);

    const VIDEOS = [
        ["1st", "h8gyn2RylZo", "V", 1],
        ["2nd", "T5ifBc9R8A0", "V", 2],
        ["3rd", "OcaerPp59Gs", "V", 3],
        ["4th", "dCwhX-i8qT8", "V", 4],
        ["5th", "wQhgtUYz_Z0", "V", 5],
        ["6th", "7zuU1Ui-IM4", "V", 6],
        ["7th", "gmz2qe3X4dM", "V", 7],
        ["8th", "t4ZfoV5Ns5U", "V", 8],
        ["9th", "MbfS0V90zEE", "V", 9],
        ["10th", "DPvPduvdRS0", "V", 10],
        ["11th", "dFQa06cK7xE", "V", 11],
        ["12th", "oslAAQdGTCk", "V", 12],
        ["13th", "yT7Kgfalj1o", "V", 13],
        ["14th", "sHkAk0g4f7U", "V", 14],
        ["15th", "WJ4LDq4Zt8E", "V", 15],
        ["16th", "mv_YElHqCXE", "V", 16],
        ["17th", "zgtNpm1PDtY", "V", 17],
        ["18th", "BtcadKxMm5Y", "V", 18],
        ["19th", "lggZXEoueFM", "V", 19],
        ["20th", "Cjtokv4cG6I", "V", 20],
        ["21st", "C1hUZsEUc0E", "V", 21],
        ["22nd", "kRPpZgpLlUk", "V", 22],
        ["23nd", "MupnNsRm95k", "S", 23],
        ["24th", "AVdRIpaUjuk", "S", 24],
        ["25th", "mYFBph5UqKo", "S", 25],
        ["26th", "NiKGwh-5FVE", "S", 26],
        ["27th", "Mza07BPduTE", "S", 27],
        ["28th", "qMxbHdjxcmk", "S", 28],
        ["29th", "p3YQRGDbBjM", "V", 28],
        ["30th", "CIB48xKA6TY", "V", 28],
        ["31th", "h8gyn2RylZo", "V", 28],
        ["32nd", "eh-CqDuF-JU", "S", 28],
        ["33rd", "3v8OdiNmLKI", "S", 28],
        ["34th", "m-wb7jx8WfQ", "S", 28],
        ["35th", "ANVXYnbjnzM", "V", 28],
        ["36th", "PfbYfyscFIY", "V", 28],
        ["37th", "9MQULlRFJR8", "V", 28],
        ["38th", "-TVCEwxfOnI", "s", 28],
    ];

    let camera, scene, renderer, controls;

    const objects = [];
    const targets = {
        table: [],
        helix: [],
    };

    function init() {
        const container = containerRef.current;
        if (!container) return;
        rendererRef.current = renderer;
        controlsRef.current = controls;

        camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.z = 3000;
        scene = new THREE.Scene();

        for (let i = 0; i < VIDEOS.length; i++) {
            const element = document.createElement("div");
            element.className = "element";
            element.style.backgroundColor = "rgba(0,127,127," + (Math.random() * 0.5 + 0.5) + ")";
            element.addEventListener("mouseover", function () {
                setLink(VIDEOS[i][1]);
                setVideo(VIDEOS[i][2] === "V");
            });

            const number = document.createElement("div");
            number.className = "number";
            number.textContent = `${i + 1}`;
            element.appendChild(number);

            const symbol = document.createElement("div");
            symbol.className = "symbol";
            symbol.textContent = `${VIDEOS[i][0]}`;
            element.appendChild(symbol);

            const details = document.createElement("div");
            details.className = "details";
            details.innerHTML = VIDEOS[i][1] + "<br>" + VIDEOS[i][2];
            element.appendChild(details);

            const objectCSS = new CSS3DObject(element);
            objectCSS.position.x = Math.random() * 4000 - 2000;
            objectCSS.position.y = Math.random() * 4000 - 2000;
            objectCSS.position.z = Math.random() * 4000 - 2000;
            scene.add(objectCSS);
            objects.push(objectCSS);
            //
            const object = new THREE.Object3D();
            object.position.x = Number(VIDEOS[i][3]) * 140 - 1330;
            targets.table.push(object);
        }

        // helix
        const vectorH = new THREE.Vector3();
        for (let i = 0, l = objects.length; i < l; i++) {
            const theta = i * 0.175 + Math.PI;
            const y = -(i * 8) + 450;
            const object = new THREE.Object3D();
            object.position.setFromCylindricalCoords(900, theta, y);
            vectorH.x = object.position.x * 2;
            vectorH.y = object.position.y;
            vectorH.z = object.position.z * 2;
            object.lookAt(vectorH);
            targets.helix.push(object);
        }

        renderer = new CSS3DRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (container.childElementCount === 1) {
            container.removeChild(container.firstChild);
        }
        container.appendChild(renderer.domElement);

        controls = new TrackballControls(camera, renderer.domElement);
        controls.minDistance = 500;
        controls.maxDistance = 6000;
        controls.addEventListener("change", render);
        window.addEventListener("resize", onWindowResize);
    }

    useEffect(() => {
        init();
        animate();
        onHelix();
    }, []);

    function transform(targets, duration) {
        TWEEN.removeAll();
        new TWEEN.Tween({})
            .to({}, duration * 2)
            .onUpdate(render)
            .start();

        for (let i = 0; i < objects.length; i++) {
            const object = objects[i];
            const target = targets[i];
            new TWEEN.Tween(object.position)
                .to(
                    { x: target.position.x, y: target.position.y, z: target.position.z },
                    Math.random() * duration + duration
                )
                .easing(TWEEN.Easing.Exponential.InOut)
                .start();

            new TWEEN.Tween(object.rotation)
                .to(
                    { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z },
                    Math.random() * duration + duration
                )
                .easing(TWEEN.Easing.Exponential.InOut)
                .start();
        }
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        render();
    }

    function animate() {
        requestAnimationFrame(animate);
        TWEEN.update();
        controls.update();
    }

    function render() {
        renderer.render(scene, camera);
    }

    const onHelix = () => {
        transform(targets.helix, 2000);
    };

    return (
        <div style={{ textAlign: "center" }}>
            <div id="container" ref={containerRef}></div>
            <div id="menu">
                <p style={{ fontSize: "10px", color: "green" }}> Click any tile above, drag around and pinch</p>
                <button id="table" onClick={() => console.log()} style={{ background: "grey", borderRadius: "20px" }}>
                    <a
                        type="button"
                        href={video ? `https://youtu.be/${link}` : `https://youtube.com/shorts/${link}?feature=share`}
                        target="_blank"
                        style={{ textDecoration: "none", fontSize: "10px" }}
                    >
                        {link}
                    </a>
                </button>
            </div>
        </div>
    );
};

export default Videos;
