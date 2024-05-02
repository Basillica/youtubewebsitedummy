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
    const [link, setLink] = useState("");
    const [video, setVideo] = useState(true);

    const table = [
        ["H", "Hydrogen", "1.00794", 1, 1],
        ["He", "Helium", "4.002602", 18, 1],
        ["Li", "Lithium", "6.941", 1, 2],
        ["Be", "Beryllium", "9.012182", 2, 2],
        ["B", "Boron", "10.811", 13, 2],
        ["C", "Carbon", "12.0107", 14, 2],
        ["N", "Nitrogen", "14.0067", 15, 2],
        ["O", "Oxygen", "15.9994", 16, 2],
        ["F", "Fluorine", "18.9984032", 17, 2],
        ["Ne", "Neon", "20.1797", 18, 2],
        ["Na", "Sodium", "22.98976...", 1, 3],
        ["Mg", "Magnesium", "24.305", 2, 3],
        ["Al", "Aluminium", "26.9815386", 13, 3],
        ["Si", "Silicon", "28.0855", 14, 3],
        ["P", "Phosphorus", "30.973762", 15, 3],
        ["S", "Sulfur", "32.065", 16, 3],
        ["Cl", "Chlorine", "35.453", 17, 3],
        ["Ar", "Argon", "39.948", 18, 3],
        ["K", "Potassium", "39.948", 1, 4],
        ["Ca", "Calcium", "40.078", 2, 4],
        ["Sc", "Scandium", "44.955912", 3, 4],
        ["Ti", "Titanium", "47.867", 4, 4],
        ["V", "Vanadium", "50.9415", 5, 4],
        ["Cr", "Chromium", "51.9961", 6, 4],
        ["Mn", "Manganese", "54.938045", 7, 4],
        ["Fe", "Iron", "55.845", 8, 4],
        ["Co", "Cobalt", "58.933195", 9, 4],
        ["Ni", "Nickel", "58.6934", 10, 4],
        ["Cu", "Copper", "63.546", 11, 4],
        ["Zn", "Zinc", "65.38", 12, 4],
        ["Ga", "Gallium", "69.723", 13, 4],
        ["Ge", "Germanium", "72.63", 14, 4],
        ["As", "Arsenic", "74.9216", 15, 4],
        ["Se", "Selenium", "78.96", 16, 4],
        ["Br", "Bromine", "79.904", 17, 4],
        ["Kr", "Krypton", "83.798", 18, 4],
        ["Rb", "Rubidium", "85.4678", 1, 5],
        ["Sr", "Strontium", "87.62", 2, 5],
        ["Y", "Yttrium", "88.90585", 3, 5],
        ["Zr", "Zirconium", "91.224", 4, 5],
        ["Nb", "Niobium", "92.90628", 5, 5],
        ["Mo", "Molybdenum", "95.96", 6, 5],
        ["Tc", "Technetium", "(98)", 7, 5],
        ["Ru", "Ruthenium", "101.07", 8, 5],
        ["Rh", "Rhodium", "102.9055", 9, 5],
        ["Pd", "Palladium", "106.42", 10, 5],
        ["Ag", "Silver", "107.8682", 11, 5],
        ["Cd", "Cadmium", "112.411", 12, 5],
        ["In", "Indium", "114.818", 13, 5],
        ["Bh", "Bohrium", "(272)", 7, 7],
        ["Hs", "Hassium", "(270)", 8, 7],
        ["Mt", "Meitnerium", "(276)", 9, 7],
        ["Ds", "Darmstadium", "(281)", 10, 7],
        ["Rg", "Roentgenium", "(280)", 11, 7],
        ["Cn", "Copernicium", "(285)", 12, 7],
        ["Nh", "Nihonium", "(286)", 13, 7],
        ["Fl", "Flerovium", "(289)", 14, 7],
        ["Mc", "Moscovium", "(290)", 15, 7],
        ["Lv", "Livermorium", "(293)", 16, 7],
        ["Ts", "Tennessine", "(294)", 17, 7],
        ["Og", "Oganesson", "(294)", 18, 7],
    ];

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

        // table
        for (let i = 0; i < VIDEOS.length; i++) {
            // ["H", "Hydrogen", "1.00794", 1, 1],
            // ["28th", "qMxbHdjxcmk", "S", 28],
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
            // object.position.y = -Number(VIDEOS[i][4]) * 180 + 990;

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
