import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Galeria() {
  const [obras, setObras] = useState([]);
  const [filtro, setFiltro] = useState('disponibles'); // Estado para el filtro: 'disponibles', 'vendidas', 'borradas', 'todas'

  useEffect(() => {
    axios.get('http://localhost:5000/api/obras?t=' + Date.now())
      .then(res => setObras(res.data))
      .catch(err => console.error(err));
  }, []);

  // LÓGICA DE FILTRADO
  const obrasFiltradas = obras.filter(obra => {
    if (filtro === 'disponibles') return !obra.eliminada && obra.disponible;
    if (filtro === 'vendidas') return !obra.eliminada && !obra.disponible;
    if (filtro === 'borradas') return obra.eliminada; // Aquí mostramos las eliminadas
    return true; // 'todas'
  });

  return (
    <div style={{ minHeight: '100vh', background: '#121212', color: 'white', fontFamily: "'Montserrat', sans-serif" }}>
      
      <header style={{ padding: '60px 20px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '10px' }}>Cristian Erré</h1>
        <p style={{ color: '#666', fontSize: '1.2rem', letterSpacing: '2px' }}>VISUAL ARTIST • PORTFOLIO</p>
      </header>

      {/* BOTONES DE FILTRO (Requerimiento del Profesor) */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '40px', flexWrap: 'wrap' }}>
        <button onClick={() => setFiltro('disponibles')} style={getEstiloBoton(filtro === 'disponibles')}>DISPONIBLES</button>
        <button onClick={() => setFiltro('vendidas')} style={getEstiloBoton(filtro === 'vendidas')}>VENDIDAS</button>
        <button onClick={() => setFiltro('borradas')} style={getEstiloBoton(filtro === 'borradas')}>PAPELERA / BORRADAS</button>
        <button onClick={() => setFiltro('todas')} style={getEstiloBoton(filtro === 'todas')}>VER TODO</button>
      </div>

      {/* GRILLA DE OBRAS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '40px', maxWidth: '1400px', margin: '0 auto', padding: '0 40px 100px 40px' }}>
        
        {obrasFiltradas.length === 0 && (
          <p style={{ textAlign: 'center', width: '100%', gridColumn: '1 / -1', color: '#666' }}>No hay obras en esta categoría.</p>
        )}

        {obrasFiltradas.map(obra => (
          <div key={obra._id} style={{ position: 'relative', opacity: obra.eliminada ? 0.5 : 1 }}>
            
            <Link to={obra.eliminada ? '#' : `/obra/${obra._id}`} style={{ textDecoration: 'none', color: 'white', cursor: obra.eliminada ? 'not-allowed' : 'pointer' }}>
              <div>
                <div style={{ overflow: 'hidden', marginBottom: '20px', position: 'relative' }}>
                  <img 
                    src={obra.imagenURL} 
                    alt={obra.titulo} 
                    style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', filter: (!obra.disponible || obra.eliminada) ? 'grayscale(100%)' : 'grayscale(0%)' }}
                  />

                  {/* ETIQUETA VENDIDO */}
                  {!obra.eliminada && !obra.disponible && (
                    <div style={etiquetaStyle}>VENDIDO</div>
                  )}

                  {/* ETIQUETA ELIMINADO (REQUERIMIENTO) */}
                  {obra.eliminada && (
                    <div style={{ ...etiquetaStyle, borderColor: 'red', color: 'red' }}>
                      ELIMINADO
                      <span style={{ display: 'block', fontSize: '0.6rem', color: 'white', marginTop: '5px', background: 'black', padding: '2px' }}>
                        Motivo: {obra.motivoEliminacion}
                      </span>
                    </div>
                  )}
                </div>

                <h3 style={{ fontSize: '1.4rem', fontWeight: '400', marginBottom: '5px' }}>{obra.titulo}</h3>
                <p style={{ color: '#888', fontSize: '0.9rem' }}>
                  {obra.eliminada ? 'ARCHIVADO' : (obra.disponible ? `$${obra.precio.toLocaleString('es-CL')}` : 'NO DISPONIBLE')}
                </p>
              </div>
            </Link>

          </div>
        ))}

      </div>
    </div>
  );
}

// Estilos auxiliares
const etiquetaStyle = {
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
  color: '#ff4444',
  textAlign: 'center'
};

const getEstiloBoton = (activo) => ({
  padding: '10px 20px',
  background: activo ? 'white' : 'transparent',
  color: activo ? 'black' : 'white',
  border: '1px solid white',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '0.8rem',
  transition: '0.3s'
});

export default Galeria;