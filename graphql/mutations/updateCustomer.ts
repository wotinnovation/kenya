import { gql } from "@apollo/client";
import { CUSTOMER_FIELDS } from "@/graphql/fragments/customer";

export const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomer($id: ID!, $input: CustomerInput!) {
    updateCustomer(id: $id, input: $input) {
      ...CustomerFields
    }
  }
  ${CUSTOMER_FIELDS}
`;
