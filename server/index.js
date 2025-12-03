const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// 🛡️ IMPORTANTE PARA LA NOTA (SEGURIDAD Y MONITOREO)
const helmet = require('helmet'); 
const morgan = require('morgan'); 

require('dotenv').config();

// IMPORTAR RUTAS
const obrasRoutes = require('./routes/obras');
const pedidosRoutes = require('./routes/pedidos');

const app = express();

// MIDDLEWARES (Aquí ocurre la magia de seguridad)
app.use(helmet()); // <--- 1. Oculta info del servidor a hackers (Cabeceras seguras)
app.use(morgan('dev')); // <--- 2. Registra cada petición en la consola (Monitoreo)
app.use(cors());
app.use(express.json());

// USAR LAS RUTAS
app.use('/api/obras', obrasRoutes);
app.use('/api/pedidos', pedidosRoutes);

// CONEXIÓN A BASE DE DATOS
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => console.error("❌ Error conectando a MongoDB:", err));

// RUTA DE PRUEBA
app.get('/', (req, res) => {
  res.send('API de Cristian Erré segura y funcionando 🔒');
});

// ARRANCAR SERVIDOR
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});