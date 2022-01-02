"use strict";

module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("posts", {
    id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    contain: {
      type: Sequelize.STRING,
      trim: true,
      maxlength: 40,
    },
    imagepost: { type: Sequelize.STRING, allowNull: true },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
  });

  return Post;
};
