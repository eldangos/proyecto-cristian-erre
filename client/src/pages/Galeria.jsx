import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Galeria() {
  const [obras, setObras] = useState([]);

  useEffect(() => {
    // Truco: Agregamos un timestamp (?t=...) para evitar que el navegador guarde caché vieja
    axios.get('http://localhost:5000/api/obras?t=' + Date.now())
      .then(res => setObras(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#121212', color: 'white', fontFamily: "'Montserrat', sans-serif" }}>
      
      <header style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '10px' }}>Cristian Erré</h1>
        <p style={{ color: '#666', fontSize: '1.2rem', letterSpacing: '2px' }}>VISUAL ARTIST • PORTFOLIO</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '40px', maxWidth: '1400px', margin: '0 auto', padding: '0 40px 100px 40px' }}>
        
        {obras.map(obra => (
          <div key={obra._id} style={{ position: 'relative' }}> {/* Position Relative necesario para el cartel */}
            
            <Link to={`/obra/${obra._id}`} style={{ textDecoration: 'none', color: 'white', pointerEvents: obra.disponible ? 'auto' : 'none' }}>
              <div style={{ cursor: obra.disponible ? 'pointer' : 'default', opacity: obra.disponible ? 1 : 0.6 }}>
                
                <div style={{ overflow: 'hidden', marginBottom: '20px', position: 'relative' }}>
                  <img 
                    src={obra.imagenURL} 
                    alt={obra.titulo} 
                    style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', transition: 'transform 0.5s ease', filter: obra.disponible ? 'grayscale(20%)' : 'grayscale(100%)' }}
                    onMouseOver={(e) => obra.disponible && (e.currentTarget.style.transform = 'scale(1.03)')}
                    onMouseOut={(e) => obra.disponible && (e.currentTarget.style.transform = 'scale(1)')}
                  />

                  {/* CARTEL DE VENDIDO (Solo aparece si disponible es false) */}
                  {!obra.disponible && (
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%) rotate(-10deg)',
                      border: '2px solid white',
                      padding: '10px 20px',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      letterSpacing: '4px',
                      background: 'rgba(0,0,0,0.6)',
                      color: '#ff4444' // Rojo pálido elegante
                    }}>
                      VENDIDO
                    </div>
                  )}
                </div>

                <h3 style={{ fontSize: '1.4rem', fontWeight: '400', marginBottom: '5px' }}>{obra.titulo}</h3>
                <p style={{ color: '#888', fontSize: '0.9rem' }}>
                  {obra.disponible ? `$${obra.precio.toLocaleString('es-CL')}` : 'NO DISPONIBLE'}
                </p>
              </div>
            </Link>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Galeria;