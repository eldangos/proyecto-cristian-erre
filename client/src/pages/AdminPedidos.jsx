import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AdminPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar pedidos
  useEffect(() => {
    cargarPedidos();
  }, []);

  const cargarPedidos = () => {
    axios.get('https://proyecto-cristian-erre.onrender.com/api/pedidos')
      .then(res => {
        setPedidos(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  };

  // NUEVA FUNCIÓN: Cambiar estado
  const marcarComoEnviado = async (id) => {
    if (!confirm("¿Confirmas que ya enviaste este paquete?")) return;
    try {
      await axios.put(`https://proyecto-cristian-erre.onrender.com/api/pedidos/${id}`);
      cargarPedidos(); // Recargamos la lista para ver el cambio
    } catch (error) {
      alert("Error al actualizar");
    }
  };

  if (loading) return <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Cargando...</div>;

  return (
    <div style={{ minHeight: '100vh', padding: '40px', color: 'white', fontFamily: "'Montserrat', sans-serif", maxWidth: '1200px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid #333', paddingBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>📦 Gestión de Pedidos</h1>
        <Link to="/admin/obras" style={{ color: '#aaa', textDecoration: 'none' }}>Volver a Obras</Link>
      </div>

      {pedidos.length === 0 ? (
        <p>No hay pedidos.</p>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {pedidos.map((pedido) => (
            <div key={pedido._id} style={{ 
              background: '#1e1e1e', 
              padding: '25px', 
              borderRadius: '8px', 
              border: pedido.estado === 'Enviado' ? '1px solid #4caf50' : '1px solid #333', // Borde verde si está enviado
              position: 'relative',
              opacity: pedido.estado === 'Enviado' ? 0.7 : 1 // Un poco más opaco si ya fue enviado
            }}>
              
              {/* ETIQUETA DE ESTADO */}
              <div style={{ 
                position: 'absolute', top: '20px', right: '20px', 
                background: pedido.estado === 'Enviado' ? '#4caf50' : '#ff9800',
                color: 'black', padding: '5px 10px', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase'
              }}>
                {pedido.estado || 'Pendiente'}
              </div>

              {/* DATOS GENERALES */}
              <div style={{ marginBottom: '15px' }}>
                <span style={{ color: '#888', fontSize: '0.9rem' }}>
                  📅 {new Date(pedido.fecha).toLocaleDateString()} &nbsp; • &nbsp; Total: <strong>${pedido.total?.toLocaleString('es-CL')}</strong>
                </span>
              </div>

              {/* DETALLES */}
              <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', marginTop: '20px' }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ color: '#666', textTransform: 'uppercase', fontSize: '0.8rem' }}>Datos de Envío</h4>
                  <p style={{ margin: '5px 0', fontSize: '1.1rem' }}>{pedido.comprador?.nombre}</p>
                  <p style={{ margin: '5px 0', color: '#aaa' }}>{pedido.comprador?.direccion}</p>
                  <p style={{ margin: '5px 0', color: '#aaa' }}>{pedido.comprador?.email}</p>
                </div>

                <div style={{ flex: 1 }}>
                  <h4 style={{ color: '#666', textTransform: 'uppercase', fontSize: '0.8rem' }}>Items</h4>
                  <ul style={{ paddingLeft: '20px', margin: '5px 0' }}>
                    {pedido.items?.map((item, i) => (
                      <li key={i}>{item.titulo}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* BOTÓN DE ACCIÓN (Solo si está pendiente) */}
              {pedido.estado !== 'Enviado' && (
                <button 
                  onClick={() => marcarComoEnviado(pedido._id)}
                  style={{ 
                    marginTop: '20px', padding: '12px 20px', background: 'white', color: 'black', 
                    border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px', textTransform: 'uppercase' 
                  }}
                >
                  Marcar como Enviado 🚚
                </button>
              )}

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPedidos;