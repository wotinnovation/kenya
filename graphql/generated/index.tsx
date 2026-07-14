import * as Types from './types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export const CategoryCardFieldsFragmentDoc = gql`
    fragment CategoryCardFields on Category {
  id
  name
  slug
  image
}
    `;
export const CustomerFieldsFragmentDoc = gql`
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
export const ProductCardFieldsFragmentDoc = gql`
    fragment ProductCardFields on Product {
  id
  name
  slug
  price
  regularPrice
  salePrice
  image
  stock
  stockStatus
  categories {
    id
    name
    slug
  }
  sku
  model
  gallery
  shortDescription
  specifications {
    name
    value
  }
  brand {
    id
    name
    slug
  }
  attributes {
    name
    options
    variation
  }
  variations {
    image
    price
    salePrice
    regularPrice
    attributes {
      name
      option
    }
  }
}
    `;
export const ProductDetailFieldsFragmentDoc = gql`
    fragment ProductDetailFields on Product {
  id
  name
  slug
  description
  shortDescription
  isFeatured
  price
  regularPrice
  salePrice
  sku
  model
  stock
  stockStatus
  image
  gallery
  tags
  keyFeatures
  specifications {
    name
    value
  }
  metaTitle
  metaDescription
  attributes {
    name
    options
    visible
    variation
  }
  variations {
    sku
    price
    regularPrice
    salePrice
    stock
    stockStatus
    image
    attributes {
      name
      option
    }
  }
  priceRange {
    min
    max
    display
  }
  categories {
    id
    name
    slug
    parent {
      id
      name
      slug
    }
  }
  brand {
    id
    name
    slug
  }
}
    `;
export const LoginDocument = gql`
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
    ${CustomerFieldsFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<Types.LoginMutation, Types.LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      role: // value for 'role'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<Types.LoginMutation, Types.LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.LoginMutation, Types.LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<Types.LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<Types.LoginMutation, Types.LoginMutationVariables>;
export const CreateCustomerDocument = gql`
    mutation CreateCustomer($input: CustomerInput!) {
  createCustomer(input: $input) {
    ...CustomerFields
  }
}
    ${CustomerFieldsFragmentDoc}`;
export type CreateCustomerMutationFn = Apollo.MutationFunction<Types.CreateCustomerMutation, Types.CreateCustomerMutationVariables>;

/**
 * __useCreateCustomerMutation__
 *
 * To run a mutation, you first call `useCreateCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCustomerMutation, { data, loading, error }] = useCreateCustomerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCustomerMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateCustomerMutation, Types.CreateCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateCustomerMutation, Types.CreateCustomerMutationVariables>(CreateCustomerDocument, options);
      }
export type CreateCustomerMutationHookResult = ReturnType<typeof useCreateCustomerMutation>;
export type CreateCustomerMutationResult = Apollo.MutationResult<Types.CreateCustomerMutation>;
export type CreateCustomerMutationOptions = Apollo.BaseMutationOptions<Types.CreateCustomerMutation, Types.CreateCustomerMutationVariables>;
export const VerifyOtpDocument = gql`
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
    ${CustomerFieldsFragmentDoc}`;
export type VerifyOtpMutationFn = Apollo.MutationFunction<Types.VerifyOtpMutation, Types.VerifyOtpMutationVariables>;

/**
 * __useVerifyOtpMutation__
 *
 * To run a mutation, you first call `useVerifyOtpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyOtpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyOtpMutation, { data, loading, error }] = useVerifyOtpMutation({
 *   variables: {
 *      email: // value for 'email'
 *      otp: // value for 'otp'
 *   },
 * });
 */
export function useVerifyOtpMutation(baseOptions?: Apollo.MutationHookOptions<Types.VerifyOtpMutation, Types.VerifyOtpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.VerifyOtpMutation, Types.VerifyOtpMutationVariables>(VerifyOtpDocument, options);
      }
