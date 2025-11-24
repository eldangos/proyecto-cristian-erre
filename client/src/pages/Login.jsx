import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulación simple para la demo: la contraseña es "admin123"
    if (pass === 'admin123') {
      navigate('/admin/obras'); // Te lleva al panel si es correcto
    } else {
      alert('Contraseña incorrecta');
    }
  };

  return (
    <div style={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form onSubmit={handleLogin} style={{ padding: '40px', border: '1px solid #ddd', borderRadius: '8px', width: '300px' }}>
        <h2 style={{ textAlign: 'center' }}>Acceso Artista</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={pass} 
            onChange={(e) => setPass(e.target.value)} 
            style={{ padding: '10px' }}
          />
          <button type="submit" style={{ padding: '10px', background: 'black', color: 'white', cursor: 'pointer' }}>
            Ingresar
          </button>
        </div>
        <p style={{marginTop: '10px', fontSize: '0.8rem', color: 'gray'}}>Nota: Usa "admin123"</p>
      </form>
    </div>
  );
}

export default Login;