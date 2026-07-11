const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://Vercel-Admin-kenya:egcUDEs96SpAbynN@kenya.uccnfae.mongodb.net/kenya?retryWrites=true&w=majority";

const NETWORK_TREE = {
  name: "NETWORK",
  slug: "networking-solution-dubai",
  children: [
    {
      name: "5G ROUTERS",
      slug: "5g-routers",
      children: [
        { name: "D-LINK", slug: "d-link" },
        { name: "LINKSYS", slug: "linksys" },
      ]
    },
    {
      name: "ACCESS POINT",
      slug: "access-point",
      children: [
        { name: "ALTA", slug: "alta" },
        { name: "CAMBIUM", slug: "cambium" },
        { name: "D-LINK", slug: "d-link" },
        { name: "ENGENIUS", slug: "engenius" },
        { name: "FLYINGVOICE", slug: "flyingvoice" },
        { name: "Grandstream", slug: "grandstream" },
        { name: "HP ARUBA", slug: "hp-aruba" },
        { name: "LAMATEL", slug: "lamatel" },
        { name: "MESH SERIES", slug: "mesh-series" },
        { name: "NETGEAR", slug: "netgear" },
        { name: "RUIJIE", slug: "ruijie" },
        { name: "TENDA", slug: "tenda" },
        { name: "TP-LINK", slug: "tp-link" },
        { name: "UBIQUITI", slug: "ubiquiti" },
        { name: "Wi-Fi 4", slug: "wi-fi-4" },
        { name: "Wi-Fi 5", slug: "wi-fi-5" },
        { name: "Wi-Fi 6", slug: "wi-fi-6" },
        { name: "Wi-Fi 7", slug: "wi-fi-7" },
        { name: "WIRELESS AP", slug: "wireless-ap" },
        { name: "DRAYTEK", slug: "draytek" },
        { name: "MIKROTIK", slug: "mikrotik" },
        { name: "ZYXEL", slug: "zyxel" },
      ]
    },
    {
      name: "CONTROLLER",
      slug: "controller",
      children: [
        { name: "D-LINK", slug: "d-link" },
        { name: "DELL", slug: "dell" },
        { name: "HP", slug: "hp" },
        { name: "IP-COM", slug: "ip-com" },
        { name: "RUIJIE", slug: "ruijie" },
        { name: "TP-LINK", slug: "tp-link" },
        { name: "ZYXEL", slug: "zyxel" },
      ]
    },
    {
      name: "CONVERTER",
      slug: "converter",
      children: [
        { name: "MEDIA CONVERTER", slug: "media-converter" }
      ]
    },
    {
      name: "DRONE",
      slug: "drone",
    },
    {
      name: "EXTENDER",
      slug: "extender",
    },
    {
      name: "FIREWALL",
      slug: "firewall",
      children: [
        { name: "CYBEROAM", slug: "cyberoam" },
        { name: "DRAYTEK", slug: "draytek" },
        { name: "FORTINET", slug: "fortinet" },
        { name: "SONICWALL", slug: "sonicwall" },
        { name: "SOPHOS", slug: "sophos" },
        { name: "WATCHGUARD", slug: "watchguard" },
        { name: "ZYXEL", slug: "zyxel" },
      ]
    },
    {
      name: "INDUSTRIAL SWITCH",
      slug: "industrial-switch",
      children: [
        { name: "D-LINK", slug: "d-link" }
      ]
    },
    {
      name: "MESH ROUTER",
      slug: "mesh-router",
    },
    {
      name: "MIFI",
      slug: "mifi",
      children: [
        { name: "D-LINK", slug: "d-link" },
        { name: "HUAWEI", slug: "huawei" },
        { name: "TENDA", slug: "tenda" },
        { name: "TP-LINK", slug: "tp-link" },
      ]
    },
    {
      name: "MOBILE ACCESSORIES",
      slug: "mobile-accessories",
      children: [
        { name: "ANKER", slug: "anker" },
        { name: "PROMATE", slug: "promate" },
      ]
    },
    {
      name: "MODULE",
      slug: "module",
    },
    {
      name: "MODULE SFP",
      slug: "module-sfp",
      children: [
        { name: "NETWORK CABLE", slug: "network-cable" }
      ]
    },
    {
      name: "Omada Accessories",
      slug: "omada-accessories",
      children: [
        { name: "Omada by Tp-Link", slug: "omada-by-tp-link" }
      ]
    },
    {
      name: "Omada Converter",
      slug: "omada-converter",
    },
    {
      name: "Omada Gateways",
      slug: "omada-gateways",
      children: [
        { name: "Omada by Tp-Link", slug: "omada-by-tp-link" }
      ]
    },
    {
      name: "Omada Switches",
      slug: "omada-switches",
      children: [
        { name: "Omada by Tp-Link", slug: "omada-by-tp-link" }
      ]
    },
    {
      name: "Omada Wireless",
      slug: "omada-wireless",
      children: [
        { name: "Omada by Tp-Link", slug: "omada-by-tp-link" },
        { name: "Omada Wi-Fi 7", slug: "omada-wi-fi-7" }
      ]
    },
    {
      name: "POE ADAPTER",
      slug: "poe-adapter",
      children: [
        { name: "ENGENIUS", slug: "engenius" },
        { name: "J5CREATE", slug: "j5create" },
        { name: "TP-LINK", slug: "tp-link" },
        { name: "UBIQUITI", slug: "ubiquiti" },
        { name: "YEALINK", slug: "yealink" },
        { name: "LINKSYS", slug: "linksys" },
      ]
    },
    {
      name: "Routers",
      slug: "routers",
    },
    {
      name: "SERVER RACK",
      slug: "server-rack",
      children: [
        { name: "AVALON", slug: "avalon" },
        { name: "BEGIN", slug: "begin" },
        { name: "FINEN", slug: "finen" },
      ]
    },
    {
      name: "SWITCHES",
      slug: "switches",
      children: [
        { name: "ALLIED TELESIS", slug: "allied-telesis" },
        { name: "CISCO", slug: "cisco" },
        { name: "COMMANDO", slug: "commando" },
        { name: "D-LINK", slug: "d-link" },
        { name: "DAHUA", slug: "dahua" },
        { name: "DELL", slug: "dell" },
        { name: "DIGIUM", slug: "digium" },
        { name: "DRAYTEK", slug: "draytek" },
        { name: "FLYINGVOICE", slug: "flyingvoice" },
        { name: "FortiNet", slug: "fortinet" },
        { name: "GRANDSTREAM", slug: "grandstream" },
        { name: "HIKVISION", slug: "hikvision" },
        { name: "HUAWEI", slug: "huawei" },
        { name: "IP-COM", slug: "ip-com" },
        { name: "MIKROTIK", slug: "mikrotik" },
        { name: "NETGEAR", slug: "netgear" },
        { name: "OXION", slug: "oxion" },
        { name: "RUIJIE", slug: "ruijie" },
        { name: "TELESIS", slug: "telesis" },
        { name: "TP-LINK", slug: "tp-link" },
        { name: "UBIQUITI", slug: "ubiquiti" },
        { name: "ENGENIUS", slug: "engenius" },
        { name: "HP", slug: "hp" },
        { name: "ZYXEL", slug: "zyxel" },
      ]
    },
    {
      name: "TRANSCEIVERS",
      slug: "transceivers",
      children: [
        { name: "CISCO", slug: "cisco" },
        { name: "HP", slug: "hp" },
      ]
    },
    {
      name: "USB DONGLE",
      slug: "usb-dongle",
      children: [
        { name: "3G/4G/LTE", slug: "3g-4g-lite" },
        { name: "WIFI", slug: "wifi" },
      ]
    },
    {
      name: "WALKIE TALKIE",
      slug: "walkie-talkie",
      children: [
        { name: "MOTOROLA", slug: "motorola" }
      ]
    },
    {
      name: "VPN ROUTERS",
      slug: "vpn-routers",
      children: [
        { name: "D-LINK", slug: "d-link" },
        { name: "GRANDSTREAM", slug: "grandstream" },
        { name: "TP-LINK", slug: "tp-link" },
        { name: "DRAYTEK", slug: "draytek" },
      ]
    },
    {
      name: "4G ROUTERS",
      slug: "4g-routers",
      children: [
        { name: "ALINK", slug: "alink" },
        { name: "ASUS", slug: "asus" },
        { name: "CISCO", slug: "cisco" },
        { name: "D-LINK", slug: "d-link" },
        { name: "LB-LINK", slug: "lb-link" },
        { name: "LINKSYS", slug: "linksys" },
        { name: "MERCUSYS", slug: "mercusys" },
        { name: "MIKROTIK", slug: "mikrotik" },
        { name: "NETGEAR", slug: "netgear" },
        { name: "TP-LINK", slug: "tp-link" },
        { name: "XIAOMI", slug: "xiaomi" },
      ]
    }
  ]
};

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");

    const Category = mongoose.model('Category', new mongoose.Schema({
      name: { type: String, required: true, unique: true },
      slug: { type: String, required: true, unique: true },
      parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
      status: { type: String, default: 'active' },
      creatorModel: { type: String, default: 'Admin' },
      updaterModel: { type: String, default: 'Admin' },
      isDeleted: { type: Boolean, default: false }
    }), 'categories');

    async function getOrCreateCategory(name, slug, parentId = null) {
      let cat = await Category.findOne({ slug });
      if (!cat) {
        cat = new Category({
          name,
          slug,
          parentCategory: parentId,
          status: 'active',
          creatorModel: 'Admin',
          updaterModel: 'Admin',
          isDeleted: false
        });
        await cat.save();
        console.log(`Created Category: ${name} (slug: ${slug})`);
      } else {
        cat.parentCategory = parentId;
        cat.name = name;
        cat.isDeleted = false;
        await cat.save();
        console.log(`Verified/Updated Category: ${name} (slug: ${slug})`);
      }
      return cat._id;
    }

    // 1. Create Parent Category
    const parentId = await getOrCreateCategory(NETWORK_TREE.name, NETWORK_TREE.slug, null);

    // 2. Loop through children
    for (const sub of NETWORK_TREE.children) {
      const subId = await getOrCreateCategory(sub.name, sub.slug, parentId);

      // 3. Loop through grandchildren
      if (sub.children && sub.children.length > 0) {
        for (const gc of sub.children) {
          // Make name and slug unique by combining with parent subcategory
          const gcName = `${gc.name} (${sub.name})`;
          const gcSlug = `${gc.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${sub.slug}`;
          await getOrCreateCategory(gcName, gcSlug, subId);
        }
      }
    }

    console.log("Category hierarchy successfully inserted/synced!");

  } catch (err) {
    console.error("Migration Error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

run();
