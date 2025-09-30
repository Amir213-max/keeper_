import { NextResponse } from "next/server";
import { graphqlClient } from "@/app/lib/graphqlClient";
import { gql } from "graphql-request";

// ✅ Mutation
const CREATE_TAP_PAYMENT = gql`
  mutation CreateOrderWithTapPayment($input: TapPaymentInput!) {
    createOrderWithTapPayment(input: $input) {
      success
      payment_url
      order_id
      transaction_id
      message
      order {
        id
        number
        shipping_type
        shipping_cost
        total_amount
      }
    }
  }
`;

export async function POST(req) {
  try {
    const body = await req.json();

    const { cart_id, shipping_type } = body;

    // ✅ ضيف الروابط الخاصة بك
    const redirect_url = `${process.env.NEXT_PUBLIC_DOMAIN}/payment-success`;
    const webhook_url = `${process.env.NEXT_PUBLIC_API}/api/payment/webhook`;

    const res = await graphqlClient.request(CREATE_TAP_PAYMENT, {
      input: {
        cart_id,
        shipping_type,
        redirect_url,
        webhook_url,
      },
    });

    return NextResponse.json(res.createOrderWithTapPayment);
  } catch (error) {
    console.error("❌ Error in checkout route:", error);
    return NextResponse.json(
      { error: "Failed to create Tap Payment" },
      { status: 500 }
    );
  }
}
