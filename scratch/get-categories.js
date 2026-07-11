async function run() {
  const query = `
    query AllCategories {
      categories {
        id
        name
        slug
        parent {
          id
          name
          slug
        }
      }
    }
  `;
  try {
    const res = await fetch("http://10.255.254.100:4401/gql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    });
    const json = await res.json();
    const list = json.data.categories.filter(c => 
      c.parent?.slug === "gaming-pc-and-case" || 
      c.slug === "gaming-pc-and-case"
    );
    console.log(JSON.stringify(list, null, 2));
  } catch (err) {
    console.error("Error fetching categories:", err);
  }
}

run();
