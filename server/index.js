const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// IMPORTAR RUTAS
const obrasRoutes = require('./routes/obras');
const pedidosRoutes = require('./routes/pedidos'); // <--- (NUEVO) Importamos el archivo de pedidos

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json()); // Importante: permite recibir datos JSON del carrito

// USAR LAS RUTAS
app.use('/api/obras', obrasRoutes);
app.use('/api/pedidos', pedidosRoutes); // <--- (NUEVO) Todo lo que vaya a /api/pedidos lo maneja ese archivo

// CONEXIÓN A BASE DE DATOS
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => console.error("❌ Error conectando a MongoDB:", err));

// RUTA DE PRUEBA
app.get('/', (req, res) => {
  res.send('API de Cristian Erré funcionando correctamente');
});

// ARRANCAR SERVIDOR
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});