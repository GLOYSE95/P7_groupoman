"use strict";

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    prenom: { type: Sequelize.STRING },
    nom: { type: Sequelize.STRING },
    email: {
      type: Sequelize.STRING,

      unique: true,
    },
    password: {
      type: Sequelize.STRING,

      unique: true,
    },
    descript: { type: Sequelize.STRING },
  });
  return User;
};
