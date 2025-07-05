import { SET_CHECKOUT_DETAILS, CREATE_ORDER } from '@/app/lib/checkout';
import { graphqlClient } from '@/app/lib/graphqlClient';

export async function POST(req) {
  try {
    const body = await req.json();

    const { cartId, shippingPhoneNumber, shippingAddress, paymentMethodId } = body;

    if (!cartId || !paymentMethodId || !shippingPhoneNumber || !shippingAddress) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    // ✅ Step 1: Set Checkout Details
    const setCheckoutVariables = {
      input: {
        cartId,
        shippingPhoneNumber,
        shippingAddress,
        paymentMethodId,
      },
    };

    console.log("🟡 Setting Checkout Details:", JSON.stringify(setCheckoutVariables, null, 2));
    await graphqlClient.request(SET_CHECKOUT_DETAILS, setCheckoutVariables);

    // ✅ Step 2: Create the Order
    const createOrderVariables = {
      input: {
        cartId,
        paymentMethodId,
      },
    };

    console.log("🟢 Creating Order:", JSON.stringify(createOrderVariables, null, 2));
    const createOrderResponse = await graphqlClient.request(CREATE_ORDER, createOrderVariables);

    const order = createOrderResponse.createOrderFromCart.cart.order;

    // ✅ Save order to localStorage (server doesn't have localStorage, so just return it)
    return new Response(JSON.stringify({ order }), { status: 200 });
  } catch (err) {
    console.error("❌ Checkout Error:", err?.response?.errors || err);
    return new Response(
      JSON.stringify({ error: err?.response?.errors?.[0]?.message || err.message }),
      { status: 500 }
    );
  }

  
}


