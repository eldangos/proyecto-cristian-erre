import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Intentamos leer el carrito guardado en localStorage al iniciar
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      return [];
    }
  });

  // Cada vez que el carrito cambie, lo guardamos en localStorage para no perderlo al recargar
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const exists = cart.find(item => item._id === product._id);
    if (exists) {
      alert("⚠️ Esta obra única ya está en tu carrito.");
      return;
    }
    setCart([...cart, product]);
    alert("✅ ¡Obra añadida al carrito!");
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  // NUEVA FUNCIÓN: VACIAR EL CARRITO
  const clearCart = () => {
    setCart([]); // Lo deja vacío
    localStorage.removeItem('cart'); // Limpia la memoria del navegador
  };

  const total = cart.reduce((acc, item) => acc + item.precio, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};