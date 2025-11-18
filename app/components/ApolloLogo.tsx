import { FaHospital } from 'react-icons/fa';

export default function ApolloLogo({ width = 120, height = 120 }: { width?: number; height?: number }) {
  const iconSize = Math.floor(width * 0.5);
  const titleSize = Math.floor(width * 0.12);
  const subtitleSize = Math.floor(width * 0.08);

  return (
    <div className="logo-container" style={{ marginBottom: '1.5rem' }}>
      <div 
        className="apollo-logo-icon"
        style={{ 
          width: `${width}px`, 
          height: `${height}px`, 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(59, 130, 246, 0.2))',
          borderRadius: '16px',
          border: '2px solid rgba(16, 185, 129, 0.4)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s ease',
          padding: '1rem',
        }}
      >
        <FaHospital 
          style={{ 
            fontSize: `${iconSize}px`,
            color: '#10b981',
            marginBottom: '0.5rem',
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
            display: 'block',
          }} 
        />
        <span style={{ 
          color: '#10b981', 
          fontSize: `${titleSize}px`,
          fontWeight: '700',
          letterSpacing: '1px',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
          display: 'block',
          lineHeight: '1.2',
        }}>
          APOLLO
        </span>
        <span style={{ 
          color: '#6b7280', 
          fontSize: `${subtitleSize}px`,
          fontWeight: '500',
          letterSpacing: '0.5px',
          marginTop: '0.25rem',
          display: 'block',
          lineHeight: '1.2',
        }}>
          HOSPITALS
        </span>
      </div>
    </div>
  );
}
