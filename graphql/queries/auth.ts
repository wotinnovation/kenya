import { gql } from "@apollo/client";
import { CUSTOMER_FIELDS } from "@/graphql/fragments/customer";

export const VERIFY_AUTH = gql`
  ${CUSTOMER_FIELDS}
  query VerifyAuth {
    verifyAuth {
      token
      id
      email
      name
      role
      customer {
        ...CustomerFields
      }
    }
  }
`;
