import { useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
      <div className="container">
        <a className="navbar-brand fw-bold text-success" href="#home">
          Kerala Path Tours and Travels
        </a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#home" onClick={() => setIsOpen(false)}>Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#vehicle" onClick={() => setIsOpen(false)}>Vehicles</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#destinations" onClick={() => setIsOpen(false)}>Destinations</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#Gallery" onClick={() => setIsOpen(false)}>Gallery</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#packages" onClick={() => setIsOpen(false)}>Packages</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about" onClick={() => setIsOpen(false)}>About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact" onClick={() => setIsOpen(false)}>Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
