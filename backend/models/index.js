"use strict";

const dbConfig = require("../configuration/dbconfig.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  //operatorsAliases: false ---->obsolète
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.posts = require("./post")(sequelize, Sequelize);
db.users = require("./user")(sequelize, Sequelize);
db.comments = require("./comment")(sequelize, Sequelize);
db.roles = require("./role")(sequelize, Sequelize);

db.users.hasMany(db.posts, { foreignKey: "userId", as: "postIdUser" });
db.posts.belongsTo(db.users, { foreignKey: "userId", as: "postIdUser" });

db.users.hasMany(db.comments, { foreignKey: "userId", as: "commentIdUser" });
db.comments.belongsTo(db.users, { foreignKey: "userId", as: "commentIdUser" });

db.posts.hasMany(db.comments, { foreignKey: "postId", as: "commentIdPost" });
db.comments.belongsTo(db.posts, { foreignKey: "postId", as: "commentIdPost" });

db.roles.belongsToMany(db.users, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.users.belongsToMany(db.roles, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});
//sequelize.sync({ alter: true });

module.exports = db;
