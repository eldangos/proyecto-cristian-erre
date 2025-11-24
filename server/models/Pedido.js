const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
  comprador: {
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    direccion: { type: String, required: true },
    telefono: String
  },
  items: [{
    obraId: { type: mongoose.Schema.Types.ObjectId, ref: 'Obra' },
    titulo: String,
    precio: Number
  }],
  total: Number,
  estado: { type: String, default: 'Pendiente' }, // Pendiente, Pagado, Enviado
  fecha: { type: Date, default: Date.now }
});




module.exports = mongoose.model('Pedido', PedidoSchema);