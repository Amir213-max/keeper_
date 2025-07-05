import { graphqlClient } from "../lib/graphqlClient";
import { BROWSE_CATALOG_QUERY } from "../lib/queries";

import TeamsportClientPage from "./TeamsportClientPage";




const fetchProductsByCategory = async () => {
    const input = { categoryIds: ["20716405","20716427","20716456","20716400","20716406","20716403","20716401","20716402","20716419","20717768","20717766","20716425","20716399","20716004","20716418","20716003","20716412","20716413" ] };
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


  return <TeamsportClientPage products={products} brands={brands}    attributeValues={attributeValues} />;
}





//"20716005" ,"20716011" ,"20716013" ,"20716021" ,"20716006" ,"20716007" ,"20716008" ,"20716009" ,"20716032" ,"20717771" ,"20717770" ,"20717769" ,"20717781" ,"20717780" ,"20717770" ,"20717785" ,"20716408","20716409" ,"66"
