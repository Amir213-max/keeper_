import { gql } from "graphql-request";
import { graphqlClient } from "./graphqlClient";

// ✅ Create order from cart (Checkout)
export const CREATE_ORDER = gql`
  mutation CreateOrderFromCart($input: CreateOrderFromCartInput!) {
    createOrderFromCart(input: $input) {
      cart {
        id
        order {
          id
          number
        }
      }
    }
  }
`;

export async function createOrder({ cartId, paymentMethodId }) {
  const variables = {
    input: {
      cart_id: cartId,           
      payment_method_id: paymentMethodId, 
    },
  };

  console.log("🟡 Sending createOrderFromCart:", JSON.stringify(variables, null, 2));

  const response = await graphqlClient.request(CREATE_ORDER, variables);
  const order = response.createOrderFromCart.cart.order;

 
  if (typeof window !== "undefined") {
    localStorage.setItem("orderDetails", JSON.stringify(order));
  }

  return order;
}
