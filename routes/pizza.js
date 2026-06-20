const express = require("express");
const router = express.Router();
const connexion = require("../database/connexion");

// API qui renvoie les miniardises en JSON
router.get("/api", (req, res) => {
  connexion.query(
    "SELECT * FROM produit WHERE categorie='pizza'",
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    },
  );
});

// Page pizza
router.get("/", (req, res) => {
  res.sendFile("pizza.html", {
    root: "./views",
  });
});

module.exports = router;
