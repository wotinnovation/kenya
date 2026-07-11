import { gql } from "@apollo/client";

export const CATEGORY_CARD_FIELDS = gql`
  fragment CategoryCardFields on Category {
    id
    name
    slug
    image
  }
`;
