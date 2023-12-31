const sequelize = require("./sequelize");
const {DataTypes, Sequelize} = require("sequelize");
const axios = require('axios');


const paymentURL = require("./payment-gateway")

const Payment = sequelize.define('Payment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    }
});

const pay = (newOrderId) => {
    return axios.get(paymentURL);
}


module.exports  = {Payment, pay};