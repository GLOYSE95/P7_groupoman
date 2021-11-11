module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    contain: { type: Sequelize.STRING },
    userId: {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    postId: {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: {
        model: "posts",
        key: "id",
      },
    },
  });
  return Comment;
};
