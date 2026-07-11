async function run() {
  const query = `
    query ProductsList($category: String, $limit: Int) {
      products(category: $category, limit: $limit) {
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
  `;
  try {
    const res = await fetch("http://10.255.254.100:4401/gql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        variables: { category: "display", limit: 100 }
      })
    });
    const json = await res.json();
    const list = json.data?.products?.products ?? [];
    console.log(`Total "display" products fetched: ${list.length}`);
    for (const p of list) {
      if (p.name.toLowerCase().includes("gaming") || p.name.toLowerCase().includes("pc") || p.name.toLowerCase().includes("case") || p.name.toLowerCase().includes("laptop") || p.name.toLowerCase().includes("desktop")) {
        console.log(`- ${p.name}`);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

run();
