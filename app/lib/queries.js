import { gql } from 'graphql-request';

export const BROWSE_CATALOG_QUERY = gql`
  query BrowseCatalog($input: CatalogInput) {
    catalog(input: $input) {
      products {
        edges {
          node {
            name
            sku
            areShoes
            badges{
              label
            }


            images {
              url
            }
            listPrice{
              amount
              currency
            }
       
             priceRange{
               currency
               exact{amount currency}
               from
               maximum{amount currency}
               minimum{amount currency}
               to
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
      listPrice{
        amount
        currency
      }
      badges{
        label
      }
 
       priceRange{
         currency
         exact{amount currency}
         from
         maximum{amount currency}
         minimum{amount currency}
         to
       }
    
       
      descriptions{
        text
      }
    
    }
  }
`;











