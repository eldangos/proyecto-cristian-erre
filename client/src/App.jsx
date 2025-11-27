import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';

// --- IMPORTACIÓN DE PÁGINAS ---
import Galeria from './pages/Galeria';
import DetalleObra from './pages/DetalleObra';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminObras from './pages/AdminObras';
import AdminPedidos from './pages/AdminPedidos';
// Importante: Asegúrate de que el archivo en la carpeta 'pages' se llame igual que aquí (con Mayúsculas)
import SobreElArtista from './pages/SobreElArtista'; 

// --- COMPONENTE DE NAVEGACIÓN (NAVBAR) ---
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
      
      {/* LOGO IZQUIERDA */}
      <div style={{ fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '2px', fontFamily: "'Montserrat', sans-serif" }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>CRISTIAN ERRÉ</Link>
      </div>

      {/* ENLACES DERECHA */}
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center'}}>
        <Link to="/" style={{ color: '#ccc', textDecoration: 'none', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px', fontFamily: "'Montserrat', sans-serif" }}>
          Galería
        </Link>

        <Link to="/sobre-el-artista" style={{ color: '#ccc', textDecoration: 'none', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px', fontFamily: "'Montserrat', sans-serif" }}>
          Bio
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

// --- COMPONENTE PRINCIPAL APP ---
function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        
        <Navbar />
        
        <Routes>
          {/* RUTAS PÚBLICAS */}
          <Route path="/" element={<Galeria />} />
          <Route path="/obra/:id" element={<DetalleObra />} />
          <Route path="/sobre-el-artista" element={<SobreElArtista />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />

          {/* RUTAS PRIVADAS (ADMINISTRACIÓN) */}
          <Route path="/admin/obras" element={<AdminObras />} />
          <Route path="/admin/pedidos" element={<AdminPedidos />} />
        </Routes>

        {/* PIE DE PÁGINA */}
        <footer style={{ textAlign: 'center', padding: '40px 20px', borderTop: '1px solid #333', marginTop: '50px', color: '#666', fontSize: '0.8rem', letterSpacing: '1px' }}>
          <p>© 2025 CRISTIAN ERRÉ. TODOS LOS DERECHOS RESERVADOS.</p>
        </footer>

      </BrowserRouter>
    </CartProvider>
  );
}

export default App;