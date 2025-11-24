import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom'; // <--- 1. Importamos useNavigate

function Cart() {
  const { cart, removeFromCart, total } = useCart();
  const navigate = useNavigate(); // <--- 2. Activamos la función de navegar

  if (cart.length === 0) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: "'Montserrat', sans-serif" }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>TU COLECCIÓN ESTÁ VACÍA</h2>
        <Link to="/" style={{ color: '#888', textDecoration: 'none', borderBottom: '1px solid #888' }}>EXPLORAR GALERÍA</Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', padding: '40px', color: 'white', fontFamily: "'Montserrat', sans-serif", maxWidth: '1000px', margin: '0 auto' }}>
      
      <h1 style={{ textAlign: 'center', fontSize: '2.5rem', letterSpacing: '2px', marginBottom: '50px', textTransform: 'uppercase' }}>
        Tu Selección
      </h1>

      {/* LISTA DE ÍTEMS */}
      <div style={{ borderTop: '1px solid #333' }}>
        {cart.map((obra) => (
          <div key={obra._id} style={{ display: 'flex', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid #333', gap: '20px' }}>
            
            <img src={obra.imagenURL} alt={obra.titulo} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
            
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', textTransform: 'uppercase' }}>{obra.titulo}</h3>
              <p style={{ color: '#888', fontSize: '0.9rem' }}>Obra Única</p>
            </div>

            <div style={{ fontSize: '1.2rem' }}>${obra.precio.toLocaleString('es-CL')}</div>

            <button 
              onClick={() => removeFromCart(obra._id)}
              style={{ background: 'transparent', color: '#ff4444', border: 'none', cursor: 'pointer', fontSize: '1.5rem', padding: '0 10px' }}
              title="Eliminar del carrito"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {/* RESUMEN TOTAL */}
      <div style={{ marginTop: '40px', textAlign: 'right' }}>
        <p style={{ color: '#888', fontSize: '1rem', marginBottom: '10px' }}>TOTAL ESTIMADO</p>
        <h2 style={{ fontSize: '3rem', margin: 0 }}>${total.toLocaleString('es-CL')}</h2>
        
        {/* BOTÓN CON NAVEGACIÓN REAL */}
        <button 
          className="btn-minimal"
          style={{ 
            marginTop: '30px', 
            padding: '15px 40px', 
            fontSize: '1rem', 
            textTransform: 'uppercase', 
            fontWeight: 'bold',
            letterSpacing: '2px'
          }}
          // 3. AQUÍ ESTÁ EL CAMBIO: Ahora te lleva a /checkout
          onClick={() => navigate('/checkout')}
        >
          Proceder al Pago
        </button>
      </div>

    </div>
  );
}

export default Cart;