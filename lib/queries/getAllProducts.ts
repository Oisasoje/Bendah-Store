import { shopifyFetch } from "../shopify";

interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  featuredImage: { url: string; altText: string | null } | null;
  variants: {
    edges: Array<{
      node: { id: string; price: { amount: string; currencyCode: string } };
    }>;
  };
}

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

export async function getAllProducts(limit = 10): Promise<Product[]> {
  const data = await shopifyFetch<{
    products: { edges: Array<{ node: Product }> };
  }>(QUERY, { first: limit });

  return data.products.edges.map((edge) => edge.node);
}
