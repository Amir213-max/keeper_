'use client';

import CartSidebar from "@/app/Componants/CartSidebar";
import { useCart } from "@/app/contexts/CartContext";
import { useState } from "react";
import { useTranslation } from "@/app/contexts/TranslationContext";
import toast from "react-hot-toast";
import { addProductToCart } from "@/app/lib/mutations";



export default function ProductDetailsSidebar({ product }) {
  const [cartOpen, setCartOpen] = useState(false);
  const {addToCart} = useCart();
 
  const { t } = useTranslation();
  const exactPrice = product?.priceRange?.exact?.amount ?? 'N/A';
  const listPrice = product?.listPrice?.amount ?? 'N/A';
  const discountPercentage = product?.badges[0]?.label ;

  // const handleAddToCart = () => {
  //   addToCart(product);
  //   setCartOpen(true);
  //   toast.success(t("Added to cart!"));
  // };

  
  const handleAddToCart = async () => {
    try {
      const res = await fetch("/api/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sku: product.sku }),
      });
  
      const data = await res.json();
  
      if (!res.ok) throw new Error(data.error || "Unknown error");
  
      // ✅ خزّنه هنا بعد ما يرجع من السيرفر
      if (typeof window !== 'undefined' && data?.id) {
        localStorage.setItem("cartId", data.id);
      }
  
      toast.success("Added to cart!");
      addToCart(product); // من الـ Context
      setCartOpen(true);
    } catch (err) {
      console.error("Add to cart failed:", err);
      toast.error("Something went wrong!");
    }
  };
  
  

  return (
    <div className="p-5 sm:p-6 md:p-8 b rounded-tr-2xl rounded-br-2xl shadow-lg text-white space-y-6 transition-all duration-300 w-full max-w-md mx-auto">

      <div className="flex justify-center">
        <img
          src={product.images[0]?.url}
          alt={product.brand.name}
          className="w-20 h-20 object-contain mb-2 drop-shadow-xl"
        />
      </div>

      <p className="text-sm text-gray-400 text-center">
        {t("SKU")}: {product.sku}
      </p>

      <div className="text-center space-y-1">
        {/* List Price */}
<p className="text-sm text-gray-400">
  {t("List Price")}:
  {(() => {
    const [intPart, decPart] = (+listPrice).toFixed(2).split(".");
    return (
      <span className="ms-1">
        €{intPart}
        <span className="text-xs ms-0.5 align-middle">.{decPart}</span>
      </span>
    );
  })()}
</p>


<div className="flex justify-center items-center space-x-3 rtl:space-x-reverse">
  {(() => {
    const [intPart, decPart] = (+exactPrice).toFixed(2).split(".");
    return (
      <span className="text-base font-bold text-yellow-400">
        €{intPart}
        <span className="text-xs ms-0.5 align-middle">.{decPart}</span>
      </span>
    );
  })()}
  <span className="text-sm bg-yellow-400 text-black font-semibold px-2 py-1 rounded-full">
    {discountPercentage}
  </span>
</div>

      </div>

      <div className="space-y-1">
        <label className="text-sm">{t("Size")}: X</label>
        <select className="w-full bg-white text-black p-2 rounded-md border-2 border-amber-500 focus:outline-none transition duration-200">
          {[1, 2, 3, 4, 5, 6, 7].map((num) => (
            <option key={num}>{num}</option>
          ))}
        </select>
      </div>

      <div className="text-green-500 flex items-center gap-2 text-sm font-medium">
        🚚 {t("Ready To Ship")}
      </div>

      <button
      onClick={handleAddToCart }
        className="w-full transition-all duration-200 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2.5 rounded-lg shadow-md hover:scale-[1.02]"
      >
        🛒 {t("ADD TO BASKET")}
      </button>

      <div className="text-xs text-gray-400 text-center space-y-0.5">
        <p>» SET-KS134/SET</p>
        <p>» SET-KS137/SET</p>
        <p>» SET-GIFT01/SET</p>
      </div>

      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
