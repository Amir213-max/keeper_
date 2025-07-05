'use client';

import { useCart } from '../contexts/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from '../contexts/TranslationContext';
import { useState } from 'react';


import { createOrder, setCheckoutDetails } from '../lib/checkout';


export default function CheckoutPage() {
  const { cartItems, increaseQuantity, decreaseQuantity } = useCart();
  const router = useRouter();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    zip: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
    
  });
  

 // state جديد لتخزين وسيلة الدفع
const [paymentMethodId, setPaymentMethodId] = useState('');

// مثال مبدأي لوسائل الدفع (من API في الحقيقة)
const paymentMethods = [
  { id: "pm_cash", name: "Cash on Delivery" },
  { id: "pm_card", name: "Credit Card" },
  { id: "pm_paypal", name: "PayPal" },
];

const handlePlaceOrder = async (e) => {
  e.preventDefault();

  const cartId = typeof window !== 'undefined' ? localStorage.getItem('cartId') : null;
  if (!cartId) {
    alert("❌ لا يوجد سلة حالياً. أضف منتجات أولاً.");
    return;
  }

  if (!paymentMethodId) {
    alert("❌ اختر وسيلة الدفع.");
    return;
  }

  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartId,
        paymentMethodId, // ⬅️ تم الإضافة هنا
        shippingPhoneNumber: formData.phone,
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          addressLine1: formData.address,
          postalCode: formData.zip,
          locality: formData.city,
          countryCode: formData.country,
        },
      }),
    });

    const data = await res.json();
    console.log("🟥 API Response:", data);

    if (!res.ok) {
      throw new Error(data.error || "Failed to set checkout details");
    }

    router.push("/order-confirmation");
  } catch (err) {
    console.error(err);
    alert("❌ حدث خطأ أثناء تأكيد الطلب.");
  }
};

  
  
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price?.value * item.quantity,
    0
  );

  return (
    <div className="min-h-screen text-neutral-700 bg-gray-100 p-4 sm:p-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Shipping Form */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-6">{t("Shipping Information")}</h2>
          <form className="space-y-4" onSubmit={handlePlaceOrder}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={t("First Name")}
                className="border p-3 rounded w-full"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
              <input
                type="text"
                placeholder={t("Last Name")}
                className="border p-3 rounded w-full"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
            {/* <input
              type="email"
              placeholder={t("Email Address")}
              className="border p-3 rounded w-full"
              required
              value={formData.email}
              // onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            /> */}
            <input
              type="text"
              placeholder={t("Phone Number")}
              className="border p-3 rounded w-full"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <input
              type="text"
              placeholder={t("Street Address")}
              className="border p-3 rounded w-full"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
            <input
              type="text"
              placeholder={t("ZIP")}
              className="border p-3 rounded w-full"
              required
              value={formData.zip}
              onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder={t("City")}
                className="border p-3 rounded w-full"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
              <input
                type="text"
                placeholder={t("Postal Code")}
                className="border p-3 rounded w-full"
                required
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
              />
              <input
                type="text"
                placeholder={t("Country")}
                className="border p-3 rounded w-full"
                required
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              />
            </div>
            <div className="mt-6">
  <h3 className="text-lg font-semibold mb-2">{t("Payment Method")}</h3>
  <div className="space-y-2">
    {paymentMethods.map((method) => (
      <label key={method.id} className="flex items-center gap-3">
        <input
          type="radio"
          name="paymentMethod"
          value={method.id}
          checked={paymentMethodId === method.id}
          onChange={() => setPaymentMethodId(method.id)}
          className="accent-yellow-500"
        />
        <span className="text-sm">{method.name}</span>
      </label>
    ))}
  </div>
</div>

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded-lg"
            >
              🚚 {t("Confirm and Pay")}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4">{t("Order Summary")}</h2>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {cartItems.map((item, i) => (
              <div key={i} className="flex gap-4 items-center border-b pb-3">
                <img
                  src={item.images[0]?.url}
                  alt={item.name}
                  className="w-16 h-16 rounded object-cover border"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                  <p className="text-sm text-gray-500">{t("Brand:")} {item.brand?.name}</p>
                  <p className="text-sm font-semibold">
                    €{(item.price?.value * item.quantity).toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-2 py-1 border rounded hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="px-2 py-1 border rounded hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between">
              <span className="text-sm">{t("Subtotal")}</span>
              <span className="font-bold">€{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-sm">{t("Shipping")}</span>
              <span className="text-sm text-green-600 font-semibold">{t("Free")}</span>
            </div>
            <div className="flex justify-between text-lg font-bold mt-4">
              <span>{t("Total")}</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="w-full mt-4 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded-lg"
            >
              ✅ {t("Place Order")}
            </button>
            <Link href="/" className="block mt-4 text-sm text-blue-600 hover:underline text-center">
              ← {t("Continue Shopping")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
