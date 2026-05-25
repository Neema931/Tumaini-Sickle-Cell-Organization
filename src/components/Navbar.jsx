import { useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "../assets/logo.jpg";
import "./TSCO.css";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="navbar-top">
                <Link to="/" className="logo">
                    <img src={logoImg} alt="TSCO Logo" />
                </Link>
            </div>

            <div className="navbar-bottom">
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/gallery">Gallery</Link></li>
                    <li><Link to="/programs">Programs</Link></li>
                    <li><Link to="/blogs">Blogs</Link></li>
                    <li><Link to="/events">Events</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>

                <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
                    ☰
                </div>
            </div>

            {isOpen && (
                <div className="mobile-menu">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/gallery">Gallery</Link>
                    <Link to="/programs">Programs</Link>
                    <Link to="/blogs">Blogs</Link>
                    <Link to="/events">Events</Link>
                    <Link to="/contact">Contact</Link>
                </div>
            )}
        </nav>
    );
}

export default Navbar;