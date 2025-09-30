"use client";

import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();

  const orderId = searchParams.get("orderId");
  const orderNumber = searchParams.get("orderNumber");
  const shippingType = searchParams.get("shippingType");
  const shippingCost = searchParams.get("shippingCost");
  const total = searchParams.get("total");
  const discount = searchParams.get("discount");

  return (
    <div className="min-h-screen bg-black text-yellow-400 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Order Success!</h1>
      <p>Order Number: <strong>{orderNumber}</strong></p>
      <p>Order ID: <strong>{orderId}</strong></p>
      <p>Shipping Type: <strong>{shippingType}</strong></p>
      <p>Shipping Cost: <strong>{shippingCost} SAR</strong></p>
      <p>Discount: <strong>{discount} SAR</strong></p>
      <p>Total Paid: <strong>{total} SAR</strong></p>

      <p className="mt-6 text-center text-sm text-gray-400">
        شكراً لتسوقك معنا!
      </p>
    </div>
  );
}
