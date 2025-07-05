// app/api/add-to-cart/route.js

import { graphqlClient } from "@/app/lib/graphqlClient";
import { ADD_TO_CART_MUTATION } from "@/app/lib/mutations";

export async function POST(req) {
  try {
    const { sku } = await req.json();

    const variables = {
      input: {
        sku
      }
    };

    const data = await graphqlClient.request(ADD_TO_CART_MUTATION, variables);
    return new Response(
      JSON.stringify({
        id: data.addToCart.cart.id,
        cart: data.addToCart.cart,
      }),
      { status: 200 }
    );
    
  } catch (err) {
    console.error("❌ Add to cart error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
