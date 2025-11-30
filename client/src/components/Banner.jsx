// Ya no necesitamos importar Link porque usaremos un enlace externo normal (<a>)
// import { Link } from 'react-router-dom'; 

function Banner() {
  return (
    <div style={{ 
      background: '#050505', 
      color: '#bbb', 
      textAlign: 'center',
      padding: '8px 0', 
      fontFamily: "'Montserrat', sans-serif",
      fontSize: '0.75rem', 
      letterSpacing: '1px',
      fontWeight: '500',
      borderBottom: '1px solid #d35400', 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '15px',
      position: 'relative',
      zIndex: 100
    }}>
      
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: '#d35400', fontSize: '1.2em' }}>•</span> 
        <strong style={{ color: '#fff', textTransform: 'uppercase' }}>NUEVO:</strong> 
        Realizamos Murales a pedido y Diseño Digital.
      </span>
      
      {/* CAMBIO: Usamos <a> en vez de <Link> para abrir el correo */}
      <a 
        href="mailto:contacto@cristianerre.com?subject=Cotización%20Mural" 
        style={{ 
          color: '#e67e22', 
          textDecoration: 'none', 
          fontWeight: 'bold',
          fontSize: '0.7rem',
          textTransform: 'uppercase',
          border: '1px solid #e67e22',
          padding: '2px 8px',
          borderRadius: '2px',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }}
        onMouseOver={(e) => {
          e.target.style.background = '#e67e22';
          e.target.style.color = 'black';
        }}
        onMouseOut={(e) => {
          e.target.style.background = 'transparent';
          e.target.style.color = '#e67e22';
        }}
      >
        Enviar Correo
      </a>
    </div>
  );
}

export default Banner;