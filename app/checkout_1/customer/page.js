"use client";
import { CREATE_ORDER_FROM_CART } from "../../lib/mutations";
import { graphqlClient } from "../../lib/graphqlClient";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { gql } from "graphql-request";

const GET_SHIPPING_CALCULATION = gql`
  query GetShippingCalculation($country_id: ID!) {
    calculateShipping(country_id: $country_id) {
      normal_shipping {
        type
        name
        cost
        estimated_days
      }
      fast_shipping {
        type
        name
        cost
        estimated_days
      }
    }
  }
`;

export default function CustomerPage() {
  const searchParams = useSearchParams();
  const cartId = searchParams.get("cartId");
  const countryId = searchParams.get("countryId");
  const appliedCoupon = searchParams.get("appliedCoupon");

  const [shippingOptions, setShippingOptions] = useState(null);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [paymentType, setPaymentType] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch shipping options
  useEffect(() => {
    if (!countryId) return;
    const fetchShipping = async () => {
      const res = await graphqlClient.request(GET_SHIPPING_CALCULATION, {
        country_id: countryId,
      });
      setShippingOptions(res.calculateShipping);
    };
    fetchShipping();
  }, [countryId]);

  const handlePlaceOrder = async () => {
    if (!cartId) {
      alert("لا يوجد Cart ID");
      return;
    }
    if (!selectedShipping) {
      alert("من فضلك اختر نوع الشحن");
      return;
    }
    if (!paymentType) {
      alert("من فضلك اختر وسيلة الدفع");
      return;
    }

    setLoading(true);
    try {
      const res = await graphqlClient.request(CREATE_ORDER_FROM_CART, {
        cart_id: cartId,
        input: {
          payment_status: paymentType === "COD" ? "PENDING" : "PROCESSING",
          shipping_type: selectedShipping.type,
          reference_id: "WEB-" + Date.now(),
          empty_cart: true,
        },
      });

      alert(`تم إنشاء الأوردر بنجاح برقم: ${res.createOrderFromCart.number}`);
      console.log("Order created:", res.createOrderFromCart);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("حدث خطأ أثناء إنشاء الأوردر");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-yellow-400 p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Customer Page</h1>

      {/* Shipping Options */}
      {shippingOptions && (
        <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Shipping Options</h2>
          {[shippingOptions.normal_shipping, shippingOptions.fast_shipping].map(
            (opt, i) => (
              <div
                key={i}
                onClick={() => setSelectedShipping(opt)}
                className={`p-4 mb-3 rounded-xl cursor-pointer border-2 transition ${
                  selectedShipping?.type === opt.type
                    ? "border-yellow-400 bg-yellow-500 text-black"
                    : "border-zinc-700 hover:border-yellow-400"
                }`}
              >
                <p className="font-bold">{opt.name}</p>
                <p>Cost: {opt.cost} SAR</p>
                <p className="text-sm">Est. {opt.estimated_days} days</p>
              </div>
            )
          )}
        </div>
      )}

      {/* Payment Options */}
      {selectedShipping && (
        <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold mb-3">اختر وسيلة الدفع</h3>
          <div className="flex gap-4">
            <button
              onClick={() => setPaymentType("COD")}
              className={`px-4 py-2 rounded-lg border ${
                paymentType === "COD"
                  ? "bg-yellow-400 text-black"
                  : "bg-black text-white border-yellow-400"
              }`}
            >
              الدفع عند الاستلام
            </button>
            <button
              onClick={() => setPaymentType("TAP")}
              className={`px-4 py-2 rounded-lg border ${
                paymentType === "TAP"
                  ? "bg-yellow-400 text-black"
                  : "bg-black text-white border-yellow-400"
              }`}
            >
              الدفع عبر Tap
            </button>
          </div>
        </div>
      )}

      {/* Place Order Button */}
      {selectedShipping && paymentType && (
        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="w-full bg-yellow-400 text-black py-3 font-bold rounded-xl"
        >
          {loading ? "Processing..." : "Place Order"}
        </button>
      )}
    </div>
  );
}
