/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import * as Types from './schema-types';

export type AddressInput = {
  address?: string | null | undefined;
  city?: string | null | undefined;
  email?: string | null | undefined;
  firstName?: string | null | undefined;
  lastName?: string | null | undefined;
  phone?: string | null | undefined;
  state?: string | null | undefined;
  zip?: string | null | undefined;
};

export type ContactInput = {
  email: string;
  message: string;
  name: string;
  phone: string;
  subject: string;
};

export type CustomerInput = {
  address?: string | null | undefined;
  billingAddress?: AddressInput | null | undefined;
  city?: string | null | undefined;
  email: string;
  firstName: string;
  lastName: string;
  password?: string | null | undefined;
  phone?: string | null | undefined;
  shippingAddress?: AddressInput | null | undefined;
  state?: string | null | undefined;
  zip?: string | null | undefined;
};

export type CategoryCardFieldsFragment = { id: string | null, name: string | null, slug: string | null, image: string | null };

export type CustomerFieldsFragment = { id: string | null, firstName: string | null, lastName: string | null, email: string | null, phone: string | null, address: string | null, city: string | null, state: string | null, zip: string | null, isEmailVerified: boolean | null, isPhoneVerified: boolean | null, status: string | null, createdAt: string | null, billingAddress: { firstName: string | null, lastName: string | null, email: string | null, phone: string | null, address: string | null, city: string | null, state: string | null, zip: string | null } | null, shippingAddress: { firstName: string | null, lastName: string | null, email: string | null, phone: string | null, address: string | null, city: string | null, state: string | null, zip: string | null } | null };

export type ProductCardFieldsFragment = { id: string | null, name: string | null, slug: string | null, price: number | null, regularPrice: number | null, salePrice: number | null, image: string | null, stock: number | null, stockStatus: string | null, categories: Array<{ id: string | null, name: string | null, slug: string | null } | null> | null };

export type ProductDetailFieldsFragment = { id: string | null, name: string | null, slug: string | null, description: string | null, shortDescription: string | null, isFeatured: boolean | null, price: number | null, regularPrice: number | null, salePrice: number | null, sku: string | null, stock: number | null, stockStatus: string | null, image: string | null, gallery: Array<string | null> | null, tags: Array<string | null> | null, attributes: Array<{ name: string | null, options: Array<string | null> | null, visible: boolean | null, variation: boolean | null } | null> | null, variations: Array<{ sku: string | null, price: number | null, regularPrice: number | null, salePrice: number | null, stock: number | null, stockStatus: string | null, image: string | null, attributes: Array<{ name: string | null, option: string | null } | null> | null } | null> | null, priceRange: { min: number | null, max: number | null, display: string | null } | null, categories: Array<{ id: string | null, name: string | null, slug: string | null } | null> | null, brand: { id: string | null, name: string | null, slug: string | null } | null };

export type LoginMutationVariables = Exact<{
  email: string;
  password: string;
  role?: string | null | undefined;
}>;


export type LoginMutation = { login: { token: string | null, id: string | null, email: string | null, name: string | null, role: string | null, customer: { id: string | null, firstName: string | null, lastName: string | null, email: string | null, phone: string | null, address: string | null, city: string | null, state: string | null, zip: string | null, isEmailVerified: boolean | null, isPhoneVerified: boolean | null, status: string | null, createdAt: string | null, billingAddress: { firstName: string | null, lastName: string | null, email: string | null, phone: string | null, address: string | null, city: string | null, state: string | null, zip: string | null } | null, shippingAddress: { firstName: string | null, lastName: string | null, email: string | null, phone: string | null, address: string | null, city: string | null, state: string | null, zip: string | null } | null } | null } | null };

export type CreateCustomerMutationVariables = Exact<{
  input: Types.CustomerInput;
}>;


export type CreateCustomerMutation = { createCustomer: { id: string | null, firstName: string | null, lastName: string | null, email: string | null, phone: string | null, address: string | null, city: string | null, state: string | null, zip: string | null, isEmailVerified: boolean | null, isPhoneVerified: boolean | null, status: string | null, createdAt: string | null, billingAddress: { firstName: string | null, lastName: string | null, email: string | null, phone: string | null, address: string | null, city: string | null, state: string | null, zip: string | null } | null, shippingAddress: { firstName: string | null, lastName: string | null, email: string | null, phone: string | null, address: string | null, city: string | null, state: string | null, zip: string | null } | null } | null };

export type VerifyOtpMutationVariables = Exact<{
  email: string;
  otp: string;
}>;


