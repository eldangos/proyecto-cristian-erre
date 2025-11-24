export default function SobreElArtista() {
  return (
    <div 
      style={{
        minHeight: "100vh",
        padding: "60px 20px",
        background: "linear-gradient(135deg, #0d0d0d, #1a1a1a)",
        color: "white",
        fontFamily: "'Montserrat', sans-serif"
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        {/* TÍTULO */}
        <h1 
          style={{
            fontSize: "3rem",
            textAlign: "center",
            marginBottom: "40px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            fontWeight: "300",
            animation: "fadeIn 1s ease forwards"
          }}
        >
          Sobre el Artista
        </h1>

        {/* CONTENEDOR PRINCIPAL */}
        <div 
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "40px"
          }}
        >

          {/* GALERÍA DE 3 IMÁGENES */}
          <div 
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              flexWrap: "wrap"
            }}
          >
            {[
              "https://i.pinimg.com/280x280_RS/59/1c/e7/591ce76979be1ba4ed8e9d15b1e259f7.jpg",
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5FlBNl7NJDwwjuvPUFSEuLT2pOrCzA4c6pg&s",
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3tdvis5Oe-jsXVc9qo7jl6bDvqozW6Mx86A&s"
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Foto ${i+1}`}
                style={{
                  width: "30%",
                  minWidth: "250px",
                  borderRadius: "20px",
                  objectFit: "cover",
                  boxShadow: "0px 0px 40px rgba(255,255,255,0.15)",
                  border: "2px solid rgba(255,255,255,0.2)",
                  transition: "0.3s",
                  cursor: "pointer"
                }}
                onMouseOver={e => e.target.style.transform = "scale(1.05)"}
                onMouseOut={e => e.target.style.transform = "scale(1)"}
              />
            ))}
          </div>

          {/* BIO */}
          <p 
            style={{
              fontSize: "1.1rem",
              lineHeight: "1.8",
              textAlign: "center",
              color: "#ccc",
              animation: "fadeInUp 1s ease forwards"
            }}
          >
            Cristian Erré es un artista visual contemporáneo cuyo trabajo explora la emoción, la identidad y la transformación humana desde una perspectiva íntima y profundamente expresiva. Su obra se caracteriza por la combinación de técnicas modernas con una sensibilidad estética que busca transmitir aquello que no siempre puede ser dicho con palabras.
            Cada pieza refleja una unión entre técnica y sentimiento, incorporando contrastes, texturas y dinámicas visuales que invitan al espectador a detenerse, observar y conectar de manera auténtica. A través de sus creaciones, Cristian explora la fragilidad, la fortaleza y la dualidad interna que todo ser humano experimenta, generando una experiencia visual cargada de significado y resonancia emocional.
            Su trabajo no solo busca ser observado, sino también sentido: es una invitación a descubrir historias, reinterpretar sensaciones y abrir puertas hacia nuevas perspectivas.
          </p>

          {/* REDES */}
          <div 
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "30px",
              marginTop: "30px"
            }}
          >
            {[
              { name: "Instagram", link: "https://www.instagram.com/cristian_erre/" },
              { name: "Facebook", link: "https://www.facebook.com/cristian.erre.2025/" },
              { name: "Correo", link: "holacristianerre@gmail.com" },
            ].map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                style={{
                  color: "white",
                  textDecoration: "none",
                  padding: "10px 20px",
                  border: "1px solid #555",
                  borderRadius: "30px",
                  letterSpacing: "1px",
                  transition: "0.3s"
                }}
                onMouseOver={e => {
                  e.target.style.background = "white";
                  e.target.style.color = "black";
                  e.target.style.borderColor = "white";
                }}
                onMouseOut={e => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "white";
                  e.target.style.borderColor = "#555";
                }}
              >
                {item.name}
              </a>
            ))}
          </div>

        </div>
      </div>

      {/* ANIMACIONES */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}
