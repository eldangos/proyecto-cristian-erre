const express = require('express');
const router = express.Router();
const Obra = require('../models/Obra');

// 1. OBTENER TODAS LAS OBRAS (GET)
router.get('/', async (req, res) => {
  try {
    const obras = await Obra.find();
    res.json(obras);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. OBTENER UNA SOLA OBRA (GET)
router.get('/:id', async (req, res) => {
  try {
    const obra = await Obra.findById(req.params.id);
    if (!obra) return res.status(404).json({ message: 'Obra no encontrada' });
    res.json(obra);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3. CREAR UNA OBRA (POST)
router.post('/', async (req, res) => {
  try {
    const nuevaObra = new Obra(req.body);
    const obraGuardada = await nuevaObra.save();
    res.json(obraGuardada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 4. ELIMINAR OBRA (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    await Obra.findByIdAndDelete(req.params.id);
    res.json({ message: 'Obra eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT: Editar una obra (para cambiar precio, título o disponibilidad)
router.put('/:id', async (req, res) => {
  try {
    const obraActualizada = await Obra.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } // Esto hace que nos devuelva la obra ya editada
    );
    res.json(obraActualizada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/eliminar/:id', async (req, res) => {
  try {
    const { motivo } = req.body; // Recibimos el motivo desde el frontend

    const obraActualizada = await Obra.findByIdAndUpdate(
      req.params.id,
      { 
        eliminada: true, 
        disponible: false, // Si se borra, ya no se puede comprar
        motivoEliminacion: motivo,
        fechaEliminacion: new Date()
      },
      { new: true }
    );
    res.json(obraActualizada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/definitivo/:id', async (req, res) => {
  try {
    await Obra.findByIdAndDelete(req.params.id);
    res.json({ message: 'Obra eliminada permanentemente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;