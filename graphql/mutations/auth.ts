import { gql } from "@apollo/client";
import { CUSTOMER_FIELDS } from "@/graphql/fragments/customer";

export const LOGIN = gql`
  ${CUSTOMER_FIELDS}
  mutation Login($email: String!, $password: String!, $role: String) {
    login(email: $email, password: $password, role: $role) {
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

export const CREATE_CUSTOMER = gql`
  ${CUSTOMER_FIELDS}
  mutation CreateCustomer($input: CustomerInput!) {
    createCustomer(input: $input) {
      ...CustomerFields
    }
  }
`;

export const VERIFY_OTP = gql`
  ${CUSTOMER_FIELDS}
  mutation VerifyOtp($email: String!, $otp: String!) {
    verifyOTP(email: $email, otp: $otp) {
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

export const RESEND_OTP = gql`
  mutation ResendOtp($email: String!) {
    resendOTP(email: $email)
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($id: ID!, $oldPassword: String!, $newPassword: String!) {
    changePassword(id: $id, oldPassword: $oldPassword, newPassword: $newPassword)
  }
`;
