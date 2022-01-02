const express = require("express");
const cors = require("cors");
const path = require("path"); //accéder et interagir avec le chemin de fichiers.
const dotenv = require("dotenv"); //déclaration des variables d’environnement
const result = dotenv.config();

const app = express(); //Création appli express

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
//const roleRoutes = require("./routes/role");

const db = require("./models/index.js");

var corsOptions = { origin: "http://localhost:3000" };

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Pour gérer les problèmes de CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

//app.use("/api/", roleRoutes);
//path.dirname() : Renvoie la partie répertoire d'un chemin

module.exports = app;
