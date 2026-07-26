import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdPhone, MdEmail } from "react-icons/md";
import logoImg from "../assets/logo.jpg";
import "./TSCO.css";



function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const handleLinkClick = () => setIsOpen(false);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <nav className="navbar">
            <div className="navbar-top">
                <Link to="/" className="logo">
                    <img src={logoImg} alt="TSCO Logo" />
                </Link>

                    <div className="top-cta">
                        <a className="call-link" href="tel:0715873713">
                            <MdPhone className="call-icon" />
                            <span className="call-number">0715873713</span>
                        </a>

                        <a className="email-link" href="mailto:info@tumainisicklecell.org">
                            <MdEmail className="email-icon" />
                            <span className="email-text">info@tumainisicklecell.org</span>
                        </a>
                    </div>
            </div>

            <div className="navbar-bottom">
                <ul className="nav-links">
                    <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
                    <li><Link to="/about" onClick={handleLinkClick}>About</Link></li>
                    <li><Link to="/gallery" onClick={handleLinkClick}>Gallery</Link></li>
                    <li><Link to="/programs" onClick={handleLinkClick}>Programs</Link></li>
                    <li><Link to="/blogs" onClick={handleLinkClick}>Blogs</Link></li>
                    <li><Link to="/events" onClick={handleLinkClick}>Events</Link></li>
                    <li><Link to="/contact" onClick={handleLinkClick}>Contact</Link></li>
                </ul>

                <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
                    ☰
                </div>
            </div>

            {isOpen && (
                <div className="mobile-menu">
                    <Link to="/" onClick={handleLinkClick}>Home</Link>
                    <Link to="/about" onClick={handleLinkClick}>About</Link>
                    <Link to="/gallery" onClick={handleLinkClick}>Gallery</Link>
                    <Link to="/programs" onClick={handleLinkClick}>Programs</Link>
                    <Link to="/blogs" onClick={handleLinkClick}>Blogs</Link>
                    <Link to="/events" onClick={handleLinkClick}>Events</Link>
                    <Link to="/contact" onClick={handleLinkClick}>Contact</Link>
                </div>
            )}
        </nav>
    );
}

export default Navbar;