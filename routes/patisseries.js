const express = require("express");
const router = express.Router();
const connexion = require("../database/connexion");

router.get("/api", (req, res) => {

    connexion.query(
        "SELECT * FROM produit WHERE categorie='patisserie'",
        (err, result) => {

            if(err){
                return res.status(500).json(err);
            }

            res.json(result);
        }
    );
});

module.exports = router;
const path = require("path");



router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/patisseries.html"));
});

module.exports = router;