export type VerifyOtpMutationHookResult = ReturnType<typeof useVerifyOtpMutation>;
export type VerifyOtpMutationResult = Apollo.MutationResult<Types.VerifyOtpMutation>;
export type VerifyOtpMutationOptions = Apollo.BaseMutationOptions<Types.VerifyOtpMutation, Types.VerifyOtpMutationVariables>;
export const ResendOtpDocument = gql`
    mutation ResendOtp($email: String!) {
  resendOTP(email: $email)
}
    `;
export type ResendOtpMutationFn = Apollo.MutationFunction<Types.ResendOtpMutation, Types.ResendOtpMutationVariables>;

/**
 * __useResendOtpMutation__
 *
 * To run a mutation, you first call `useResendOtpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendOtpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendOtpMutation, { data, loading, error }] = useResendOtpMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useResendOtpMutation(baseOptions?: Apollo.MutationHookOptions<Types.ResendOtpMutation, Types.ResendOtpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ResendOtpMutation, Types.ResendOtpMutationVariables>(ResendOtpDocument, options);
      }
export type ResendOtpMutationHookResult = ReturnType<typeof useResendOtpMutation>;
export type ResendOtpMutationResult = Apollo.MutationResult<Types.ResendOtpMutation>;
export type ResendOtpMutationOptions = Apollo.BaseMutationOptions<Types.ResendOtpMutation, Types.ResendOtpMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($id: ID!, $oldPassword: String!, $newPassword: String!) {
  changePassword(id: $id, oldPassword: $oldPassword, newPassword: $newPassword)
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<Types.ChangePasswordMutation, Types.ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      id: // value for 'id'
 *      oldPassword: // value for 'oldPassword'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<Types.ChangePasswordMutation, Types.ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ChangePasswordMutation, Types.ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<Types.ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<Types.ChangePasswordMutation, Types.ChangePasswordMutationVariables>;
export const CreateContactDocument = gql`
    mutation CreateContact($input: ContactInput!) {
  createContact(input: $input) {
    id
    contactID
  }
}
    `;
export type CreateContactMutationFn = Apollo.MutationFunction<Types.CreateContactMutation, Types.CreateContactMutationVariables>;

/**
 * __useCreateContactMutation__
 *
 * To run a mutation, you first call `useCreateContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createContactMutation, { data, loading, error }] = useCreateContactMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateContactMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateContactMutation, Types.CreateContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateContactMutation, Types.CreateContactMutationVariables>(CreateContactDocument, options);
      }
export type CreateContactMutationHookResult = ReturnType<typeof useCreateContactMutation>;
export type CreateContactMutationResult = Apollo.MutationResult<Types.CreateContactMutation>;
export type CreateContactMutationOptions = Apollo.BaseMutationOptions<Types.CreateContactMutation, Types.CreateContactMutationVariables>;
export const CreateOrderDocument = gql`
    mutation CreateOrder($input: OrderInput!) {
  createOrder(input: $input) {
    id
    orderID
    status
    paymentStatus
    paymentMethod
    totalAmount
    paymentUrl
  }
}
    `;
export type CreateOrderMutationFn = Apollo.MutationFunction<Types.CreateOrderMutation, Types.CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateOrderMutation, Types.CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateOrderMutation, Types.CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<Types.CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<Types.CreateOrderMutation, Types.CreateOrderMutationVariables>;
export const UpdateCustomerDocument = gql`
    mutation UpdateCustomer($id: ID!, $input: CustomerInput!) {
  updateCustomer(id: $id, input: $input) {
    ...CustomerFields
  }
}
    ${CustomerFieldsFragmentDoc}`;
export type UpdateCustomerMutationFn = Apollo.MutationFunction<Types.UpdateCustomerMutation, Types.UpdateCustomerMutationVariables>;

/**
 * __useUpdateCustomerMutation__
 *
 * To run a mutation, you first call `useUpdateCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCustomerMutation, { data, loading, error }] = useUpdateCustomerMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCustomerMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateCustomerMutation, Types.UpdateCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateCustomerMutation, Types.UpdateCustomerMutationVariables>(UpdateCustomerDocument, options);
      }
export type UpdateCustomerMutationHookResult = ReturnType<typeof useUpdateCustomerMutation>;
export type UpdateCustomerMutationResult = Apollo.MutationResult<Types.UpdateCustomerMutation>;
export type UpdateCustomerMutationOptions = Apollo.BaseMutationOptions<Types.UpdateCustomerMutation, Types.UpdateCustomerMutationVariables>;
export const AddToWishlistDocument = gql`
    mutation AddToWishlist($customerId: ID!, $productId: ID!) {
  addToWishlist(customerId: $customerId, productId: $productId) {
    ...CustomerFields
  }
}
    ${CustomerFieldsFragmentDoc}`;
export type AddToWishlistMutationFn = Apollo.MutationFunction<Types.AddToWishlistMutation, Types.AddToWishlistMutationVariables>;

/**
 * __useAddToWishlistMutation__
 *
 * To run a mutation, you first call `useAddToWishlistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToWishlistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToWishlistMutation, { data, loading, error }] = useAddToWishlistMutation({
 *   variables: {
 *      customerId: // value for 'customerId'
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useAddToWishlistMutation(baseOptions?: Apollo.MutationHookOptions<Types.AddToWishlistMutation, Types.AddToWishlistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.AddToWishlistMutation, Types.AddToWishlistMutationVariables>(AddToWishlistDocument, options);
      }
export type AddToWishlistMutationHookResult = ReturnType<typeof useAddToWishlistMutation>;
export type AddToWishlistMutationResult = Apollo.MutationResult<Types.AddToWishlistMutation>;
export type AddToWishlistMutationOptions = Apollo.BaseMutationOptions<Types.AddToWishlistMutation, Types.AddToWishlistMutationVariables>;
export const RemoveFromWishlistDocument = gql`
    mutation RemoveFromWishlist($customerId: ID!, $productId: ID!) {
  removeFromWishlist(customerId: $customerId, productId: $productId) {
    ...CustomerFields
  }
}
    ${CustomerFieldsFragmentDoc}`;
export type RemoveFromWishlistMutationFn = Apollo.MutationFunction<Types.RemoveFromWishlistMutation, Types.RemoveFromWishlistMutationVariables>;

/**
 * __useRemoveFromWishlistMutation__
 *
 * To run a mutation, you first call `useRemoveFromWishlistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFromWishlistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFromWishlistMutation, { data, loading, error }] = useRemoveFromWishlistMutation({
 *   variables: {
 *      customerId: // value for 'customerId'
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useRemoveFromWishlistMutation(baseOptions?: Apollo.MutationHookOptions<Types.RemoveFromWishlistMutation, Types.RemoveFromWishlistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.RemoveFromWishlistMutation, Types.RemoveFromWishlistMutationVariables>(RemoveFromWishlistDocument, options);
      }
export type RemoveFromWishlistMutationHookResult = ReturnType<typeof useRemoveFromWishlistMutation>;
export type RemoveFromWishlistMutationResult = Apollo.MutationResult<Types.RemoveFromWishlistMutation>;
export type RemoveFromWishlistMutationOptions = Apollo.BaseMutationOptions<Types.RemoveFromWishlistMutation, Types.RemoveFromWishlistMutationVariables>;
export const VerifyAuthDocument = gql`
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
    ${CustomerFieldsFragmentDoc}`;

/**
 * __useVerifyAuthQuery__
 *
 * To run a query within a React component, call `useVerifyAuthQuery` and pass it any options that fit your needs.
 * When your component renders, `useVerifyAuthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVerifyAuthQuery({
 *   variables: {
 *   },
 * });
 */
