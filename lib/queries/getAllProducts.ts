import { shopifyFetch } from "../shopify";

const QUERY = `
  query getAllProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          featuredImage {
            url
            altText
          }
          variants(first: 1) {
            edges {
              node {
                id
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function getAllProducts(limit = 10) {
  const data = await shopifyFetch<{ products: any }>(QUERY, { first: limit });
  return data.products.edges.map((edge: any) => edge.node);
}
