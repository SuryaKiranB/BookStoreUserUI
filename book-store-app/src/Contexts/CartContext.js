import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    else{
        setCart([]);
    }
  }, []);

  const addToCart = (book) => {
    const isBookInCart = cart.some((item) => item.id === book.id);
    if (!isBookInCart) {
      setCart((prevCart) => {
        const updatedCart = [...prevCart, book];
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return updatedCart;
      });
    }
  };
  const removeFromCart = (bookId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== bookId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.setItem('cart', []);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
