type Variables = Record<string, unknown>;

export async function shopifyFetch<T>(
  query: string,
  variables: Variables = {}
): Promise<T> {
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  const domain = process.env.SHOPIFY_STORE_DOMAIN;

  if (!token || !domain) {
    throw new Error("Missing Shopify environment variables");
  }

  const response = await fetch(`https://${domain}/api/2024-10/graphql.json`, {
    method: "POST",
    headers: new Headers({
      "X-Shopify-Storefront-Access-Token": token,
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // for ISR
  });

  const json = await response.json();
  if (!response.ok) {
    console.error("Shopify API Error:", json);
    throw new Error("Failed to fetch data from Shopify");
  }

  return json.data;
}
