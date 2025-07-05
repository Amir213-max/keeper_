import { gql } from 'graphql-request'; 
import { graphqlClient } from './graphqlClient';

export const SET_CHECKOUT_DETAILS = gql`
  mutation SetCheckoutDetails($input: SetCheckoutDetailsInput!) {
    setCheckoutDetails(input: $input) {
      cart {
        id
        numberOfItems
        recipientPhoneNumberV2 {
          e164
        }
        shippingAddress {
          addressLine1
          firstName
          lastName
          postalCode
          countryCode
          locality
        }
        paymentMethod {
          id
          name
        }
      }
    }
  }
`;

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

export async function setCheckoutDetails(input) {
  const variables = { input };
  console.log("🟡 Sending setCheckoutDetails:", JSON.stringify(variables, null, 2));

  const response = await graphqlClient.request(SET_CHECKOUT_DETAILS, variables);
  return response.setCheckoutDetails.cart;
}

export async function createOrder({ cartId, paymentMethodId }) {
  const variables = {
    input: {
      cartId,
      paymentMethodId,
    },
  };

  const response = await graphqlClient.request(CREATE_ORDER, variables);
  const order = response.createOrderFromCart.cart.order;

  if (typeof window !== "undefined") {
    localStorage.setItem("orderDetails", JSON.stringify(order));
  }

  return order;
}
