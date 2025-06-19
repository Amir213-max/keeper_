import { graphqlClient } from "../lib/graphqlClient";
import { BROWSE_CATALOG_QUERY } from "../lib/queries";
import GoalkeeperClientPage from "./GoalkeeperClientPage";


const fetchProductsByCategory = async () => {
  const input = { categoryIds: ["17"] };
  const variables = { input };
  const data = await graphqlClient.request(BROWSE_CATALOG_QUERY, variables);
  return data.catalog.products.edges;
};

export default async function Page() {
  const products = await fetchProductsByCategory();
  const attributeMap = {};

  products.forEach((product) => {
    product.node.attributeValues.forEach((attr) => {
      const key = attr.attribute?.label;
      const value = attr.label;
  
      if (key && value) {
        if (!attributeMap[key]) attributeMap[key] = new Set();
        attributeMap[key].add(value);
      }
    });
  });
  
  // تحويل الـ Sets إلى Arrays وجعل البيانات منظمة حسب السمة
  const attributeValues = Object.entries(attributeMap).map(([attribute, values]) => ({
    attribute,
    values: Array.from(values),
  }));
  
  
  const brands = [...new Set(products.map((p) => p.node.brand?.name).filter(Boolean))];


  return <GoalkeeperClientPage products={products} brands={brands}    attributeValues={attributeValues} />;
}
