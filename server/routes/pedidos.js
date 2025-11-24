const express = require('express');
const router = express.Router();
const Pedido = require('../models/Pedido');
const Obra = require('../models/Obra');

// CREAR UN NUEVO PEDIDO
router.post('/', async (req, res) => {
  try {
    const { comprador, items, total } = req.body;

    const nuevoPedido = new Pedido({ comprador, items, total });
    await nuevoPedido.save();

    for (const item of items) {
      await Obra.findByIdAndUpdate(item.obraId, { disponible: false });
    }

    res.status(201).json(nuevoPedido);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// OBTENER PEDIDOS (Para que Cristian los vea en el Admin)
router.get('/', async (req, res) => {
  try {
    const pedidos = await Pedido.find().sort({ fecha: -1 }); // Los más nuevos primero
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT: Actualizar estado a "Enviado"
router.put('/:id', async (req, res) => {
  try {
    const pedidoActualizado = await Pedido.findByIdAndUpdate(
      req.params.id, 
      { estado: 'Enviado' }, 
      { new: true }
    );
    res.json(pedidoActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;