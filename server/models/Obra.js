const mongoose = require('mongoose');

const ObraSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: String,
  tecnica: String,
  dimensiones: String,
  precio: { type: Number, required: true, min: 0 }, // Mejora: Validación de precio positivo
  imagenURL: String,
  disponible: { type: Boolean, default: true },
  
  // NUEVO CAMPO: CATEGORÍA (Mini, Grande, Dibujo...)
  categoria: { type: String, default: 'General' }, 

  eliminada: { type: Boolean, default: false },
  motivoEliminacion: { type: String, default: '' },
  fechaEliminacion: { type: Date }
}, { timestamps: true });

ObraSchema.index({ categoria: 1 }); // Acelera los filtros de la galería
ObraSchema.index({ disponible: 1, eliminada: 1 }); // Acelera la carga inicial (solo mostrar disponibles y no borradas)

module.exports = mongoose.model('Obra', ObraSchema);