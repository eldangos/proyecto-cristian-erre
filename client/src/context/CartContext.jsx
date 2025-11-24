import { createContext, useState, useContext } from 'react';

// 1. Creamos el contexto (la memoria global)
const CartContext = createContext();

// 2. Hook personalizado para usar el carrito fácil en cualquier lado
export const useCart = () => useContext(CartContext);

// 3. El Proveedor (envuelve a toda la app para darle acceso al carrito)
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Aquí se guardan las obras

  // Función para agregar
  const addToCart = (product) => {
    // Verificamos si ya está en el carrito para no duplicar
    const exists = cart.find(item => item._id === product._id);
    if (exists) {
      alert("⚠️ Esta obra única ya está en tu carrito.");
      return;
    }
    
    setCart([...cart, product]);
    alert("✅ ¡Obra añadida al carrito con éxito!");
  };

  // Función para eliminar
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  // Función para calcular total
  const total = cart.reduce((acc, item) => acc + item.precio, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, total }}>
      {children}
    </CartContext.Provider>
  );
};