export type VerifyOtpMutation = { verifyOTP: { token: string | null, id: string | null, email: string | null, name: string | null, role: string | null, customer: { id: string | null, firstName: string | null, lastName: string | null, email: string | null, phone: string | null, address: string | null, city: string | null, state: string | null, zip: string | null, isEmailVerified: boolean | null, isPhoneVerified: boolean | null, status: string | null, createdAt: string | null, billingAddress: { firstName: string | null, lastName: string | null, email: string | null, phone: string | null, address: string | null, city: string | null, state: string | null, zip: string | null } | null, shippingAddress: { firstName: string | null, lastName: string | null, email: string | null, phone: string | null, address: string | null, city: string | null, state: string | null, zip: string | null } | null } | null } | null };

export type ResendOtpMutationVariables = Exact<{
  email: string;
}>;


export type ResendOtpMutation = { resendOTP: boolean | null };

export type ChangePasswordMutationVariables = Exact<{
  id: string | number;
  oldPassword: string;
  newPassword: string;
}>;


export type ChangePasswordMutation = { changePassword: boolean | null };

export type CreateContactMutationVariables = Exact<{
  input: Types.ContactInput;
}>;


export type CreateContactMutation = { createContact: { id: string | null, contactID: string | null } | null };

export type VerifyAuthQueryVariables = Exact<{ [key: string]: never; }>;


export type VerifyAuthQuery = { verifyAuth: { token: string | null, id: string | null, email: string | null, name: string | null, role: string | null, customer: { id: string | null, firstName: string | null, lastName: string | null, email: string | null, phone: string | null, address: string | null, city: string | null, state: string | null, zip: string | null, isEmailVerified: boolean | null, isPhoneVerified: boolean | null, status: string | null, createdAt: string | null, billingAddress: { firstName: string | null, lastName: string | null, email: string | null, phone: string | null, address: string | null, city: string | null, state: string | null, zip: string | null } | null, shippingAddress: { firstName: string | null, lastName: string | null, email: string | null, phone: string | null, address: string | null, city: string | null, state: string | null, zip: string | null } | null } | null } | null };

export type TopLevelCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type TopLevelCategoriesQuery = { categories: Array<{ id: string | null, name: string | null, slug: string | null, image: string | null } | null> | null };

export type CategoryBySlugQueryVariables = Exact<{
  slug?: string | null | undefined;
}>;


export type CategoryBySlugQuery = { category: { id: string | null, name: string | null, slug: string | null, description: string | null, image: string | null, metaTitle: string | null, metaDescription: string | null, parent: { id: string | null, name: string | null, slug: string | null } | null, children: Array<{ id: string | null, name: string | null, slug: string | null } | null> | null } | null };

export type ProductsListQueryVariables = Exact<{
  page?: number | null | undefined;
  limit?: number | null | undefined;
  category?: string | null | undefined;
  brand?: string | number | null | undefined;
  search?: string | null | undefined;
  status?: string | null | undefined;
}>;


export type ProductsListQuery = { products: { total: number | null, page: number | null, pages: number | null, products: Array<{ id: string | null, name: string | null, slug: string | null, price: number | null, regularPrice: number | null, salePrice: number | null, image: string | null, stock: number | null, stockStatus: string | null, categories: Array<{ id: string | null, name: string | null, slug: string | null } | null> | null } | null> | null } | null };

export type ProductBySlugQueryVariables = Exact<{
  slug?: string | null | undefined;
}>;


export type ProductBySlugQuery = { product: { id: string | null, name: string | null, slug: string | null, description: string | null, shortDescription: string | null, isFeatured: boolean | null, price: number | null, regularPrice: number | null, salePrice: number | null, sku: string | null, stock: number | null, stockStatus: string | null, image: string | null, gallery: Array<string | null> | null, tags: Array<string | null> | null, attributes: Array<{ name: string | null, options: Array<string | null> | null, visible: boolean | null, variation: boolean | null } | null> | null, variations: Array<{ sku: string | null, price: number | null, regularPrice: number | null, salePrice: number | null, stock: number | null, stockStatus: string | null, image: string | null, attributes: Array<{ name: string | null, option: string | null } | null> | null } | null> | null, priceRange: { min: number | null, max: number | null, display: string | null } | null, categories: Array<{ id: string | null, name: string | null, slug: string | null } | null> | null, brand: { id: string | null, name: string | null, slug: string | null } | null } | null };

export type FeaturedProductsListQueryVariables = Exact<{
  category?: string | null | undefined;
  limit?: number | null | undefined;
}>;


export type FeaturedProductsListQuery = { featuredProducts: Array<{ id: string | null, name: string | null, slug: string | null, price: number | null, regularPrice: number | null, salePrice: number | null, image: string | null, stock: number | null, stockStatus: string | null, categories: Array<{ id: string | null, name: string | null, slug: string | null } | null> | null } | null> | null };
