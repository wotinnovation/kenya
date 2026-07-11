const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://Vercel-Admin-kenya:egcUDEs96SpAbynN@kenya.uccnfae.mongodb.net/kenya?retryWrites=true&w=majority";

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");

    const Product = mongoose.model('Product', new mongoose.Schema({
      name: String,
      categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]
    }), 'products');

    const id1 = new mongoose.Types.ObjectId("6a4fa353b4a08675c8bb7919");
    const id2 = new mongoose.Types.ObjectId("6a4fa354b4a08675c8bb791d");

    // 1. Add id2 to products that have id1
    console.log("Adding new category ID to products...");
    const addResult = await Product.updateMany(
      { categories: id1 },
      { $addToSet: { categories: id2 } }
    );
    console.log(`Updated ${addResult.modifiedCount} products to add new category.`);

    // 2. Remove id1 from products that have id1
    console.log("Removing old category ID from products...");
    const removeResult = await Product.updateMany(
      { categories: id1 },
      { $pull: { categories: id1 } }
    );
    console.log(`Updated ${removeResult.modifiedCount} products to remove old category.`);

    console.log("Bulk migration completed successfully.");

  } catch (err) {
    console.error("Migration Error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

run();
