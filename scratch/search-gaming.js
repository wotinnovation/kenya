async function run() {
  const query = `
    query SearchProducts($search: String, $limit: Int) {
      products(limit: $limit, search: $search) {
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
      body: JSON.stringify({ query, variables: { search: "Gaming", limit: 415 } })
    });
    const json = await res.json();
    const list = json.data?.products?.products ?? [];
    console.log(`Total "Gaming" products: ${list.length}`);
    
    // Filter matching PC, Desktop, Laptop, Case
    const matches = list.filter(p => 
      p.name.toLowerCase().includes("pc") || 
      p.name.toLowerCase().includes("desktop") || 
      p.name.toLowerCase().includes("laptop") || 
      p.name.toLowerCase().includes("case") || 
      p.name.toLowerCase().includes("tower") ||
      p.name.toLowerCase().includes("chassis")
    );
    console.log(`Matching "Gaming" + (PC/Desktop/Laptop/Case/Tower/Chassis): ${matches.length}`);
    for (const m of matches) {
      console.log(`- ${m.name}`);
      console.log(`  Categories: ${m.categories.map(c => `${c.name} (${c.slug})`).join(', ')}`);
    }
  } catch (err) {
    console.error(err);
  }
}

run();
