import { gql } from "@apollo/client";
import { CATEGORY_CARD_FIELDS } from "@/graphql/fragments/category";

export const TOP_LEVEL_CATEGORIES = gql`
  ${CATEGORY_CARD_FIELDS}
  query TopLevelCategories {
    categories(parent: null) {
      ...CategoryCardFields
    }
  }
`;

export const CATEGORY_BY_SLUG = gql`
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
