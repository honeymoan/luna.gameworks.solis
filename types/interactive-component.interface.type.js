import { gql } from 'graphql-tag';
export const typeDefinition = gql`#graphql
  interface InteractiveComponent {
    id: ID!
    onClickAction: String
  }
`;