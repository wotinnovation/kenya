const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://Vercel-Admin-kenya:egcUDEs96SpAbynN@kenya.uccnfae.mongodb.net/kenya?retryWrites=true&w=majority";

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    const Product = mongoose.model('Product', new mongoose.Schema({
      name: String,
      categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]
    }), 'products');

    const id1 = new mongoose.Types.ObjectId("6a4fa353b4a08675c8bb7919");
    const id2 = new mongoose.Types.ObjectId("6a4fa354b4a08675c8bb791d");

    const count1 = await Product.countDocuments({ categories: id1 });
    const count2 = await Product.countDocuments({ categories: id2 });

    console.log(`Products in Category 1 (Display): ${count1}`);
    console.log(`Products in Category 2 (Gaming PC & Case): ${count2}`);

  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

run();
