const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://Vercel-Admin-kenya:egcUDEs96SpAbynN@kenya.uccnfae.mongodb.net/kenya?retryWrites=true&w=majority";

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    const Category = mongoose.model('Category', new mongoose.Schema({
      name: String,
      slug: String,
      parentCategory: mongoose.Schema.Types.ObjectId
    }), 'categories');

    // Find all categories
    const categories = await Category.find().lean();
    console.log(`Total categories in DB: ${categories.length}`);

    // Filter categories with name "Network" or "Router" or "Switch" or "Access Point"
    const matches = categories.filter(c => 
      c.name.toLowerCase().includes("network") || 
      c.name.toLowerCase().includes("router") || 
      c.name.toLowerCase().includes("switch") || 
      c.name.toLowerCase().includes("point") ||
      c.name.toLowerCase().includes("firewall")
    );

    console.log("Matching categories in DB:");
    console.log(JSON.stringify(matches, null, 2));

  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

run();
