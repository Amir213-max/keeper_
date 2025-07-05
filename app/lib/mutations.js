// lib/mutations.js
import { gql } from "graphql-request";
import { graphqlClient } from "./graphqlClient";

export const ADD_TO_CART_MUTATION = gql`
  mutation AddToCart($input: AddToCartInput!) {
    addToCart(input: $input) {
      cart {
        id
        numberOfItems
        site {
          id
          name
        }
        shippingMethod {
          id
          name
        }
        shippingMethods {
          method {
            id
            name
          }
        }
        paymentMethod {
          id
          name
        }
        paymentMethods {
          method {
            id
          }
        }
        lineItems(merged: true) {
          name
          quantity
          product{
            name
            sku
          }
        }
        customerEmail
        customerPhoneNumber(format: LEGACY)
        shippingAddress {
          addressLine1
          addressLine2
        }
        billingAddress {
          addressLine1
          addressLine2
        }
        isComplete
        isTaxFree
        itemTotal {
          amount
        }

        total(type: Customizations) {
          amount
          currency
        }
        recommendedProducts {
          isOnline
        }
        order {
          id
          number
        }
        referenceId
        placedAt
        predictedShipments {
          items {
            name
            nameWithoutBrand
          }
        }
        preferredShoeSizeRegion
        shippingAddressEqualsBillingAddress
        hasAccountCreationEnabled
        hasNewsletterSubscriptionEnabled
        tariffConfirmation {
          detailsUrl
          threshold {
            amount
          }
        }
        promos {
          message
          sentiment
        }
       
      }
    }
  }
`;







export async function addProductToCart(sku) {
  const variables = {
    input: {
      sku: sku
    }
  };

  const response = await graphqlClient.request(ADD_TO_CART_MUTATION, variables);
  const cart = response.addToCart.cart;

  // ✅ خزّن cartId في المتصفح فقط
  if (typeof window !== 'undefined' && cart?.id) {
    localStorage.setItem("cartId", cart.id);
  }

  return cart;
}







