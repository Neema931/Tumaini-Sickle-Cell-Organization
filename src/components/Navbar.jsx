import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdPhone, MdEmail } from "react-icons/md";
import logoImg from "../assets/logo.jpg";
import "./TSCO.css";



function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef(null);
    const handleLinkClick = () => setIsOpen(false);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        const handleScroll = () => {
            setIsOpen(false);
        };

        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("touchstart", handleOutsideClick);
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("touchstart", handleOutsideClick);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav className="navbar" ref={navRef}>
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
                    <li><NavLink end to="/" onClick={handleLinkClick}>Home</NavLink></li>
                    <li><NavLink to="/about" onClick={handleLinkClick}>About</NavLink></li>
                    <li><NavLink to="/programs" onClick={handleLinkClick}>Programs</NavLink></li>
                    <li><NavLink to="/blogs" onClick={handleLinkClick}>Blogs</NavLink></li>
                    <li><NavLink to="/events" onClick={handleLinkClick}>Events</NavLink></li>
                    <li><NavLink to="/gallery" onClick={handleLinkClick}>Gallery</NavLink></li>
                    <li><NavLink to="/contact" onClick={handleLinkClick}>Contact</NavLink></li>
                </ul>

                <div className="navbar-bottom-actions">
                    <div
                        className="navbar-donate-widget"
                        data-aidos-widget-type="donation_button"
                        data-aidos-campaign="camp_01KYMNZKH73WEJ36Q8X90HQZ0C"
                        data-aidos-widget-id="widget_01KYMPGY06B899653A5AQCN9SG"
                    />

                    <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
                        ☰
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="mobile-menu">
                    <NavLink end to="/" onClick={handleLinkClick}>Home</NavLink>
                    <NavLink to="/about" onClick={handleLinkClick}>About</NavLink>
                    <NavLink to="/programs" onClick={handleLinkClick}>Programs</NavLink>
                    <NavLink to="/blogs" onClick={handleLinkClick}>Blogs</NavLink>
                    <NavLink to="/events" onClick={handleLinkClick}>Events</NavLink>
                    <NavLink to="/gallery" onClick={handleLinkClick}>Gallery</NavLink>
                    <NavLink to="/contact" onClick={handleLinkClick}>Contact</NavLink>
                </div>
            )}
        </nav>
    );
}

export default Navbar;