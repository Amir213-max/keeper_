import { graphqlClient } from "../lib/graphqlClient";
import { BROWSE_CATALOG_QUERY } from "../lib/queries";
import EquipmenClientPage from "./EquipmenClientpage";




const fetchProductsByCategory = async () => {
    const input = { categoryIds: ["6885","20716409","20716031","20716398","20716016","20716010","89","88","90","10004","20716026","8711","10008","20716015","96","98","10003","20716020","5267"] };
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


  return <EquipmenClientPage products={products} brands={brands}    attributeValues={attributeValues} />;
}






// "name": "Glove Wash",
// "id": "6885",

// "name": "Miscellaneous",
//           "id": "20716409",

//           "name": "Care",
//           "id": "20716031",

//           "name": "Grip enhancer",
//           "id": "20716398",

//           "name": "Towels",
//           "id": "20716016",


//           "name": "GK-Bag",
//           "id": "20716010",

//           "name": "Shin Pads",
//           "id": "89",

//           "name": "Elbow Pads",
//           "id": "88",

//           "name": "Knee Pads",
//           "id": "90",

//           "name": "Helmets",
//           "id": "10004",

//           "name": "Genital",
//           "id": "20716026",

//           "name": "Water Bottles",
//           "id": "8711",

//           "name": "Studs",
//           "id": "10008",

//           "name": "Training aids",
//           "id": "20716015",

//           "name": "Bandages",
//           "id": "96",

//           "name": "Tapes / Pavings",
//           "id": "98",

//           "name": "Key Rings",
//           "id": "10003",

//           "name": "Under gloves",
//           "id": "20716020",

//           "name": "Online goalkeeper training",
//           "id": "5267",

