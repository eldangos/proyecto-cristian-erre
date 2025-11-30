import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AdminObras() {
  const [obras, setObras] = useState([]);
  const [modoPapelera, setModoPapelera] = useState(false);
  
  // ESTADO DEL FORMULARIO (Incluye los nuevos campos del catálogo)
  const [form, setForm] = useState({ 
    titulo: '', 
    descripcion: '', 
    tecnica: '', 
    dimensiones: '', // <--- CAMPO NUEVO (Tamaño)
    precio: '', 
    imagenURL: '',
    categoria: 'Cuadros Grandes' // <--- CAMPO NUEVO (Categoría)
  });

  useEffect(() => { obtenerObras(); }, []);

  const obtenerObras = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/obras?t=' + Date.now());
      setObras(res.data);
    } catch (error) { console.error(error); }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // GUARDAR OBRA
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/obras', form);
      alert('¡Obra publicada en el catálogo!');
      // Limpiamos el formulario completo
      setForm({ 
        titulo: '', descripcion: '', tecnica: '', dimensiones: '', 
        precio: '', imagenURL: '', categoria: 'Cuadros Grandes' 
      });
      obtenerObras();
    } catch (error) { alert('Error al guardar'); }
  };

  // FUNCIONES DE BORRADO / RESTAURACIÓN
  const enviarAPapelera = async (id) => {
    const motivo = prompt("Motivo de eliminación:");
    if (!motivo) return;
    try {
      await axios.put(`http://localhost:5000/api/obras/eliminar/${id}`, { motivo });
      obtenerObras();
    } catch (error) { alert("Error"); }
  };

  const restaurarObra = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/obras/${id}`, { disponible: true, eliminada: false });
      alert("Obra restaurada.");
      obtenerObras();
    } catch (error) { alert("Error"); }
  };

  const eliminarDefinitivo = async (id) => {
    if (!confirm("⚠️ ¿ESTÁS SEGURO? Se borrará para siempre.")) return;
    try {
      await axios.delete(`http://localhost:5000/api/obras/definitivo/${id}`);
      obtenerObras();
    } catch (error) { alert("Error"); }
  };

  // MÉTRICAS
  const totalVendido = obras.filter(o => !o.disponible && !o.eliminada).reduce((acc, curr) => acc + curr.precio, 0);
  const stockDisponible = obras.filter(o => o.disponible && !o.eliminada).length;
  const obrasVisibles = obras.filter(o => modoPapelera ? o.eliminada : !o.eliminada);

  return (
    <div style={{ padding: '40px', fontFamily: "'Montserrat', sans-serif", color: 'white', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* HEADER */}
      <div style={{ borderBottom: '1px solid #333', paddingBottom: '20px', marginBottom: '30px' }}>
        <h1 style={{ marginBottom: '10px' }}>Gestión de Catálogo</h1>
        
        {!modoPapelera && (
          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', fontSize: '0.9rem', color: '#aaa' }}>
            <span>💰 Ventas: <strong style={{ color: '#4caf50' }}>${totalVendido.toLocaleString('es-CL')}</strong></span>
            <span>🖼️ En Venta: <strong style={{ color: 'white' }}>{stockDisponible}</strong></span>
          </div>
        )}

        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <button onClick={() => setModoPapelera(false)} style={{ padding: '10px 20px', background: !modoPapelera ? 'white' : 'transparent', color: !modoPapelera ? 'black' : 'white', border: '1px solid white', cursor: 'pointer', fontWeight: 'bold' }}>📂 INVENTARIO</button>
          <button onClick={() => setModoPapelera(true)} style={{ padding: '10px 20px', background: modoPapelera ? '#ff4444' : 'transparent', color: modoPapelera ? 'white' : '#ff4444', border: '1px solid #ff4444', cursor: 'pointer', fontWeight: 'bold' }}>🗑️ PAPELERA</button>
          <Link to="/admin/pedidos" style={{ padding: '10px 20px', background: '#333', color: 'white', textDecoration: 'none', fontWeight: 'bold', borderRadius: '4px', marginLeft: 'auto' }}>📦 PEDIDOS</Link>
        </div>
      </div>
      
      {/* FORMULARIO DE CARGA (Basado en el PDF) */}
      {!modoPapelera && (
        <div style={{ border: '1px solid #333', padding: '30px', marginBottom: '50px', borderRadius: '8px', background: '#1e1e1e' }}>
          <h2 style={{ marginBottom: '20px', color: '#e67e22' }}>+ Nueva Ficha Técnica</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{ flex: 2 }}>
                <label style={labelStyle}>Título de la Obra</label>
                <input name="titulo" placeholder="Ej: Morchella espatula rosada" value={form.titulo} onChange={handleChange} required style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Valor (CLP)</label>
                <input name="precio" type="number" placeholder="Ej: 45000" value={form.precio} onChange={handleChange} style={inputStyle} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Categoría</label>
                <select name="categoria" value={form.categoria} onChange={handleChange} style={{...inputStyle, cursor:'pointer'}}>
                  <option value="Cuadros Grandes">Cuadros Grandes</option>
                  <option value="Mini Cuadros">Mini Cuadros</option>
                  <option value="Dibujos sobre Cuadros">Dibujos sobre Cuadros</option>
                  <option value="Murales">Murales</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Dimensiones (Alto x Ancho)</label>
                <input name="dimensiones" placeholder="Ej: 25 x 20 cm" value={form.dimensiones} onChange={handleChange} style={inputStyle} />
              </div>
            </div>

            <label style={labelStyle}>URL de la Fotografía</label>
            <input name="imagenURL" placeholder="https://..." value={form.imagenURL} onChange={handleChange} required style={inputStyle} />

            <label style={labelStyle}>Técnica / Materiales</label>
            <input name="tecnica" placeholder="Ej: Ilustración a mano con tinta acrílica sobre papel 300g" value={form.tecnica} onChange={handleChange} style={inputStyle} />

            <label style={labelStyle}>Historia / Descripción</label>
            <textarea name="descripcion" placeholder="Ej: Hice florecer este funji raro que le brota..." value={form.descripcion} onChange={handleChange} required style={{...inputStyle, height: '80px'}} />

            <button type="submit" style={{ padding: '15px', background: 'white', color: 'black', border: 'none', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px', textTransform: 'uppercase' }}>
              Publicar en Galería
            </button>
          </form>
        </div>
      )}

      {/* LISTADO */}
      <h2 style={{ marginBottom: '20px' }}>{modoPapelera ? '🗑️ Papelera' : '🎨 Catálogo Actual'}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {obrasVisibles.map(obra => (
          <div key={obra._id} style={{ border: '1px solid #333', padding: '15px', background: '#1e1e1e', borderRadius: '8px', position: 'relative' }}>
            
            {/* Etiquetas */}
            <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(0,0,0,0.7)', padding: '2px 8px', fontSize: '0.6rem', borderRadius: '4px', border: '1px solid #555' }}>
              {obra.categoria || 'General'}
            </div>
            {!obra.disponible && !obra.eliminada && <div style={tagStyle('red')}>VENDIDO</div>}
            {obra.eliminada && <div style={tagStyle('orange')}>ELIMINADO</div>}

            <img src={obra.imagenURL} alt={obra.titulo} style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '10px', borderRadius: '4px', marginTop:'25px' }} />
            
            <h3 style={{ fontSize: '1rem', margin: '0 0 5px' }}>{obra.titulo}</h3>
            <p style={{ color: '#aaa', fontSize: '0.8rem', marginBottom: '2px' }}>{obra.dimensiones}</p>
            <p style={{ color: '#4caf50', fontSize: '1rem', fontWeight: 'bold' }}>${obra.precio.toLocaleString('es-CL')}</p>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              {!modoPapelera ? (
                <button onClick={() => enviarAPapelera(obra._id)} style={{ flex:1, background: '#333', color: 'white', border: 'none', padding: '8px', cursor: 'pointer', borderRadius: '4px' }}>Eliminar</button>
              ) : (
                <>
                  <button onClick={() => restaurarObra(obra._id)} style={{ flex:1, background: '#4caf50', color: 'white', border: 'none', padding: '8px', cursor: 'pointer', borderRadius: '4px' }}>♻️</button>
                  <button onClick={() => eliminarDefinitivo(obra._id)} style={{ flex:1, background: 'transparent', border: '1px solid red', color:'red', padding: '8px', cursor: 'pointer', borderRadius: '4px' }}>☠️</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Estilos
const inputStyle = { padding: '12px', background: '#121212', border: '1px solid #444', color: 'white', borderRadius: '4px', width: '100%', fontFamily: 'inherit' };
const labelStyle = { display: 'block', marginBottom: '5px', color: '#888', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px' };
const tagStyle = (color) => ({ position: 'absolute', top: 10, right: 10, background: color, color: 'white', padding: '4px 10px', fontSize: '0.7rem', fontWeight: 'bold', borderRadius: '4px', zIndex: 10 });

export default AdminObras;