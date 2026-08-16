'use client';

import React, { useState } from 'react';
import { useCart } from '@/components/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import UpiModal from '@/components/UpiModal';

const CartPage = () => {
  const {
    cartItems,
    updateQuantity,
    removeItem,
    subtotal,
    stitchingCost
  } = useCart();

  const [isUpiModalOpen, setUpiModalOpen] = useState(false);

  const shippingCost = 50;
  const tax = (subtotal + stitchingCost) * 0.05; // 5% GST
  const total = subtotal + stitchingCost + shippingCost + tax;

  return (
    <>
      <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8">Your Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="text-xl text-gray-600">Your cart is empty.</p>
            <Link href="/shop" className="mt-4 inline-block bg-pink-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-pink-700">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center bg-white p-4 rounded-lg shadow">
                  <Image src={item.images[0]} alt={item.title} width={96} height={128} className="w-24 h-32 object-cover rounded-md" />
                  <div className="grow ml-4">
                    <h2 className="font-semibold text-lg">{item.title}</h2>
                    <p className="text-gray-600">₹{item.price.toLocaleString()}</p>
                    {item.stitching !== 'none' && (
                      <p className="text-sm text-pink-600">Blouse Stitching: Standard (+₹800)</p>
                    )}
                    <div className="flex items-center mt-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 border rounded-md">-</button>
                      <span className="px-4">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 border rounded-md">+</button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">₹{(item.price * item.quantity).toLocaleString()}</p>
                    <button onClick={() => removeItem(item.id)} className="text-red-500 text-sm mt-2 hover:underline">Remove</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="bg-white p-6 rounded-lg shadow h-fit">
              <h2 className="text-xl font-bold mb-4">Price Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Blouse Stitching</span><span>₹{stitchingCost.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>₹{shippingCost.toLocaleString()}</span></div>
                <div className="flex justify-between text-gray-600"><span>Tax (5% GST)</span><span>₹{tax.toFixed(2)}</span></div>
                <div className="border-t my-2"></div>
                <div className="flex justify-between font-bold text-xl"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
              </div>

              {/* Payment Options */}
              <div className="mt-6">
                <h3 className="font-bold mb-3">Proceed to Payment</h3>
                <div className="flex flex-col space-y-3">
                  <button onClick={() => setUpiModalOpen(true)} className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600">
                    Pay with UPI
                  </button>
                  <button className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600">Cash on Delivery (COD)</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    <UpiModal 
        isOpen={isUpiModalOpen} 
        onClose={() => setUpiModalOpen(false)} 
      />
    </>
  );
};

export default CartPage;
