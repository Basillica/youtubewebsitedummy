import './style.css';

const Navbar = () => {
    return (
        <nav style={{ position: "absolute", top: 0, left: 0, width: "95%", paddingRight: "40px", paddingLeft: "40px" }}>
            <h1> <a href="/">🎓MakeDevEasy</a> </h1>
            <p><a href="mailto:ezeabasilianthony@gmail.com">Suggest a Video Idea</a></p>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="youtube">Latest</a></li>
                <li><a href="archive">Archive</a></li>
                <li><a href="projects">Upcoming</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
