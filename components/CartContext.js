'use client';

import React, { createContext, useState, useContext, useMemo } from 'react';
import productsData from '../data/products.json';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([
    // Pre-populating with some items to match original cart page simulation
    { ...productsData.find(p => p.id === '1'), quantity: 1, stitching: 'standard' },
    { ...productsData.find(p => p.id === '3'), quantity: 1, stitching: 'none' },
  ]);

  const addToCart = (product, options = {}) => {
    const addQuantity = options.quantity || 1;
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        // Increase quantity and update options if item already exists
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, ...options, quantity: item.quantity + addQuantity }
            : item
        );
      }
      // Add new item
      return [...prevItems, { ...product, quantity: addQuantity, stitching: 'none', ...options }];
    });
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }
    setCartItems(
      cartItems.map(item => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  const stitchingCost = useMemo(() => {
    return cartItems.reduce((total, item) => {
      return item.stitching !== 'none' ? total + 800 * item.quantity : total;
    }, 0);
  }, [cartItems]);

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    subtotal,
    stitchingCost,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};