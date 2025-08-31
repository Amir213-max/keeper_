import { gql } from "graphql-request";

// ✅ جلب كل الـ Main Root Categories (العناوين الرئيسية + الفرعية)
export const MAIN_ROOT_CATEGORIES_QUERY = gql`
  query MainRootCategories {
    mainRootCategories {
      id
      name
      slug
      subCategories {
        id
        name
        slug
      }
    }
  }
`;

// ✅ جلب المنتجات (مع إمكانية تحديد limit/offset)
export const PRODUCTS_QUERY = gql`
  query Products($limit: Int, $offset: Int) {
    products(limit: $limit, offset: $offset) {
      id
      name
      sku
      description
      list_price_amount
      images
      rootCategories {
        id
        name
        slug
        parent {
          id
          name
          slug
        }
      }
    }
  }
`;

// ✅ جلب المنتجات حسب الكاتيجوري (رئيسي أو فرعي)
export const PRODUCTS_BY_CATEGORY_QUERY = gql`
query ProductsByCategory($categoryId: ID!) {
  rootCategory(id: $categoryId) {
    id
    name
   
    slug
    products {
      list_price_amount
      list_price_currency
      relative_list_price_difference
      price_range_from
      price_range_to
      price_range_currency
      price_range_exact_amount
      price_range_maximum_amount
      price_range_minimum_amount
      id
      name
      sku
      description
      rootCategories {
        id
        name
      }
      images
      brand{
        id
        name
      }
      productAttributeValues {
        id
        key
        attribute {
          id
          label
          key
        }
      }
      
    }
    subCategories {
      id
      name
      slug
      products {
        id
        name
        sku
      
        
        images
        productAttributeValues {
          id
          
          attribute {
            id
            label
          }
        }
      }
    }
  }
}

`;


export const GET_CATEGORIES_QUERY = gql`
  query GetCategories {
    rootCategories {
      id
      name
      subCategories {
        id
        name
      }
    }
  }
`;

export const PRODUCTS_SHOES_QUERY = gql` 


query PRODUCTS_SHOES_QUERY {
  products {
    list_price_amount
    list_price_currency
    relative_list_price_difference
    price_range_from
    price_range_to
    price_range_currency
    price_range_exact_amount
    price_range_maximum_amount
    price_range_minimum_amount
    id
    description
    sku
    name
    are_shoes
    list_price_amount
    brand {
      id
      name
    }
    productAttributeValues {
      id
      key
      attribute {
        id
        label
      }
    }
    images
    rootCategories {
      id
      name
    }
  }
}




`;
// ✅ جلب تفاصيل منتج واحد بالـ ID
export const PRODUCT_QUERY = gql`
  query Product($id: ID!) {
    product(id: $id) {
      id
      name
      sku
      description
      list_price_amount
      images
      variants {
        id
        name
        price
      }
      brand {
        id
        name
      }
      rootCategories {
        id
        name
        slug
      }


      
    }
  }
`;


export const GET_PRODUCT_BY_SKU = gql`
  query GetProductBySku($sku: String!) {
    productBySku(sku: $sku) {
      id
      name
      sku
      description
      
      images
      variants {
        id
        name
        price
      }
      productAttributeValues {
        id
        key
        attribute {
          id
          label
        }
      }
      brand {
        id
        name
      }


      list_price_amount
      list_price_currency
      relative_list_price_difference
      price_range_from
      price_range_to
      price_range_currency
      price_range_exact_amount
      price_range_maximum_amount
      price_range_minimum_amount
    }
  }
`;
