import { gql } from 'graphql-tag';
export const typeDefinition = gql`#graphql
  interface UIComponent {
    id: ID!
    type: ComponentType!
  }
`;