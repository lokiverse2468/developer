'use client';

import Link from 'next/link';
import ApolloLogo from './ApolloLogo';

export default function Navigation() {
  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
      padding: '1rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}>
        <ApolloLogo width={50} height={50} />
        <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#10b981' }}>Apollo Hospitals</span>
      </Link>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <Link href="/" style={{ color: '#374151', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#10b981'} onMouseLeave={(e) => e.currentTarget.style.color = '#374151'}>
          Home
        </Link>
        <Link href="/#about" style={{ color: '#374151', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#10b981'} onMouseLeave={(e) => e.currentTarget.style.color = '#374151'}>
          About Us
        </Link>
        <Link href="/#services" style={{ color: '#374151', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#10b981'} onMouseLeave={(e) => e.currentTarget.style.color = '#374151'}>
          Services
        </Link>
        <Link href="/#contact" style={{ color: '#374151', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#10b981'} onMouseLeave={(e) => e.currentTarget.style.color = '#374151'}>
          Contact Us
        </Link>
        <Link 
          href="/appointments" 
          style={{
            backgroundColor: '#10b981',
            color: '#ffffff',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'all 0.2s',
            boxShadow: '0 2px 4px rgba(16, 185, 129, 0.3)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#059669';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(16, 185, 129, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#10b981';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(16, 185, 129, 0.3)';
          }}
        >
          Book Appointment
        </Link>
      </div>
    </nav>
  );
}

