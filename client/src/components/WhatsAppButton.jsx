import React from 'react';

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/56982788848?text=Hola%20Cristian,%20vengo%20de%20tu%20web%20y%20me%20interesa%20una%20obra."
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        background: '#25D366',
        color: 'white',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
        zIndex: 1000,
        textDecoration: 'none',
        fontSize: '30px',
        transition: 'transform 0.3s',
        border: '2px solid white'
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      title="Chat en WhatsApp"
    >
      💬
    </a>
  );
};

export default WhatsAppButton;