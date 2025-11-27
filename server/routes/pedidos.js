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


router.delete('/:id', async (req, res) => {
  try {
    // 1. Buscamos el pedido para saber qué obras tenía
    const pedido = await Pedido.findById(req.params.id);
    if (!pedido) return res.status(404).json({ message: 'Pedido no encontrado' });

    // 2. Recorremos los items y los reactivamos en la colección de Obras
    // (Esto cambia disponible: false -> true)
    for (const item of pedido.items) {
      if (item.obraId) {
        await Obra.findByIdAndUpdate(item.obraId, { disponible: true });
      }
    }

    // 3. Ahora sí, borramos el pedido de la base de datos
    await Pedido.findByIdAndDelete(req.params.id);

    res.json({ message: 'Pedido cancelado y stock restaurado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;