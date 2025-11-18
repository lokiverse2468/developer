'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

interface NavigationProps {
  hideBookButton?: boolean;
}

export default function Navigation({ hideBookButton = false }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="main-navigation">
      <Link href="/" className="nav-logo" onClick={closeMenu}>
        <span>Apollo Hospitals</span>
      </Link>
      
      <button className="mobile-menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>
      
      <div className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`}>
        <Link href="/" className="nav-link" onClick={closeMenu}>Home</Link>
        <Link href="/#about" className="nav-link" onClick={closeMenu}>About Us</Link>
        <Link href="/#services" className="nav-link" onClick={closeMenu}>Services</Link>
        <Link href="/#contact" className="nav-link" onClick={closeMenu}>Contact Us</Link>
      </div>
      
      {!hideBookButton && (
        <Link href="/appointments" className="nav-button" onClick={closeMenu}>
          Book Appointment
        </Link>
      )}
    </nav>
  );
}

