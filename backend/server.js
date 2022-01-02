//Contient les methodes et codes http
const http = require("http");
const app = require("./app");

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

//Port3000 ou autre
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

//Recherche des différentes erreurs (Switch case)
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error; //throw pour afficher l'erreur
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//Utilisation de l'app par le serveur créé
const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

//démarrage du serveur et ecoute sur le port
server.listen(port);