export function useVerifyAuthQuery(baseOptions?: Apollo.QueryHookOptions<Types.VerifyAuthQuery, Types.VerifyAuthQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.VerifyAuthQuery, Types.VerifyAuthQueryVariables>(VerifyAuthDocument, options);
      }
export function useVerifyAuthLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.VerifyAuthQuery, Types.VerifyAuthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.VerifyAuthQuery, Types.VerifyAuthQueryVariables>(VerifyAuthDocument, options);
        }
// @ts-ignore
export function useVerifyAuthSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.VerifyAuthQuery, Types.VerifyAuthQueryVariables>): Apollo.UseSuspenseQueryResult<Types.VerifyAuthQuery, Types.VerifyAuthQueryVariables>;
export function useVerifyAuthSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.VerifyAuthQuery, Types.VerifyAuthQueryVariables>): Apollo.UseSuspenseQueryResult<Types.VerifyAuthQuery | undefined, Types.VerifyAuthQueryVariables>;
export function useVerifyAuthSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.VerifyAuthQuery, Types.VerifyAuthQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.VerifyAuthQuery, Types.VerifyAuthQueryVariables>(VerifyAuthDocument, options);
        }
export type VerifyAuthQueryHookResult = ReturnType<typeof useVerifyAuthQuery>;
export type VerifyAuthLazyQueryHookResult = ReturnType<typeof useVerifyAuthLazyQuery>;
export type VerifyAuthSuspenseQueryHookResult = ReturnType<typeof useVerifyAuthSuspenseQuery>;
export type VerifyAuthQueryResult = Apollo.QueryResult<Types.VerifyAuthQuery, Types.VerifyAuthQueryVariables>;
export const TopLevelCategoriesDocument = gql`
    query TopLevelCategories {
  categories(parent: null) {
    ...CategoryCardFields
  }
}
    ${CategoryCardFieldsFragmentDoc}`;

