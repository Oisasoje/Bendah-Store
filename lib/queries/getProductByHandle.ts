import { shopifyFetch } from "../shopify";

const QUERY = `
  query getProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      featuredImage {
        url
        altText
      }
      variants(first: 5) {
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
`;

export async function getProductByHandle(handle: string) {
  const data = await shopifyFetch<{ product: any }>(QUERY, { handle });
  return data.product;
}
