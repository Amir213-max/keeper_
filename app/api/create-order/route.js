import { CREATE_ORDER } from '@/app/lib/checkout';
import { graphqlClient } from '@/app/lib/graphqlClient';

export async function POST(req) {
  try {
    const body = await req.json();
    const { cartId, paymentMethodId } = body;

    if (!cartId || !paymentMethodId) {
      return new Response(JSON.stringify({ error: "Missing cartId or paymentMethodId" }), {
        status: 400,
      });
    }

    const variables = {
      input: {
        cartId,
        paymentMethodId,
      },
    };

    console.log("🟢 Creating Order:", JSON.stringify(variables, null, 2));

    const response = await graphqlClient.request(CREATE_ORDER, variables);
    const order = response.createOrderFromCart.cart.order;

    // (اختياري): حفظ الأوردر في localStorage يتم على الكلاينت
    return new Response(JSON.stringify({ order }), { status: 200 });
  } catch (err) {
    console.error("❌ Order Creation Error:", err?.response?.errors || err);
    return new Response(
      JSON.stringify({ error: err?.response?.errors?.[0]?.message || err.message }),
      { status: 500 }
    );
  }
}
