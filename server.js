/********************************************************************************
*  WEB322 - Assignment 01
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
*  Name: Gary He        Student ID:128850245   Date: 2026-01-29
*
********************************************************************************/

const express = require("express");
const path = require("path");
const { loadSightings } = require("./utils/dataLoader");

const app = express();
const PORT = process.env.PORT || 3000;

// 1️⃣ Static middleware
app.use(express.static("public"));

// 2️⃣ Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// 3️⃣ API Endpoints

// GET all sightings
app.get("/api/sightings", async (req, res) => {
  try {
    const sightings = await loadSightings();
    res.json(sightings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET verified sightings
app.get("/api/sightings/verified", async (req, res) => {
  try {
    const sightings = await loadSightings();
    const verified = sightings.filter(s => s.verified === true);
    res.json(verified);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET species list (unique)
app.get("/api/sightings/species-list", async (req, res) => {
  try {
    const sightings = await loadSightings();
    const species = [...new Set(sightings.map(s => s.species))];
    res.json(species);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET forest habitat sightings
app.get("/api/sightings/habitat/forest", async (req, res) => {
  try {
    const sightings = await loadSightings();
    const forestSightings = sightings.filter(s => s.habitat === "forest");

    res.json({
      habitat: "forest",
      sightings: forestSightings,
      count: forestSightings.length
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET search eagle
app.get("/api/sightings/search/eagle", async (req, res) => {
  try {
    const sightings = await loadSightings();
    const result = sightings.find(s =>
      s.species.toLowerCase().includes("eagle")
    );
    res.json(result || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET find index moose
app.get("/api/sightings/find-index/moose", async (req, res) => {
  try {
    const sightings = await loadSightings();
    const index = sightings.findIndex(s => s.species === "Moose");

    res.json({
      index,
      sighting: sightings[index] || null
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET recent 3 sightings
app.get("/api/sightings/recent", async (req, res) => {
  try {
    const sightings = await loadSightings();
    const recent = sightings.slice(-3).map(s => ({
      species: s.species,
      location: s.location,
      date: s.date
    }));
    res.json(recent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
