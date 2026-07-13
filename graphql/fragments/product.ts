import { gql } from "@apollo/client";

export const PRODUCT_CARD_FIELDS = gql`
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

export const PRODUCT_DETAIL_FIELDS = gql`
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
