//pool facultatif
//https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor
module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "root",
  DB: "groupomaniap7",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
