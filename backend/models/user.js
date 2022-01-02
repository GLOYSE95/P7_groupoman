"use strict";

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    prenom: { type: Sequelize.STRING, allowNull: false },
    nom: { type: Sequelize.STRING, allowNull: false },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      lowercase: true,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    descript: { type: Sequelize.STRING, allowNull: true },
  });
  return User;
};