/**
 * __useTopLevelCategoriesQuery__
 *
 * To run a query within a React component, call `useTopLevelCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTopLevelCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTopLevelCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useTopLevelCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<Types.TopLevelCategoriesQuery, Types.TopLevelCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.TopLevelCategoriesQuery, Types.TopLevelCategoriesQueryVariables>(TopLevelCategoriesDocument, options);
      }
export function useTopLevelCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.TopLevelCategoriesQuery, Types.TopLevelCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.TopLevelCategoriesQuery, Types.TopLevelCategoriesQueryVariables>(TopLevelCategoriesDocument, options);
        }
// @ts-ignore
export function useTopLevelCategoriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.TopLevelCategoriesQuery, Types.TopLevelCategoriesQueryVariables>): Apollo.UseSuspenseQueryResult<Types.TopLevelCategoriesQuery, Types.TopLevelCategoriesQueryVariables>;
export function useTopLevelCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.TopLevelCategoriesQuery, Types.TopLevelCategoriesQueryVariables>): Apollo.UseSuspenseQueryResult<Types.TopLevelCategoriesQuery | undefined, Types.TopLevelCategoriesQueryVariables>;
export function useTopLevelCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.TopLevelCategoriesQuery, Types.TopLevelCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.TopLevelCategoriesQuery, Types.TopLevelCategoriesQueryVariables>(TopLevelCategoriesDocument, options);
        }
export type TopLevelCategoriesQueryHookResult = ReturnType<typeof useTopLevelCategoriesQuery>;
export type TopLevelCategoriesLazyQueryHookResult = ReturnType<typeof useTopLevelCategoriesLazyQuery>;
export type TopLevelCategoriesSuspenseQueryHookResult = ReturnType<typeof useTopLevelCategoriesSuspenseQuery>;
export type TopLevelCategoriesQueryResult = Apollo.QueryResult<Types.TopLevelCategoriesQuery, Types.TopLevelCategoriesQueryVariables>;
export const CategoryBySlugDocument = gql`
    query CategoryBySlug($slug: String) {
  category(slug: $slug) {
    id
    name
    slug
    description
    image
    metaTitle
    metaDescription
    parent {
      id
      name
      slug
    }
    children {
      id
      name
      slug
    }
  }
}
    `;

/**
 * __useCategoryBySlugQuery__
 *
 * To run a query within a React component, call `useCategoryBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useCategoryBySlugQuery(baseOptions?: Apollo.QueryHookOptions<Types.CategoryBySlugQuery, Types.CategoryBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CategoryBySlugQuery, Types.CategoryBySlugQueryVariables>(CategoryBySlugDocument, options);
      }
export function useCategoryBySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CategoryBySlugQuery, Types.CategoryBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CategoryBySlugQuery, Types.CategoryBySlugQueryVariables>(CategoryBySlugDocument, options);
        }
// @ts-ignore
export function useCategoryBySlugSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CategoryBySlugQuery, Types.CategoryBySlugQueryVariables>): Apollo.UseSuspenseQueryResult<Types.CategoryBySlugQuery, Types.CategoryBySlugQueryVariables>;
export function useCategoryBySlugSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.CategoryBySlugQuery, Types.CategoryBySlugQueryVariables>): Apollo.UseSuspenseQueryResult<Types.CategoryBySlugQuery | undefined, Types.CategoryBySlugQueryVariables>;
export function useCategoryBySlugSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.CategoryBySlugQuery, Types.CategoryBySlugQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CategoryBySlugQuery, Types.CategoryBySlugQueryVariables>(CategoryBySlugDocument, options);
        }
export type CategoryBySlugQueryHookResult = ReturnType<typeof useCategoryBySlugQuery>;
export type CategoryBySlugLazyQueryHookResult = ReturnType<typeof useCategoryBySlugLazyQuery>;
export type CategoryBySlugSuspenseQueryHookResult = ReturnType<typeof useCategoryBySlugSuspenseQuery>;
export type CategoryBySlugQueryResult = Apollo.QueryResult<Types.CategoryBySlugQuery, Types.CategoryBySlugQueryVariables>;
export const GetOrderDocument = gql`
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

/**
 * __useGetOrderQuery__
 *
 * To run a query within a React component, call `useGetOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOrderQuery(baseOptions: Apollo.QueryHookOptions<Types.GetOrderQuery, Types.GetOrderQueryVariables> & ({ variables: Types.GetOrderQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GetOrderQuery, Types.GetOrderQueryVariables>(GetOrderDocument, options);
      }
export function useGetOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GetOrderQuery, Types.GetOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GetOrderQuery, Types.GetOrderQueryVariables>(GetOrderDocument, options);
        }
// @ts-ignore
export function useGetOrderSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.GetOrderQuery, Types.GetOrderQueryVariables>): Apollo.UseSuspenseQueryResult<Types.GetOrderQuery, Types.GetOrderQueryVariables>;
export function useGetOrderSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.GetOrderQuery, Types.GetOrderQueryVariables>): Apollo.UseSuspenseQueryResult<Types.GetOrderQuery | undefined, Types.GetOrderQueryVariables>;
export function useGetOrderSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.GetOrderQuery, Types.GetOrderQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.GetOrderQuery, Types.GetOrderQueryVariables>(GetOrderDocument, options);
        }
export type GetOrderQueryHookResult = ReturnType<typeof useGetOrderQuery>;
export type GetOrderLazyQueryHookResult = ReturnType<typeof useGetOrderLazyQuery>;
export type GetOrderSuspenseQueryHookResult = ReturnType<typeof useGetOrderSuspenseQuery>;
export type GetOrderQueryResult = Apollo.QueryResult<Types.GetOrderQuery, Types.GetOrderQueryVariables>;
export const GetCustomerOrdersDocument = gql`
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

/**
 * __useGetCustomerOrdersQuery__
 *
 * To run a query within a React component, call `useGetCustomerOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomerOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomerOrdersQuery({
 *   variables: {
 *      customer: // value for 'customer'
 *   },
 * });
 */
