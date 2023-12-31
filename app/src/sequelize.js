const Sequelize =  require("sequelize");

const sequelize = new Sequelize('order', 'admin', 'admin', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize