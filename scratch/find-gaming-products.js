async function run() {
  const query = `
    query SearchProducts($search: String) {
      products(limit: 100, search: $search) {
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
  `;
  try {
    const terms = ["Skytech", "AeroCool", "Blaze"];
    for (const term of terms) {
      const res = await fetch("http://10.255.254.100:4401/gql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables: { search: term } })
      });
      const json = await res.json();
      const list = json.data?.products?.products ?? [];
      console.log(`\nSearch term: "${term}" -> found ${list.length} products`);
      for (const p of list) {
        console.log(`- ${p.name}`);
        console.log(`  Categories: ${p.categories.map(c => `${c.name} (${c.slug})`).join(', ')}`);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

run();
