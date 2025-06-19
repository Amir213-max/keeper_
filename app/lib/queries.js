import { gql } from 'graphql-request';

export const BROWSE_CATALOG_QUERY = gql`
  query BrowseCatalog($input: CatalogInput) {
    catalog(input: $input) {
      products {
        edges {
          node {
            name
            sku
            images {
              url
            }
            attributeValues{
              label
              attribute{
                label
              
                }
              }
            categories {
              name
            }
            brand {
              name
            }
          }
        }
      }
    }
  }
`



// lib/queries.js (or .ts)



export const GET_PRODUCT_BY_SKU = gql`
  query GetProductBySKU($sku: ID!) {
    product(sku: $sku) {
      name
      sku
      
      images {
        url
      }
      brand {
        name
      }
    }
  }
`;
