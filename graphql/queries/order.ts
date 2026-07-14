import { gql } from "@apollo/client";

export const GET_ORDER = gql`
  query GetOrder($id: ID!) {
    order(id: $id) {
      id
      orderID
      status
      paymentStatus
      paymentMethod
      orderSource
      shippingMethod
      trackingNumber
      totalAmount
      subtotalAmount
      shippingCost
      discountAmount
      vatAmount
      vatPercentage
      paymentUrl
      createdAt
      items {
        quantity
        price
        variation
        product {
          id
          name
          slug
          image
        }
      }
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
    }
  }
`;

export const GET_CUSTOMER_ORDERS = gql`
  query GetCustomerOrders($customer: ID!) {
    orders(customer: $customer) {
      id
      orderID
      status
      paymentStatus
      totalAmount
      createdAt
      items {
        quantity
        price
        product {
          id
          name
          image
        }
      }
    }
  }
`;
