const SiteConfig = require('../models/SiteConfig');

// Get config by key
exports.getConfig = async (req, res) => {
  try {
    const config = await SiteConfig.findOne({ key: req.params.key });
    if (!config) {
      // Return a default structure instead of 404 to avoid console errors
      return res.json({ key: req.params.key, value: null });
    }
    res.json(config);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create or update config
exports.updateConfig = async (req, res) => {
  try {
    const { key, value } = req.body;
    
    let config = await SiteConfig.findOne({ key });
    
    if (config) {
      config.value = value;
      config.lastUpdated = Date.now();
      await config.save();
    } else {
      config = new SiteConfig({
        key,
        value,
      });
      await config.save();
    }
    
    res.json(config);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
