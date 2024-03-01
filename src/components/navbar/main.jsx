// @ts-nocheck
import React from 'react'
import './style.css';

const Navbar = (props) => {
    const handleClick = (e, path) => {
        e.preventDefault();
        props.setState(path);
    }

    return (
        <nav style={{ position: "absolute", top: 0, left: 0, width: "95%", paddingRight: "40px", paddingLeft: "40px" }}>
            <h1> <a href="/">🎓MakeDevEasy</a> </h1>
            <p><a href="mailto:ezeabasilianthony@gmail.com">Suggest a Video Idea</a></p>
            <ul>
                <li><a href="#" onClick={(e) => handleClick(e, "HOME")}>Home</a></li>
                <li><a href="#" onClick={(e) => handleClick(e, "YOUTUBE")}>Latest</a></li>
                <li><a href="#" onClick={(e) => handleClick(e, "ARCHIVE")}>Archive</a></li>
                <li><a href="#" onClick={(e) => handleClick(e, "UPCOMING")} >Upcoming</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
