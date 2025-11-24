import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AdminObras() {
  const [obras, setObras] = useState([]);
  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    tecnica: '',
    precio: '',
    imagenURL: ''
  });

  // Cargar obras al inicio
  useEffect(() => {
    obtenerObras();
  }, []);

  const obtenerObras = async () => {
    try {
      // Agregamos un timestamp para asegurar que traiga datos frescos
      const respuesta = await axios.get('http://localhost:5000/api/obras?t=' + Date.now());
      setObras(respuesta.data);
    } catch (error) {
      console.error("Error cargando obras:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/obras', form);
      alert('¡Obra guardada con éxito!');
      setForm({ titulo: '', descripcion: '', tecnica: '', precio: '', imagenURL: '' }); 
      obtenerObras(); 
    } catch (error) {
      alert('Error al guardar');
    }
  };

  const eliminarObra = async (id) => {
    if(!confirm('¿Seguro que quieres eliminar esta obra?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/obras/${id}`);
      obtenerObras();
    } catch (error) {
      console.error(error);
    }
  };

  // --- 1. AQUÍ ESTÁ LA NUEVA FUNCIÓN (LA LÓGICA) ---
  const reactivarObra = async (id) => {
    try {
      // Enviamos "disponible: true" al servidor
      await axios.put(`http://localhost:5000/api/obras/${id}`, { disponible: true });
      alert("¡Obra disponible de nuevo!");
      obtenerObras(); // Recargamos la lista para ver el cambio inmediato
    } catch (error) {
      console.error(error);
      alert("Error al reactivar");
    }
  };
  // ------------------------------------------------

  return (
    <div style={{ padding: '40px', fontFamily: "'Montserrat', sans-serif", color: 'white', maxWidth: '1200px', margin: '0 auto' }}>
      
      <div style={{ borderBottom: '1px solid #333', paddingBottom: '20px', marginBottom: '30px' }}>
        <h1 style={{ marginBottom: '20px' }}>Panel de Administración</h1>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button style={{ padding: '10px 20px', background: 'white', color: 'black', fontWeight: 'bold', border: 'none', cursor: 'default' }}>
            🎨 GESTIONAR OBRAS
          </button>
          <Link to="/admin/pedidos" style={{ padding: '10px 20px', background: '#333', color: 'white', textDecoration: 'none', fontWeight: 'bold', borderRadius: '4px' }}>
            📦 VER PEDIDOS
          </Link>
        </div>
      </div>
      
      {/* FORMULARIO */}
      <div style={{ border: '1px solid #333', padding: '30px', marginBottom: '50px', borderRadius: '8px', background: '#1e1e1e' }}>
        <h2 style={{ marginBottom: '20px', color: '#ccc' }}>Subir Nueva Obra</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px' }}>
          <input name="titulo" placeholder="Título de la obra" value={form.titulo} onChange={handleChange} required style={inputStyle} />
          <textarea name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} required style={{...inputStyle, height: '100px'}} />
          <input name="tecnica" placeholder="Técnica (ej: Óleo)" value={form.tecnica} onChange={handleChange} style={inputStyle} />
          <input name="precio" type="number" placeholder="Precio (CLP)" value={form.precio} onChange={handleChange} style={inputStyle} />
          <input name="imagenURL" placeholder="URL de la imagen (Link)" value={form.imagenURL} onChange={handleChange} required style={inputStyle} />
          <button type="submit" className="btn-minimal" style={{ padding: '15px', background: 'black', border: '1px solid white', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>
            GUARDAR OBRA
          </button>
        </form>
      </div>

      {/* LISTA DE OBRAS */}
      <h2 style={{ marginBottom: '20px' }}>Inventario Actual</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {obras.map(obra => (
          <div key={obra._id} style={{ border: '1px solid #333', padding: '10px', background: '#1e1e1e', position: 'relative' }}>
            
            {/* ETIQUETA ROJA SI ESTÁ VENDIDO */}
            {!obra.disponible && (
              <div style={{ position: 'absolute', top: 0, right: 0, background: 'red', color: 'white', padding: '2px 8px', fontSize: '0.8rem', fontWeight: 'bold', zIndex: 10 }}>
                VENDIDO
              </div>
            )}

            {/* Imagen un poco transparente si está vendida */}
            <img src={obra.imagenURL} alt={obra.titulo} style={{ width: '100%', height: '150px', objectFit: 'cover', marginBottom: '10px', opacity: obra.disponible ? 1 : 0.5 }} />
            
            <h3 style={{ fontSize: '1rem', margin: '0 0 5px' }}>{obra.titulo}</h3>
            <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '10px' }}>${obra.precio}</p>
            
            <div style={{ display: 'flex', gap: '5px' }}>
              <button onClick={() => eliminarObra(obra._id)} style={{ flex: 1, background: '#333', color: 'white', border: 'none', padding: '5px', cursor: 'pointer' }}>
                BORRAR
              </button>

              {/* --- 2. AQUÍ ESTÁ EL BOTÓN NUEVO (LA INTERFAZ) --- */}
              {/* Esta lógica dice: "Si la obra NO (!) está disponible, muestra este botón" */}
              {!obra.disponible && (
                <button 
                  onClick={() => reactivarObra(obra._id)} 
                  style={{ flex: 1, background: '#4caf50', color: 'white', border: 'none', padding: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                  title="Volver a poner en venta"
                >
                  REACTIVAR
                </button>
              )}
              {/* ------------------------------------------------ */}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputStyle = {
  padding: '10px',
  background: '#121212',
  border: '1px solid #555',
  color: 'white',
  borderRadius: '4px',
  fontFamily: 'inherit'
};

export default AdminObras;