export function useGetCustomerOrdersQuery(baseOptions: Apollo.QueryHookOptions<Types.GetCustomerOrdersQuery, Types.GetCustomerOrdersQueryVariables> & ({ variables: Types.GetCustomerOrdersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GetCustomerOrdersQuery, Types.GetCustomerOrdersQueryVariables>(GetCustomerOrdersDocument, options);
      }
export function useGetCustomerOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GetCustomerOrdersQuery, Types.GetCustomerOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GetCustomerOrdersQuery, Types.GetCustomerOrdersQueryVariables>(GetCustomerOrdersDocument, options);
        }
// @ts-ignore
export function useGetCustomerOrdersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.GetCustomerOrdersQuery, Types.GetCustomerOrdersQueryVariables>): Apollo.UseSuspenseQueryResult<Types.GetCustomerOrdersQuery, Types.GetCustomerOrdersQueryVariables>;
export function useGetCustomerOrdersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.GetCustomerOrdersQuery, Types.GetCustomerOrdersQueryVariables>): Apollo.UseSuspenseQueryResult<Types.GetCustomerOrdersQuery | undefined, Types.GetCustomerOrdersQueryVariables>;
export function useGetCustomerOrdersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.GetCustomerOrdersQuery, Types.GetCustomerOrdersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.GetCustomerOrdersQuery, Types.GetCustomerOrdersQueryVariables>(GetCustomerOrdersDocument, options);
        }
