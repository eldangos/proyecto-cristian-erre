function Servicios() {
  return (
    <div style={{ minHeight: '100vh', background: '#121212', color: 'white', fontFamily: "'Montserrat', sans-serif", paddingBottom: '50px' }}>
      
      {/* PORTADA */}
      <header style={{ 
        padding: '80px 20px', 
        textAlign: 'center', 
        background: `linear-gradient(to bottom, rgba(18,18,18,0.7), rgba(18,18,18,1)), url('https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <h1 style={{ fontSize: '3.5rem', letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '20px' }}>
          Servicios Personalizados
        </h1>
        <p style={{ color: '#ddd', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          Más allá del lienzo. Llevamos el arte a tus espacios y a tu marca digital.
        </p>
      </header>

      {/* LISTA DE SERVICIOS */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px', display: 'grid', gap: '60px' }}>
        
        {/* SERVICIO 1: MURALES */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center', background: '#1e1e1e', padding: '30px', borderRadius: '8px', border: '1px solid #333' }}>
          <div style={{ flex: '1 1 300px' }}>
            <img 
              src="https://images.unsplash.com/photo-1569154941061-e231b4725ef1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Murales" 
              style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '4px' }}
            />
          </div>
          <div style={{ flex: '1 1 400px' }}>
            <h2 style={{ fontSize: '2rem', color: '#e67e22', marginBottom: '15px' }}>MURALISMO</h2>
            <p style={{ color: '#ccc', lineHeight: '1.6', marginBottom: '20px' }}>
              Transforma tus paredes en obras de arte. Realizamos murales a pedido para hogares, oficinas o espacios comerciales. Diseños únicos adaptados a la atmósfera que deseas crear.
            </p>
            <ul style={{ color: '#888', marginBottom: '25px', paddingLeft: '20px' }}>
              <li>Interiores y Exteriores</li>
              <li>Diseño conceptual previo</li>
              <li>Materiales de alta durabilidad</li>
            </ul>
            <a href="mailto:contacto@cristianerre.com?subject=Cotización%20Mural" style={{ textDecoration:'none', padding: '12px 30px', display: 'inline-block', border:'1px solid white', color:'white', fontWeight:'bold', textTransform:'uppercase', cursor:'pointer' }}>
              Cotizar Mural
            </a>
          </div>
        </div>

        {/* SERVICIO 2: DISEÑO DIGITAL */}
        <div style={{ display: 'flex', flexWrap: 'wrap-reverse', gap: '40px', alignItems: 'center', background: '#1e1e1e', padding: '30px', borderRadius: '8px', border: '1px solid #333' }}>
          <div style={{ flex: '1 1 400px' }}>
            <h2 style={{ fontSize: '2rem', color: '#3498db', marginBottom: '15px' }}>DISEÑO DIGITAL</h2>
            <p style={{ color: '#ccc', lineHeight: '1.6', marginBottom: '20px' }}>
              Identidad visual con alma artística. Creamos logotipos, branding y material digital que destaca por su creatividad y estética única.
            </p>
            <ul style={{ color: '#888', marginBottom: '25px', paddingLeft: '20px' }}>
              <li>Logotipos y Manual de Marca</li>
              <li>Ilustración Digital</li>
              <li>Diseño para Redes Sociales</li>
            </ul>
            <a href="mailto:contacto@cristianerre.com?subject=Cotización%20Diseño" style={{ textDecoration:'none', padding: '12px 30px', display: 'inline-block', border:'1px solid white', color:'white', fontWeight:'bold', textTransform:'uppercase', cursor:'pointer' }}>
              Cotizar Diseño
            </a>
          </div>
          <div style={{ flex: '1 1 300px' }}>
            <img 
              src="https://images.unsplash.com/photo-1626785774573-4b7993143a26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Diseño Digital" 
              style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '4px' }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Servicios;