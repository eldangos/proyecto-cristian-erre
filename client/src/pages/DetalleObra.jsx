import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext'; // <--- 1. Importar el hook

function DetalleObra() {
  const { id } = useParams();
  const [obra, setObra] = useState(null);
  const { addToCart } = useCart(); // <--- 2. Sacar la función addToCart del contexto

  useEffect(() => {
    axios.get(`http://localhost:5000/api/obras/${id}`)
      .then(res => setObra(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!obra) return <div style={{ color:'white', textAlign:'center', marginTop:'100px' }}>Cargando obra maestra...</div>;

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#121212', 
      color: '#ffffff',
      fontFamily: "'Montserrat', sans-serif",
      display: 'flex',
      flexDirection: 'column'
    }}>
      
      <div style={{ padding: '20px 40px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#888', fontSize: '0.9rem', letterSpacing: '1px' }}>
           ← VOLVER A LA GALERÍA
        </Link>
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 40px', flexWrap: 'wrap', gap: '60px' }}>
        
        <div style={{ flex: '1 1 500px', maxWidth: '600px', textAlign: 'center' }}>
          <img src={obra.imagenURL} alt={obra.titulo} style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', borderRadius: '4px' }} />
        </div>

        <div style={{ flex: '1 1 400px', maxWidth: '500px' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '700', lineHeight: '1.1', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '-1px' }}>{obra.titulo}</h1>
          <p style={{ fontSize: '2rem', color: '#ccc', marginBottom: '30px', fontWeight: '300' }}>${obra.precio.toLocaleString('es-CL')} CLP</p>
          
          <div style={{ borderTop: '1px solid #333', borderBottom: '1px solid #333', padding: '20px 0', marginBottom: '30px' }}>
            <p style={{ marginBottom: '10px', color: '#888', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px' }}>Detalles Técnicos</p>
            <p><strong>Técnica:</strong> {obra.tecnica || 'Mixta'}</p>
            <p><strong>Dimensiones:</strong> {obra.dimensiones || 'Variable'}</p>
            <p style={{ marginTop: '20px', lineHeight: '1.6', color: '#ddd' }}>{obra.descripcion}</p>
          </div>

          {/* BOTÓN CON FUNCIONALIDAD REAL */}
{obra.disponible ? (
            <button 
              onClick={() => addToCart(obra)}
              className="btn-minimal"
              style={{ width: '100%', padding: '18px', fontSize: '1rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}
            >
              Adquirir Obra
            </button>
          ) : (
            <div style={{ 
              marginTop: '20px', padding: '15px', border: '1px solid #444', 
              color: '#ff4444', textAlign: 'center', letterSpacing: '2px', textTransform: 'uppercase' 
            }}>
              🚫 Esta obra ya ha sido vendida
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default DetalleObra;