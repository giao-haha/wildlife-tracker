const fs = require("fs").promises;
const path = require("path");

async function loadSightings() {
  try {
    const filePath = path.join(__dirname, "..", "data", "sightings.json");
    const data = await fs.readFile(filePath, "utf-8");
    const jsonData = JSON.parse(data);
    return jsonData.sightings;
  } catch (err) {
    console.error("Error loading sightings:", err);
    throw new Error("Unable to load wildlife sighting data");
  }
}

module.exports = { loadSightings };
