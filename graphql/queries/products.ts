import { gql } from "@apollo/client";
import { PRODUCT_CARD_FIELDS, PRODUCT_DETAIL_FIELDS } from "@/graphql/fragments/product";

export const PRODUCTS_LIST = gql`
  ${PRODUCT_CARD_FIELDS}
  query ProductsList(
    $page: Int
    $limit: Int
    $category: String
    $brand: ID
    $search: String
    $status: String
  ) {
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
`;

export const PRODUCT_BY_SLUG = gql`
  ${PRODUCT_DETAIL_FIELDS}
  query ProductBySlug($slug: String) {
    product(slug: $slug) {
      ...ProductDetailFields
    }
  }
`;

export const FEATURED_PRODUCTS = gql`
  ${PRODUCT_CARD_FIELDS}
  query FeaturedProductsList($category: String, $limit: Int) {
    featuredProducts(category: $category, limit: $limit) {
      ...ProductCardFields
    }
  }
`;
