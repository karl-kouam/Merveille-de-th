require('dotenv').config();
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// autorise l'accès aux fichiers du dossier views
app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "views")))
app.use(express.static(path.join(__dirname,"database")))
app.use(helmet());



const pizzaRoute = require("./routes/pizza")
const connexion = require('./database/connexion');
const accueilRoute = require("./routes/accueil");
const parfumsRoute = require("./routes/parfums");
const habitsRoute = require("./routes/habits");
const patisseriesRoute = require("./routes/patisseries");
const contactRoute = require("./routes/contact");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", accueilRoute);
app.use("/parfums", parfumsRoute);
app.use("/habits", habitsRoute);
app.use("/patisseries", patisseriesRoute);
app.use("/contact", contactRoute);
app.use("/pizza",pizzaRoute)
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);




connexion.query('SELECT 1', (err, result) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Base de données connectée');
    }
});

app.listen(3000, () => {
    console.log("Serveur Lance sur le port 3000");
});
