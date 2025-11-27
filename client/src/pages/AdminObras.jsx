import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AdminObras() {
  const [obras, setObras] = useState([]);
  const [modoPapelera, setModoPapelera] = useState(false); // Estado para cambiar de vista
  const [form, setForm] = useState({ titulo: '', descripcion: '', tecnica: '', precio: '', imagenURL: '' });

  useEffect(() => { obtenerObras(); }, []);

  const obtenerObras = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/obras?t=' + Date.now());
      setObras(res.data);
    } catch (error) { console.error(error); }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // GUARDAR
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/obras', form);
      alert('¡Obra guardada!');
      setForm({ titulo: '', descripcion: '', tecnica: '', precio: '', imagenURL: '' });
      obtenerObras();
    } catch (error) { alert('Error'); }
  };

  // BORRADO LÓGICO (Enviar a papelera)
  const enviarAPapelera = async (id) => {
    const motivo = prompt("Motivo de eliminación (para registro):");
    if (!motivo) return;
    try {
      await axios.put(`http://localhost:5000/api/obras/eliminar/${id}`, { motivo });
      obtenerObras();
    } catch (error) { alert("Error"); }
  };

  // RESTAURAR (Sacar de papelera)
  const restaurarObra = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/obras/${id}`, { disponible: true, eliminada: false });
      alert("Obra restaurada al inventario.");
      obtenerObras();
    } catch (error) { alert("Error"); }
  };

  // BORRADO DEFINITIVO (Adiós para siempre)
  const eliminarDefinitivo = async (id) => {
    if (!confirm("⚠️ ¿ESTÁS SEGURO? Esta obra desaparecerá de la base de datos para siempre y no se podrá recuperar.")) return;
    try {
      await axios.delete(`http://localhost:5000/api/obras/definitivo/${id}`);
      obtenerObras();
    } catch (error) { alert("Error"); }
  };

  // Filtramos las obras según qué pestaña estemos viendo
  const obrasVisibles = obras.filter(o => modoPapelera ? o.eliminada : !o.eliminada);

  return (
    <div style={{ padding: '40px', fontFamily: "'Montserrat', sans-serif", color: 'white', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* HEADER Y PESTAÑAS */}
      <div style={{ borderBottom: '1px solid #333', paddingBottom: '20px', marginBottom: '30px' }}>
        <h1 style={{ marginBottom: '20px' }}>Panel de Administración</h1>
        
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setModoPapelera(false)}
            style={{ padding: '10px 20px', background: !modoPapelera ? 'white' : 'transparent', color: !modoPapelera ? 'black' : 'white', border: '1px solid white', cursor: 'pointer', fontWeight: 'bold' }}
          >
            📂 INVENTARIO ACTIVO
          </button>
          
          <button 
            onClick={() => setModoPapelera(true)}
            style={{ padding: '10px 20px', background: modoPapelera ? '#ff4444' : 'transparent', color: 'white', border: '1px solid #ff4444', cursor: 'pointer', fontWeight: 'bold' }}
          >
            🗑️ PAPELERA ({obras.filter(o => o.eliminada).length})
          </button>

          <Link to="/admin/pedidos" style={{ padding: '10px 20px', background: '#333', color: 'white', textDecoration: 'none', fontWeight: 'bold', borderRadius: '4px', marginLeft: 'auto' }}>
            📦 VER PEDIDOS
          </Link>
        </div>
      </div>
      
      {/* FORMULARIO (Solo visible en Inventario Activo) */}
      {!modoPapelera && (
        <div style={{ border: '1px solid #333', padding: '30px', marginBottom: '50px', borderRadius: '8px', background: '#1e1e1e' }}>
          <h2 style={{ marginBottom: '20px', color: '#ccc' }}>Subir Nueva Obra</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px' }}>
            <input name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} required style={inputStyle} />
            <input name="precio" type="number" placeholder="Precio" value={form.precio} onChange={handleChange} style={inputStyle} />
            <input name="imagenURL" placeholder="URL Imagen" value={form.imagenURL} onChange={handleChange} required style={inputStyle} />
            <textarea name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} required style={{...inputStyle, height: '80px'}} />
            <input name="tecnica" placeholder="Técnica" value={form.tecnica} onChange={handleChange} style={inputStyle} />
            <button type="submit" style={{ padding: '15px', background: 'white', color: 'black', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>GUARDAR</button>
          </form>
        </div>
      )}

      {/* LISTA DE OBRAS */}
      <h2 style={{ marginBottom: '20px' }}>
        {modoPapelera ? '🗑️ Obras en la Papelera (Se borrarán si las eliminas aquí)' : '🎨 Obras en Galería'}
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {obrasVisibles.map(obra => (
          <div key={obra._id} style={{ border: '1px solid #333', padding: '10px', background: '#1e1e1e', position: 'relative', opacity: modoPapelera ? 0.8 : 1 }}>
            
            {/* Etiquetas */}
            {!obra.disponible && !obra.eliminada && <div style={tagStyle('red')}>VENDIDO</div>}
            {obra.eliminada && <div style={tagStyle('orange')}>ELIMINADO</div>}

            <img src={obra.imagenURL} alt={obra.titulo} style={{ width: '100%', height: '150px', objectFit: 'cover', marginBottom: '10px' }} />
            <h3 style={{ fontSize: '1rem', margin: '0 0 5px' }}>{obra.titulo}</h3>
            
            {/* BOTONES SEGÚN EL MODO */}
            <div style={{ display: 'flex', gap: '5px', flexDirection: 'column' }}>
              
              {!modoPapelera ? (
                // MODO INVENTARIO: Botón de Papelera
                <button onClick={() => enviarAPapelera(obra._id)} style={{ background: '#333', color: 'white', border: 'none', padding: '8px', cursor: 'pointer' }}>
                  ENVIAR A PAPELERA
                </button>
              ) : (
                // MODO PAPELERA: Restaurar o Eliminar Forever
                <>
                  <button onClick={() => restaurarObra(obra._id)} style={{ background: '#4caf50', color: 'white', border: 'none', padding: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                    ♻️ RESTAURAR
                  </button>
                  <button onClick={() => eliminarDefinitivo(obra._id)} style={{ background: 'red', color: 'white', border: 'none', padding: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                    ☠️ ELIMINAR PARA SIEMPRE
                  </button>
                  <p style={{fontSize:'0.7rem', color:'#888', marginTop:'5px'}}>Motivo: {obra.motivoEliminacion}</p>
                </>
              )}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputStyle = { padding: '10px', background: '#121212', border: '1px solid #555', color: 'white', borderRadius: '4px' };
const tagStyle = (color) => ({ position: 'absolute', top: 0, right: 0, background: color, color: 'white', padding: '2px 8px', fontSize: '0.8rem', fontWeight: 'bold', zIndex: 10 });

export default AdminObras;