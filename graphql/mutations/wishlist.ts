import { gql } from "@apollo/client";
import { CUSTOMER_FIELDS } from "@/graphql/fragments/customer";

export const ADD_TO_WISHLIST = gql`
  mutation AddToWishlist($customerId: ID!, $productId: ID!) {
    addToWishlist(customerId: $customerId, productId: $productId) {
      ...CustomerFields
    }
  }
  ${CUSTOMER_FIELDS}
`;

export const REMOVE_FROM_WISHLIST = gql`
  mutation RemoveFromWishlist($customerId: ID!, $productId: ID!) {
    removeFromWishlist(customerId: $customerId, productId: $productId) {
      ...CustomerFields
    }
  }
  ${CUSTOMER_FIELDS}
`;
