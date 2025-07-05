import { graphqlClient } from "../lib/graphqlClient";
import { BROWSE_CATALOG_QUERY } from "../lib/queries";
import ApparelClientpage from './ApparelClientpage'


const fetchProductsByCategory = async () => {
  const input = { categoryIds: ["20718793" , "20718792" , "18" , "21" , "20716001" , "20716427" , "20719075"] };
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
  
  
  const attributeValues = Object.entries(attributeMap).map(([attribute, values]) => ({
    attribute,
    values: Array.from(values),
  }));
  
  
  const brands = [...new Set(products.map((p) => p.node.brand?.name).filter(Boolean))];


  return <ApparelClientpage products={products} brands={brands}    attributeValues={attributeValues} />;
}





// const input = { categoryIds: ["20717737" , "20717738" , "20717739" ,"20717740" , "20717741" , "20717742" , "20716423" , "20717743" , "20717744" , "20717746" , "20717747" , "20717748"] };
