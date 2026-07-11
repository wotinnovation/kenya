async function run() {
  const query = `
    query AllProducts($limit: Int, $search: String) {
      products(limit: $limit, search: $search) {
        total
      }
    }
  `;
  try {
    let res = await fetch("http://10.255.254.100:4401/gql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { limit: 1 } })
    });
    let json = await res.json();
    console.log(`Total products in database: ${json.data?.products?.total}`);

    let resGaming = await fetch("http://10.255.254.100:4401/gql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: `
        query GamingSearch($search: String) {
          products(limit: 10, search: $search) {
            total
            products {
              name
              slug
              categories {
                name
                slug
              }
            }
          }
        }
      `, variables: { search: "Gaming" } })
    });
    let jsonGaming = await resGaming.json();
    console.log(`Gaming total: ${jsonGaming.data?.products?.total}`);
    console.log("Gaming products:", JSON.stringify(jsonGaming.data?.products?.products, null, 2));

  } catch (err) {
    console.error("Error:", err);
  }
}

run();
