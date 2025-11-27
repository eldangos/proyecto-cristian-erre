const mongoose = require('mongoose');

const ObraSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: String,
  tecnica: String,
  dimensiones: String,
  precio: Number,
  imagenURL: String, // Aquí guardaremos el link de la foto
  disponible: { type: Boolean, default: true },
  eliminada: { type: Boolean, default: false }, // Para el borrado lógico
  motivoEliminacion: { type: String, default: '' }, // Para el registro del admin
  fechaEliminacion: { type: Date } // Para saber cuándo pasó
}, { timestamps: true });

module.exports = mongoose.model('Obra', ObraSchema);