import { gql } from "@apollo/client";

export const CUSTOMER_FIELDS = gql`
  fragment CustomerFields on Customer {
    id
    firstName
    lastName
    email
    phone
    address
    city
    state
    zip
    isEmailVerified
    isPhoneVerified
    status
    createdAt
    billingAddress {
      firstName
      lastName
      email
      phone
      address
      city
      state
      zip
    }
    shippingAddress {
      firstName
      lastName
      email
      phone
      address
      city
      state
      zip
    }
    wishlist {
      id
      name
      slug
      image
      price
      salePrice
      regularPrice
    }
  }
`;
