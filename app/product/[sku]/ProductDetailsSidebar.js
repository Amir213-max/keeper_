"use client";
import { useState } from "react";
import { addToCartTempUser } from "@/app/lib/mutations";
import { useRouter } from "next/navigation";

export default function ProductDetailsSidebar({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const router = useRouter();

  // ➕ إضافة المنتج للكارت
  const addToCart = async () => {
    setAdding(true);
    try {
      const updatedCart = await addToCartTempUser(
        product.id,
        quantity,
        product.list_price_amount || 0
      );
      console.log("✅ Cart Updated:", updatedCart);
      alert(`${product.name} added to cart!`);
    } catch (err) {
      console.error("❌ Error adding to cart:", err);
      alert("Failed to add to cart. Check console for details.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded-2xl shadow-lg w-full">
      {/* أول صورة للمنتج */}
      {product.images && product.images.length > 0 && (
        <div className="w-full h-64 overflow-hidden rounded-xl">
          <img
            src={product.images[0]}
            alt={product.name}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      {/* بيانات المنتج */}
      <div className="flex flex-col gap-1 text-neutral-800">
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p className="text-lg font-semibold text-amber-600">
          ${product.list_price_amount || "N/A"}
        </p>
      </div>

      {/* اختيار الكمية */}
      <div className="flex items-center gap-2 text-neutral-800">
        <label className="font-medium">Qty:</label>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-16 p-1 rounded border border-gray-300"
        />
      </div>

      {/* أزرار Add to Cart و Checkout */}
      <div className="flex flex-col gap-2">
        <button
          onClick={addToCart}
          disabled={adding}
          className="bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition"
        >
          {adding ? "Adding..." : "Add to Cart"}
        </button>

        <button
          onClick={() => router.push("/checkout")}
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded transition"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
