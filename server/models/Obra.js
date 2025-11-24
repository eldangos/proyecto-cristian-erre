const mongoose = require('mongoose');

const ObraSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: String,
  tecnica: String,
  dimensiones: String,
  precio: Number,
  imagenURL: String, // Aquí guardaremos el link de la foto
  disponible: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Obra', ObraSchema);