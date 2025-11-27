import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AdminPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar pedidos al iniciar
  useEffect(() => {
    cargarPedidos();
  }, []);

  const cargarPedidos = () => {
    setLoading(true);
    axios.get('http://localhost:5000/api/pedidos')
      .then(res => {
        console.log("📦 Datos recibidos:", res.data); 
        setPedidos(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setError("No se pudo conectar con el servidor.");
        setLoading(false);
      });
  };

  // ACCIÓN 1: Marcar como Enviado
  const marcarComoEnviado = async (id) => {
    if (!confirm("¿Confirmas que ya enviaste este paquete?")) return;
    try {
      await axios.put(`http://localhost:5000/api/pedidos/${id}`, { estado: 'Enviado' });
      cargarPedidos(); 
    } catch (error) {
      alert("Error al actualizar");
    }
  };

  // ACCIÓN 2: Cancelar Pedido (Borrar y Devolver Stock)
  const cancelarPedido = async (id) => {
    if (!confirm("⚠️ ¿Estás seguro? Esto eliminará el pedido y las obras volverán a estar DISPONIBLES en la galería.")) return;
    
    try {
      await axios.delete(`http://localhost:5000/api/pedidos/${id}`);
      alert("Pedido eliminado y obras reactivadas.");
      cargarPedidos(); // Recargamos la lista para que desaparezca
    } catch (error) {
      console.error(error);
      alert("Error al cancelar");
    }
  };

  if (loading) return <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>⏳ Buscando pedidos...</div>;
  
  if (error) return (
    <div style={{ color: '#ff6b6b', textAlign: 'center', marginTop: '50px' }}>
      <h2>⚠️ Problema de Conexión</h2>
      <p>{error}</p>
      <button onClick={cargarPedidos} style={{ padding: '10px', marginTop: '10px', cursor: 'pointer' }}>Reintentar</button>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', padding: '40px', color: 'white', fontFamily: "'Montserrat', sans-serif", maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid #333', paddingBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>📦 Gestión de Pedidos ({pedidos.length})</h1>
        <Link to="/admin/obras" style={{ padding: '10px 20px', background: 'white', color: 'black', textDecoration: 'none', fontWeight: 'bold', borderRadius: '4px' }}>
          🎨 VOLVER A OBRAS
        </Link>
      </div>

      {pedidos.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', background: '#1e1e1e', borderRadius: '8px' }}>
          <h3>No hay pedidos registrados.</h3>
          <p style={{ color: '#888' }}>Las compras realizadas aparecerán aquí.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {pedidos.map((pedido) => (
            <div key={pedido._id} style={{ 
              background: '#1e1e1e', 
              padding: '25px', 
              borderRadius: '8px', 
              border: pedido.estado === 'Enviado' ? '1px solid #4caf50' : '1px solid #333',
              position: 'relative',
              opacity: pedido.estado === 'Enviado' ? 0.7 : 1 
            }}>
              
              {/* ETIQUETA DE ESTADO */}
              <div style={{ 
                position: 'absolute', top: '20px', right: '20px', 
                background: pedido.estado === 'Enviado' ? '#4caf50' : '#ff9800',
                color: 'black', padding: '5px 10px', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase'
              }}>
                {pedido.estado || 'Pendiente'}
              </div>

              {/* TOTAL Y FECHA */}
              <div style={{ marginBottom: '15px' }}>
                <span style={{ color: '#888', fontSize: '0.9rem' }}>
                  📅 {pedido.fecha ? new Date(pedido.fecha).toLocaleDateString() : 'Fecha desconocida'} 
                  &nbsp; • &nbsp; 
                  <strong style={{ color: '#4caf50', fontSize: '1.1rem' }}>Total: ${pedido.total ? pedido.total.toLocaleString('es-CL') : '0'}</strong>
                </span>
              </div>

              <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', marginTop: '20px' }}>
                
                {/* DATOS CLIENTE */}
                <div style={{ flex: 1, minWidth: '250px' }}>
                  <h4 style={{ color: '#666', textTransform: 'uppercase', fontSize: '0.8rem' }}>Cliente</h4>
                  <p style={{ margin: '5px 0', fontSize: '1.1rem', fontWeight: 'bold' }}>{pedido.comprador?.nombre || 'Anónimo'}</p>
                  <p style={{ margin: '5px 0', color: '#aaa' }}>📧 {pedido.comprador?.email || 'Sin Email'}</p>
                  <p style={{ margin: '5px 0', color: '#aaa' }}>📍 {pedido.comprador?.direccion || 'Sin Dirección'}</p>
                </div>

                {/* ITEMS */}
                <div style={{ flex: 1, minWidth: '250px' }}>
                  <h4 style={{ color: '#666', textTransform: 'uppercase', fontSize: '0.8rem' }}>Obras</h4>
                  <ul style={{ paddingLeft: '20px', margin: '5px 0' }}>
                    {pedido.items && pedido.items.length > 0 ? (
                      pedido.items.map((item, i) => (
                        <li key={i} style={{ marginBottom: '5px' }}>
                          {item.titulo || 'Obra desconocida'} 
                        </li>
                      ))
                    ) : (
                      <li>Sin items</li>
                    )}
                  </ul>
                </div>
              </div>

              {/* BOTONES DE ACCIÓN */}
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginTop: '20px' }}>
                
                {/* 1. MARCAR COMO ENVIADO (Solo si no está enviado) */}
                {pedido.estado !== 'Enviado' && (
                  <button 
                    onClick={() => marcarComoEnviado(pedido._id)}
                    style={{ 
                      padding: '12px 20px', background: 'white', color: 'black', 
                      border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px', textTransform: 'uppercase' 
                    }}
                  >
                    Marcar como Enviado 🚚
                  </button>
                )}

                {/* 2. CANCELAR PEDIDO (Siempre visible por si acaso) */}
                <button 
                  onClick={() => cancelarPedido(pedido._id)}
                  style={{ 
                    padding: '12px 20px', 
                    background: 'transparent', 
                    color: '#ff4444', 
                    border: '1px solid #ff4444', 
                    fontWeight: 'bold', 
                    cursor: 'pointer', 
                    borderRadius: '4px', 
                    textTransform: 'uppercase'
                  }}
                >
                  Cancelar / Borrar 🗑️
                </button>

              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPedidos;