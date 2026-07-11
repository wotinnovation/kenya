async function run() {
  const query = `
    query ProductsList($category: String, $limit: Int, $status: String) {
      products(category: $category, limit: $limit, status: $status) {
        products {
          id
          name
          slug
        }
      }
    }
  `;
  const categories = [
    "gaming-pc-and-case",
    "gaming-and-vr",
    "gaming-console",
    "gaming-desktop",
    "gaming-headsets",
    "gaming-keyboards",
    "gaming-laptop",
    "gaming-mice",
    "gaming-monitors",
    "gaming-racing-simulator",
    "gaming-setups",
    "gaming-vr-headsets",
    "gaming-chairs",
    "gaming-controllers",
    "gaming-desks",
    "gaming-pc"
  ];
  for (const cat of categories) {
    try {
      const res = await fetch("http://10.255.254.100:4401/gql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          variables: { category: cat, limit: 10, status: "publish" }
        })
      });
      const json = await res.json();
      const count = json.data?.products?.products?.length ?? 0;
      console.log(`Category: ${cat} -> ${count} products`);
    } catch (err) {
      console.error(`Error fetching products for ${cat}:`, err);
    }
  }
}

run();
