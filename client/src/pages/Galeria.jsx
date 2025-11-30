import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Galeria() {
  const [obras, setObras] = useState([]);
  const [categoria, setCategoria] = useState('Todas'); // Estado para el filtro

  useEffect(() => {
    // Cargar obras del servidor
    axios.get('http://localhost:5000/api/obras?t=' + Date.now())
      .then(res => setObras(res.data))
      .catch(err => console.error(err));
  }, []);

  // LÓGICA DE FILTRADO
  const obrasFiltradas = obras.filter(obra => {
    // 1. Ocultar las eliminadas (Papelera)
    if (obra.eliminada) return false;

    // 2. Filtrar por Categoría
    if (categoria === 'Todas') return true;
    return obra.categoria === categoria;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#121212', color: 'white', fontFamily: "'Montserrat', sans-serif" }}>
      
      {/* --- PORTADA HERO --- */}
      <header style={{ 
        height: '50vh', 
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center',
        background: `linear-gradient(to bottom, rgba(18,18,18,0.4), rgba(18,18,18,1)), url('https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        backgroundSize: 'cover', backgroundPosition: 'center', marginBottom: '40px'
      }}>
        <h1 style={{ fontSize: '4rem', letterSpacing: '10px', textTransform: 'uppercase', margin: 0, textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
          Cristian Erré
        </h1>
        <p style={{ color: '#ddd', fontSize: '1.2rem', letterSpacing: '4px', marginTop: '15px', fontWeight: '300' }}>
          COLECCIÓN OFICIAL
        </p>
      </header>

      {/* --- BOTONES DE CATEGORÍA (NUEVO) --- */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '50px', flexWrap: 'wrap', padding: '0 20px' }}>
        <button onClick={() => setCategoria('Todas')} style={getEstiloBoton(categoria === 'Todas')}>TODAS</button>
        <button onClick={() => setCategoria('Cuadros Grandes')} style={getEstiloBoton(categoria === 'Cuadros Grandes')}>GRANDES</button>
        <button onClick={() => setCategoria('Mini Cuadros')} style={getEstiloBoton(categoria === 'Mini Cuadros')}>MINI CUADROS</button>
        <button onClick={() => setCategoria('Dibujos sobre Cuadros')} style={getEstiloBoton(categoria === 'Dibujos sobre Cuadros')}>DIBUJOS</button>
        <button onClick={() => setCategoria('Murales')} style={getEstiloBoton(categoria === 'Murales')}>MURALES</button>
      </div>

      {/* --- GRILLA DE OBRAS --- */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '60px', maxWidth: '1400px', margin: '0 auto', padding: '0 40px 100px 40px' }}>
        
        {obrasFiltradas.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px', color: '#666' }}>
            <p style={{ fontSize: '1.5rem' }}>No hay obras en esta categoría por el momento.</p>
          </div>
        )}

        {obrasFiltradas.map(obra => (
          <div key={obra._id} style={{ position: 'relative' }}>
            
            <Link to={`/obra/${obra._id}`} style={{ textDecoration: 'none', color: 'white' }}>
              <div style={{ transition: 'transform 0.3s' }} onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-10px)')} onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}>
                
                {/* Imagen */}
                <div style={{ overflow: 'hidden', marginBottom: '20px', position: 'relative', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', borderRadius: '2px' }}>
                  
                  {/* Etiqueta de Categoría Flotante */}
                  <span style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(0,0,0,0.6)', padding: '4px 8px', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '1px', backdropFilter: 'blur(4px)' }}>
                    {obra.categoria}
                  </span>

                  <img 
                    src={obra.imagenURL} 
                    alt={obra.titulo} 
                    style={{ 
                      width: '100%', aspectRatio: '4/5', objectFit: 'cover', 
                      filter: obra.disponible ? 'grayscale(0%)' : 'grayscale(100%)' 
                    }} 
                  />

                  {!obra.disponible && (
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', border: '1px solid white', padding: '10px 20px', fontSize: '1.2rem', letterSpacing: '4px', background: 'rgba(0,0,0,0.8)' }}>
                      VENDIDO
                    </div>
                  )}
                </div>

                {/* Info */}
                <h3 style={{ fontSize: '1.3rem', fontWeight: '400', marginBottom: '5px', letterSpacing: '1px' }}>{obra.titulo}</h3>
                <p style={{ color: '#888', fontSize: '0.8rem', marginBottom: '5px' }}>{obra.dimensiones}</p>
                <p style={{ color: 'white', fontSize: '1.1rem' }}>${obra.precio.toLocaleString('es-CL')}</p>
              
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

// Estilos de los botones de filtro
const getEstiloBoton = (activo) => ({
  padding: '10px 25px',
  background: activo ? 'white' : 'transparent',
  color: activo ? 'black' : '#888',
  border: activo ? '1px solid white' : '1px solid #444',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '0.75rem',
  letterSpacing: '2px',
  borderRadius: '50px',
  transition: 'all 0.3s ease',
  textTransform: 'uppercase'
});

export default Galeria;