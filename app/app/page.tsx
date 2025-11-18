import Link from 'next/link';
import ApolloLogo from '@/components/ApolloLogo';

export default function Home() {
  return (
    <div className="container">
      <div className="header">
        <ApolloLogo width={120} height={120} />
        <h1>Appointment Management System</h1>
        <p>Hospital Management System</p>
      </div>
      <div className="card" style={{ textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1rem', color: '#374151' }}>
          Welcome to the Appointment Management System
        </h2>
        <p style={{ marginBottom: '2rem', color: '#6b7280' }}>
          Manage appointments efficiently with our professional-grade system.
        </p>
        <Link href="/appointments" className="btn btn-primary">
          Go to Appointments →
        </Link>
      </div>
    </div>
  );
}

