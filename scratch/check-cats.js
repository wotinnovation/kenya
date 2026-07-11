const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://Vercel-Admin-kenya:egcUDEs96SpAbynN@kenya.uccnfae.mongodb.net/kenya?retryWrites=true&w=majority";

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    const Category = mongoose.model('Category', new mongoose.Schema({
      name: String,
      slug: String
    }), 'categories');

    const id1 = new mongoose.Types.ObjectId("6a4fa353b4a08675c8bb7919");
    const id2 = new mongoose.Types.ObjectId("6a4fa354b4a08675c8bb791d");

    const cat1 = await Category.findById(id1);
    const cat2 = await Category.findById(id2);

    console.log("Cat 1:", cat1 ? `${cat1.name} (${cat1.slug})` : "Null");
    console.log("Cat 2:", cat2 ? `${cat2.name} (${cat2.slug})` : "Null");

  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

run();
