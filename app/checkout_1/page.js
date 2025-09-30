"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { gql } from "graphql-request";
import { graphqlClient } from "../lib/graphqlClient";
import { fetchUserCart } from "../lib/mutations";

// ✅ Queries
const GET_COUNTRIES = gql`
  query {
    countries {
      id
      name
      code
      normal_shipping_cost
      fast_shipping_cost
    }
  }
`;

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState(null);
  const [cartId, setCartId] = useState("1");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  // Fetch cart
  useEffect(() => {
    const loadCart = async () => {
      const userCart = await fetchUserCart();
      setCart(userCart);
    };
    loadCart();
  }, []);

  // Fetch countries
  useEffect(() => {
    const loadCountries = async () => {
      const res = await graphqlClient.request(GET_COUNTRIES);
      setCountries(res.countries);
    };
    loadCountries();
  }, []);

  // Apply coupon
  const applyCoupon = () => {
    if (!couponCode) {
      alert("من فضلك أدخل كود الخصم");
      return;
    }
    setAppliedCoupon(couponCode);
    setDiscountAmount(50); // مثال ثابت للخصم
    alert(`تم تطبيق الكوبون: ${couponCode}`);
  };

  // Cart subtotal
  const cartSubtotal = cart
    ? cart.lineItems.reduce(
        (sum, i) => sum + i.product.price_range_exact_amount * i.quantity,
        0
      )
    : 0;

  const totalAfterDiscount = cartSubtotal - discountAmount;

  // Continue → Go to Customer Page
  const handleContinue = () => {
    if (!selectedCountry) {
      alert("من فضلك اختر الدولة");
      return;
    }
    const params = new URLSearchParams({
      cartId,
      countryId: selectedCountry,
      appliedCoupon: appliedCoupon || "",
    });
    router.push(`/checkout_1/customer?${params.toString()}`);
  };

  if (!cart) return <p className="text-white text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-black text-yellow-400 py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-10">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Cart Summary */}
        <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">Your Cart</h2>
          {cart.lineItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white text-black p-4 rounded-xl mb-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.product.images?.[0] || "/no-image.png"}
                  alt={item.product.name}
                  className="w-20 h-20 rounded-lg object-cover border"
                />
                <div>
                  <p className="font-bold">{item.product.name}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="font-bold">
                {item.product.price_range_exact_amount * item.quantity} SAR
              </p>
            </div>
          ))}

          {/* Coupon */}
          <div className="mt-6 flex gap-3">
            <input
              type="text"
              placeholder="ادخل كود الخصم"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="flex-1 p-3 rounded-lg bg-black text-yellow-400 border border-yellow-500"
            />
            <button
              onClick={applyCoupon}
              className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold"
            >
              تطبيق
            </button>
          </div>

          {/* Totals */}
          <div className="mt-6 space-y-2 text-lg">
            <div className="flex justify-between">
              <span>المجموع:</span>
              <span>{cartSubtotal} SAR</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-green-400">
                <span>الخصم:</span>
                <span>- {discountAmount} SAR</span>
              </div>
            )}
            <div className="flex justify-between font-bold border-t border-yellow-500 pt-2">
              <span>الإجمالي:</span>
              <span>{totalAfterDiscount} SAR</span>
            </div>
          </div>
        </div>

        {/* Country Selection */}
        <div className="space-y-6">
          <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg">
            <h2 className="text-lg font-semibold mb-2">Choose Country</h2>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full p-3 rounded-lg bg-black text-yellow-400 border border-yellow-500"
            >
              <option value="">-- اختر الدولة --</option>
              {countries.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.code})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleContinue}
            className="w-full bg-yellow-400 text-black py-3 font-bold rounded-xl"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
