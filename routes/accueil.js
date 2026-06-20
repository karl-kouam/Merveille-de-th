const express = require("express");
const path = require("path");
const connexion = require("../database/connexion");

const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/accueil.html"));
});
router.get("/api/meilleurs", (req, res) => {

    connexion.query(
        "SELECT * FROM produit WHERE meilleur = 1",
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);
        }
    );

});
// router.get("/api/nouveautes", (req, res) => {

//     connexion.query(
//         "SELECT * FROM produit WHERE nouveaute = 1",
//         (err, result) => {

//             if (err) {
//                 return res.status(500).json(err);
//             }

//             res.json(result);
//         }
//     );

// });
router.get("/api/nouveautes", (req, res) => {

    connexion.query(
        "SELECT * FROM produit WHERE nouveaute = 1",
        (err, result) => {

            console.log(result);

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);
        }
    );

});

module.exports = router;