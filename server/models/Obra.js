const mongoose = require('mongoose');

const ObraSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: String,
  tecnica: String,
  dimensiones: String,
  precio: Number,
  imagenURL: String,
  disponible: { type: Boolean, default: true },
  
  // NUEVO CAMPO: CATEGORÍA (Mini, Grande, Dibujo...)
  categoria: { type: String, default: 'General' }, 

  eliminada: { type: Boolean, default: false },
  motivoEliminacion: { type: String, default: '' },
  fechaEliminacion: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Obra', ObraSchema);