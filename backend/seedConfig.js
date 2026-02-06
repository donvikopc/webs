const mongoose = require('mongoose');
const SiteConfig = require('./models/SiteConfig');
require('dotenv').config();

const seedConfig = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const configs = [
      {
        key: 'headerImages',
        value: [] // Default empty array
      },
      {
        key: 'bannerImage',
        value: '' // Default empty string
      }
    ];

    for (const config of configs) {
      const existing = await SiteConfig.findOne({ key: config.key });
      if (!existing) {
        await SiteConfig.create(config);
        console.log(`Created config: ${config.key}`);
      } else {
        console.log(`Config already exists: ${config.key}`);
      }
    }

    console.log('Config seeding completed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding config:', error);
    process.exit(1);
  }
};

seedConfig();
