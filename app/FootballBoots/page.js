import { graphqlClient } from "../lib/graphqlClient";
import { BROWSE_CATALOG_QUERY } from "../lib/queries";
import FootballBootsClientpage from "./FootballBootsClientpage";



const fetchProductsByCategory = async () => {
  const input = { categoryIds: ["5269"] };
  const variables = { input };
  const data = await graphqlClient.request(BROWSE_CATALOG_QUERY, variables);
  return data.catalog.products.edges;
};

export default async function Page() {
  const products = await fetchProductsByCategory();

  return <FootballBootsClientpage products={products} />;
}
