const { join } = require("path");

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer to ensure persistence in Render build
  cacheDirectory: join(__dirname, ".cache", "puppeteer"),
};
