'use client';

import { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';

export default function CartSidebar({ isOpen, onClose }) {
  const { cartItems } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-50 transform transition-transform duration-300 overflow-y-auto border-l ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
        <h2 className="text-xl font-bold">Your Shopping Cart</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-black">
          <FaTimes size={24} />
        </button>
      </div>

      <div className="p-4 text-gray-700 space-y-4">
        {cartItems.length === 0 ? (
          <p className="text-center font-medium py-10">Your shopping cart is empty!</p>
        ) : (
          <>
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center gap-4 border-b pb-3">
                <img
                  src={item.images[0]?.url}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md border"
                />
                <div className="flex flex-col flex-1">
                  <p className="font-semibold text-base">{item.name}</p>
                  <p className="text-sm text-gray-500">Brand: {item.brand?.name}</p>
                  <p className="text-sm text-gray-500">Size: M</p>
                  <p className="text-sm text-gray-800 mt-1 font-medium">
                    €{item.price?.value.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}

            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Subtotal</span>
                <span className="font-semibold text-lg">€{cartItems.reduce((total, item) => total + item.price?.value, 0).toFixed(2)}</span>
              </div>
              <button className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 rounded-lg transition duration-300">
                🧾 Proceed to Checkout
              </button>
              <button className="w-full mt-2 text-sm text-blue-600 hover:underline text-center">Continue Shopping</button>
            </div>

            {/* Recommendation Section */}
            <div className="mt-10">
              <h3 className="text-lg font-bold mb-3">You May Also Like</h3>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className="border rounded-lg p-2 hover:shadow-md transition">
                    <img
                      src="https://via.placeholder.com/100"
                      alt="Recommendation"
                      className="w-full h-24 object-cover rounded"
                    />
                    <p className="text-sm mt-2 font-medium">Product Name</p>
                    <p className="text-xs text-gray-600">€99.99</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
