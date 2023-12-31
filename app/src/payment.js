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

const pay = (orderId) => {

    const data = {
        orderId: orderId
    };


    return axios.post(paymentURL, JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(() => {
        Payment.create({OrderId: orderId})
    }).catch((err) => {
        console.error("PAYMENT GATEWAY FAILED: ${err.data}");
        throw err;
    });
}


module.exports  = {Payment, pay};