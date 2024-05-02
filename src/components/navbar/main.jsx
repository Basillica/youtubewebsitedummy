// @ts-nocheck
import React from "react";
import "./style.css";

const Navbar = (props) => {
    const handleClick = (e, path) => {
        e.preventDefault();
        props.setState(path);
    };

    return (
        <nav>
            <ul>
                <li>
                    <a href="#" onClick={(e) => handleClick(e, "HOME")}>
                        🎓
                    </a>
                </li>
                <li>
                    <a href="#" onClick={(e) => handleClick(e, "LATEST")}>
                        Latest
                    </a>
                </li>
                <li>
                    <a href="#" onClick={(e) => handleClick(e, "VIDEOS")}>
                        Videos
                    </a>
                </li>
                <li>
                    <a href="#" onClick={(e) => handleClick(e, "UPCOMING")}>
                        Upcoming
                    </a>
                </li>
                <li>
                    <a href="mailto:ezeabasilianthony@gmail.com?subject=I%20would%20like%20to%20recommend%20a%20fastastic%20topic%20for%20you%20to%20teach%20on%20your%20channel">
                        {" "}
                        Recommend
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
