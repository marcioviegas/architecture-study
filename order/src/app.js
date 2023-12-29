const express = require('express');
const monitoring = require("./monitoring");
const bodyParser = require('body-parser');


const sequelize = require("./sequelize");
const {Payment, pay} = require("./payment");
const Order = require("./order");

const app = express();
const port = 8080;

app.use(bodyParser.json());

app.use(monitoring);

Order.hasOne(Payment);
Payment.belongsTo(Order);

app.get('/', async (req, res) => {
    const newOrder = await Order.create();
    const newPayment =  pay(newOrder.id);

    newPayment.then((newPayment) => {
        res.status(201).json(newPayment.toJSON());
    }).catch((err) => {
        res.status(400).json({error: "Error in payment"})

    });

});

sequelize.sync({ force: true })
    .then(() => {

        app.listen(port, () => {
            console.log(`Express server is running at http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });