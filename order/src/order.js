const sequelize = require("./sequelize");
const {DataTypes, Sequelize} = require("sequelize");

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
});

module.exports = Order



