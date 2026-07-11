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

    const catId = new mongoose.Types.ObjectId("6a4fa354b4a08675c8bb791d");

    // Permanent hard delete
    const result = await Product.deleteMany({ categories: catId });
    console.log(`Permanently hard-deleted ${result.deletedCount} products from the database.`);

  } catch (err) {
    console.error("Hard Deletion Error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

run();
