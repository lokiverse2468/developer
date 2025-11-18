import Link from 'next/link';

interface NavigationProps {
  hideBookButton?: boolean;
}

export default function Navigation({ hideBookButton = false }: NavigationProps) {
  return (
    <nav className="main-navigation">
      <Link href="/" className="nav-logo">
        <span>Apollo Hospitals</span>
      </Link>
      
      <div className="nav-links">
        <Link href="/" className="nav-link">Home</Link>
        <Link href="/#about" className="nav-link">About Us</Link>
        <Link href="/#services" className="nav-link">Services</Link>
        <Link href="/#contact" className="nav-link">Contact Us</Link>
      </div>
      
      {!hideBookButton && (
        <Link href="/appointments" className="nav-button">
          Book Appointment
        </Link>
      )}
    </nav>
  );
}

