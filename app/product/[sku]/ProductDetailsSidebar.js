'use client';

import CartSidebar from "@/app/Componants/CartSidebar";
import { useCart } from "@/app/contexts/CartContext";
import { useState } from "react";

export default function ProductDetailsSidebar({ product }) {
  const [cartOpen, setCartOpen] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    setCartOpen(true);
  };

  return (
    <div className="p-5 sm:p-6 md:p-8 bg-[#1f1f1f] rounded-2xl shadow-lg text-white space-y-6 transition-all duration-300 w-full max-w-md mx-auto">
      
      {/* اللوجو والصورة */}
      <div className="flex justify-center">
        <img
          src={product.images[0]?.url}
          alt={product.brand.name}
          className="w-20 h-20 object-contain mb-2 drop-shadow-xl"
        />
      </div>

      {/* SKU */}
      <p className="text-sm text-gray-400 text-center">SKU: {product.sku}</p>

      {/* السعر */}
      <div className="text-center space-y-1">
        <p className="text-xl font-bold text-yellow-400">List Price: €203</p>
        <div className="flex justify-center items-center space-x-3 rtl:space-x-reverse">
          <span className="line-through text-sm text-gray-400">€948</span>
          <span className="text-sm bg-yellow-400 text-black font-semibold px-2 py-1 rounded-full">-25%</span>
        </div>
      </div>

      {/* اختيار المقاس */}
      <div className="space-y-1">
        <label className="text-sm">Size: X</label>
        <select className="w-full bg-white text-black p-2 rounded-md border-2 border-amber-500 focus:outline-none transition duration-200">
          {[1, 2, 3, 4, 5, 6, 7].map((num) => (
            <option key={num}>{num}</option>
          ))}
        </select>
      </div>

      {/* حالة الشحن */}
      <div className="text-green-500 flex items-center gap-2 text-sm font-medium">
        🚚 Ready To Ship
      </div>

      {/* زر الإضافة إلى السلة */}
      <button
        onClick={handleAddToCart}
        className="w-full transition-all duration-200 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2.5 rounded-lg shadow-md hover:scale-[1.02]"
      >
        🛒 ADD TO BASKET
      </button>

      {/* روابط المنتجات */}
      <div className="text-xs text-gray-400 text-center space-y-0.5">
        <p>» SET-KS134/SET</p>
        <p>» SET-KS137/SET</p>
        <p>» SET-GIFT01/SET</p>
      </div>

      {/* Sidebar */}
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
