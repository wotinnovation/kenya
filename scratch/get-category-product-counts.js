async function run() {
  const categoriesQuery = `
    query AllCategories {
      categories {
        id
        name
        slug
      }
    }
  `;
  const productsQuery = `
    query ProductsList($category: String, $limit: Int) {
      products(category: $category, limit: $limit) {
        total
      }
    }
  `;
  try {
    const catRes = await fetch("http://10.255.254.100:4401/gql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: categoriesQuery })
    });
    const catJson = await catRes.json();
    const categories = catJson.data?.categories ?? [];
    console.log(`Found ${categories.length} categories.`);

    const results = [];
    for (const cat of categories) {
      const prodRes = await fetch("http://10.255.254.100:4401/gql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: productsQuery,
          variables: { category: cat.slug, limit: 1 }
        })
      });
      const prodJson = await prodRes.json();
      const total = prodJson.data?.products?.total ?? 0;
      if (total > 0) {
        results.push({ name: cat.name, slug: cat.slug, total });
      }
    }

    results.sort((a, b) => b.total - a.total);
    console.log("Categories with products:");
    console.log(JSON.stringify(results, null, 2));

  } catch (err) {
    console.error("Error:", err);
  }
}

run();
