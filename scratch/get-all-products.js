async function run() {
  const query = `
    query AllProducts($limit: Int, $search: String) {
      products(limit: $limit, search: $search) {
        total
        products {
          id
          name
          slug
          categories {
            id
            name
            slug
          }
        }
      }
    }
  `;
  try {
    // 1. Total products in DB
    let res = await fetch("http://10.255.254.100:4401/gql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { limit: 1 } })
    });
    let json = await res.json();
    console.log(`Total products in database: ${json.data?.products?.total}`);

    // 2. Query with search "Gaming"
    res = await fetch("http://10.255.254.100:4401/gql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { limit: 100, search: "Gaming" } })
    });
    json = await res.json();
    let searchProducts = json.data?.products?.products ?? [];
    console.log(`\nFound ${searchProducts.length} products searching for "Gaming":`);
    for (const p of searchProducts) {
      console.log(`- ${p.name} (Slug: ${p.slug})`);
      console.log(`  Categories: ${p.categories.map(c => `${c.name} (${c.slug})`).join(', ')}`);
    }

    // 3. Query with search "Case"
    res = await fetch("http://10.255.254.100:4401/gql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { limit: 100, search: "Case" } })
    });
    json = await res.json();
    searchProducts = json.data?.products?.products ?? [];
    console.log(`\nFound ${searchProducts.length} products searching for "Case":`);
    for (const p of searchProducts) {
      console.log(`- ${p.name} (Slug: ${p.slug})`);
      console.log(`  Categories: ${p.categories.map(c => `${c.name} (${c.slug})`).join(', ')}`);
    }

  } catch (err) {
    console.error("Error:", err);
  }
}

run();
