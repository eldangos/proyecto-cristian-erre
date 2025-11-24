import { useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const { cart, total, cart: clearCart } = useCart(); // Necesitamos leer el carrito y el total
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    direccion: '',
    telefono: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Armamos el paquete de datos para el servidor
    const nuevoPedido = {
      comprador: formData,
      items: cart.map(item => ({ obraId: item._id, titulo: item.titulo, precio: item.precio })),
      total: total
    };

    try {
      // Enviamos el pedido a TU Backend
      await axios.post('http://localhost:5000/api/pedidos', nuevoPedido);
      
      alert('¡GRACIAS POR TU COMPRA! El pedido ha sido guardado.');
      // Aquí podríamos vaciar el carrito (pendiente)
      navigate('/'); // Volver al inicio
    } catch (error) {
      console.error(error);
      alert('Hubo un error al procesar el pedido.');
    }
  };

  if (cart.length === 0) return <h2 style={{color:'white', textAlign:'center', marginTop:'50px'}}>El carrito está vacío</h2>;

  return (
    <div style={{ minHeight: '100vh', padding: '40px', color: 'white', fontFamily: "'Montserrat', sans-serif", maxWidth: '600px', margin: '0 auto' }}>
      
      <h1 style={{ textAlign: 'center', marginBottom: '40px', letterSpacing: '2px' }}>FINALIZAR COMPRA</h1>

      <div style={{ background: '#1e1e1e', padding: '30px', borderRadius: '8px', border: '1px solid #333' }}>
        <h3 style={{ borderBottom: '1px solid #444', paddingBottom: '15px', marginBottom: '20px' }}>Datos de Envío</h3>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#aaa' }}>Nombre Completo</label>
            <input name="nombre" onChange={handleChange} required style={inputStyle} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#aaa' }}>Email</label>
            <input name="email" type="email" onChange={handleChange} required style={inputStyle} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#aaa' }}>Dirección de Envío</label>
            <input name="direccion" onChange={handleChange} required style={inputStyle} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#aaa' }}>Teléfono</label>
            <input name="telefono" onChange={handleChange} style={inputStyle} />
          </div>

          <div style={{ marginTop: '20px', borderTop: '1px solid #444', paddingTop: '20px' }}>
            <p style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold' }}>
              <span>Total a Pagar:</span>
              <span>${total.toLocaleString('es-CL')}</span>
            </p>
          </div>

          <button type="submit" className="btn-minimal" style={{ padding: '15px', marginTop: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>
            Confirmar Pedido
          </button>
        </form>
      </div>
    </div>
  );
}

// Estilo simple para los inputs (para no ensuciar el código)
const inputStyle = {
  width: '100%',
  padding: '12px',
  background: '#121212',
  border: '1px solid #444',
  color: 'white',
  borderRadius: '4px',
  fontFamily: 'inherit'
};

export default Checkout;