export type GetCustomerOrdersQueryHookResult = ReturnType<typeof useGetCustomerOrdersQuery>;
export type GetCustomerOrdersLazyQueryHookResult = ReturnType<typeof useGetCustomerOrdersLazyQuery>;
export type GetCustomerOrdersSuspenseQueryHookResult = ReturnType<typeof useGetCustomerOrdersSuspenseQuery>;
export type GetCustomerOrdersQueryResult = Apollo.QueryResult<Types.GetCustomerOrdersQuery, Types.GetCustomerOrdersQueryVariables>;
export const ProductsListDocument = gql`
    query ProductsList($page: Int, $limit: Int, $category: String, $brand: ID, $search: String, $status: String) {
  products(
    page: $page
    limit: $limit
    category: $category
    brand: $brand
    search: $search
    status: $status
  ) {
    total
    page
    pages
    products {
      ...ProductCardFields
    }
  }
}
    ${ProductCardFieldsFragmentDoc}`;

/**
 * __useProductsListQuery__
 *
 * To run a query within a React component, call `useProductsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsListQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      category: // value for 'category'
 *      brand: // value for 'brand'
 *      search: // value for 'search'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useProductsListQuery(baseOptions?: Apollo.QueryHookOptions<Types.ProductsListQuery, Types.ProductsListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.ProductsListQuery, Types.ProductsListQueryVariables>(ProductsListDocument, options);
      }
export function useProductsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.ProductsListQuery, Types.ProductsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.ProductsListQuery, Types.ProductsListQueryVariables>(ProductsListDocument, options);
        }
// @ts-ignore
export function useProductsListSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.ProductsListQuery, Types.ProductsListQueryVariables>): Apollo.UseSuspenseQueryResult<Types.ProductsListQuery, Types.ProductsListQueryVariables>;
export function useProductsListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.ProductsListQuery, Types.ProductsListQueryVariables>): Apollo.UseSuspenseQueryResult<Types.ProductsListQuery | undefined, Types.ProductsListQueryVariables>;
export function useProductsListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.ProductsListQuery, Types.ProductsListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.ProductsListQuery, Types.ProductsListQueryVariables>(ProductsListDocument, options);
        }
export type ProductsListQueryHookResult = ReturnType<typeof useProductsListQuery>;
export type ProductsListLazyQueryHookResult = ReturnType<typeof useProductsListLazyQuery>;
export type ProductsListSuspenseQueryHookResult = ReturnType<typeof useProductsListSuspenseQuery>;
export type ProductsListQueryResult = Apollo.QueryResult<Types.ProductsListQuery, Types.ProductsListQueryVariables>;
export const ProductBySlugDocument = gql`
    query ProductBySlug($slug: String) {
  product(slug: $slug) {
    ...ProductDetailFields
  }
}
    ${ProductDetailFieldsFragmentDoc}`;

/**
 * __useProductBySlugQuery__
 *
 * To run a query within a React component, call `useProductBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useProductBySlugQuery(baseOptions?: Apollo.QueryHookOptions<Types.ProductBySlugQuery, Types.ProductBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.ProductBySlugQuery, Types.ProductBySlugQueryVariables>(ProductBySlugDocument, options);
      }
export function useProductBySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.ProductBySlugQuery, Types.ProductBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.ProductBySlugQuery, Types.ProductBySlugQueryVariables>(ProductBySlugDocument, options);
        }
// @ts-ignore
export function useProductBySlugSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.ProductBySlugQuery, Types.ProductBySlugQueryVariables>): Apollo.UseSuspenseQueryResult<Types.ProductBySlugQuery, Types.ProductBySlugQueryVariables>;
export function useProductBySlugSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.ProductBySlugQuery, Types.ProductBySlugQueryVariables>): Apollo.UseSuspenseQueryResult<Types.ProductBySlugQuery | undefined, Types.ProductBySlugQueryVariables>;
export function useProductBySlugSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.ProductBySlugQuery, Types.ProductBySlugQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.ProductBySlugQuery, Types.ProductBySlugQueryVariables>(ProductBySlugDocument, options);
        }
export type ProductBySlugQueryHookResult = ReturnType<typeof useProductBySlugQuery>;
export type ProductBySlugLazyQueryHookResult = ReturnType<typeof useProductBySlugLazyQuery>;
export type ProductBySlugSuspenseQueryHookResult = ReturnType<typeof useProductBySlugSuspenseQuery>;
export type ProductBySlugQueryResult = Apollo.QueryResult<Types.ProductBySlugQuery, Types.ProductBySlugQueryVariables>;
export const FeaturedProductsListDocument = gql`
    query FeaturedProductsList($category: String, $limit: Int) {
  featuredProducts(category: $category, limit: $limit) {
    ...ProductCardFields
  }
}
    ${ProductCardFieldsFragmentDoc}`;

/**
 * __useFeaturedProductsListQuery__
 *
 * To run a query within a React component, call `useFeaturedProductsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeaturedProductsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeaturedProductsListQuery({
 *   variables: {
 *      category: // value for 'category'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useFeaturedProductsListQuery(baseOptions?: Apollo.QueryHookOptions<Types.FeaturedProductsListQuery, Types.FeaturedProductsListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.FeaturedProductsListQuery, Types.FeaturedProductsListQueryVariables>(FeaturedProductsListDocument, options);
      }
export function useFeaturedProductsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.FeaturedProductsListQuery, Types.FeaturedProductsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.FeaturedProductsListQuery, Types.FeaturedProductsListQueryVariables>(FeaturedProductsListDocument, options);
        }
// @ts-ignore
export function useFeaturedProductsListSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.FeaturedProductsListQuery, Types.FeaturedProductsListQueryVariables>): Apollo.UseSuspenseQueryResult<Types.FeaturedProductsListQuery, Types.FeaturedProductsListQueryVariables>;
export function useFeaturedProductsListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.FeaturedProductsListQuery, Types.FeaturedProductsListQueryVariables>): Apollo.UseSuspenseQueryResult<Types.FeaturedProductsListQuery | undefined, Types.FeaturedProductsListQueryVariables>;
export function useFeaturedProductsListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.FeaturedProductsListQuery, Types.FeaturedProductsListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.FeaturedProductsListQuery, Types.FeaturedProductsListQueryVariables>(FeaturedProductsListDocument, options);
        }
export type FeaturedProductsListQueryHookResult = ReturnType<typeof useFeaturedProductsListQuery>;
export type FeaturedProductsListLazyQueryHookResult = ReturnType<typeof useFeaturedProductsListLazyQuery>;
export type FeaturedProductsListSuspenseQueryHookResult = ReturnType<typeof useFeaturedProductsListSuspenseQuery>;
export type FeaturedProductsListQueryResult = Apollo.QueryResult<Types.FeaturedProductsListQuery, Types.FeaturedProductsListQueryVariables>;