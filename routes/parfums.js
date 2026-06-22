const express = require("express");
const router = express.Router();
const connexion = require("../database/connexion");

// API qui renvoie les parfums en JSON
router.get("/api", (req, res) => {
  connexion.query(
    "SELECT * FROM produit WHERE categorie='parfums'",
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    },
  );
});

// Page parfums
router.get("/", (req, res) => {
  res.sendFile("parfums.html", {
    root: "./views",
  });
});

module.exports = router;
