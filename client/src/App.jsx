import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';

// Páginas existentes
import AdminObras from './pages/AdminObras';
import Galeria from './pages/Galeria';
import DetalleObra from './pages/DetalleObra';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

// NUEVA PÁGINA
import SobreElArtista from './pages/SobreElArtista';

// Componente del Menú
const Navbar = () => {
  const { cart } = useCart();

  return (
    <nav style={{ 
      padding: '20px 40px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      background: '#121212', 
      borderBottom: '1px solid #333' 
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '2px', fontFamily: "'Montserrat', sans-serif" }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>CRISTIAN ERRÉ</Link>
      </div>

      <div style={{ display: 'flex', gap: '30px', alignItems: 'center'}}>
        <Link to="/" style={{ color: '#ccc', textDecoration: 'none', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px', fontFamily: "'Montserrat', sans-serif" }}>
          Galería
        </Link>

        <Link to="/sobre-el-artista" style={{ color: '#ccc', textDecoration: 'none', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px', fontFamily: "'Montserrat', sans-serif" }}>
          Sobre el Artista
        </Link>
        
        <Link to="/cart" style={{ color: 'white', textDecoration: 'none', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px', fontFamily: "'Montserrat', sans-serif", border: '1px solid white', padding: '5px 15px' }}>
          CARRITO ({cart.length})
        </Link>

        <Link to="/login" style={{ color: '#666', textDecoration: 'none', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px', fontFamily: "'Montserrat', sans-serif" }}>
          Admin
        </Link>
      </div>
    </nav>
  );
};

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Galeria />} />
          <Route path="/obra/:id" element={<DetalleObra />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/obras" element={<AdminObras />} />
          <Route path="/cart" element={<Cart />} />

          {/* NUEVA RUTA */}
          <Route path="/sobre-el-artista" element={<SobreElArtista />} />

          <Route path="/checkout" element={<Checkout />} />
        </Routes>

        <footer style={{ textAlign: 'center', padding: '40px 20px', borderTop: '1px solid #333', marginTop: '50px', color: '#666', fontSize: '0.8rem', letterSpacing: '1px' }}>
          <p>© 2025 CRISTIAN ERRÉ. TODOS LOS DERECHOS RESERVADOS.</p>
        </footer>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;