"use strict";

module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("roles", {
    id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: { type: Sequelize.STRING },
  });
  return Role;
};
