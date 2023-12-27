const express = require('express');
const promMid = require('express-prometheus-middleware');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();
const port = 8080;
const { Sequelize, DataTypes } = require('sequelize');

app.use(bodyParser.json());

const sequelize = new Sequelize('order', 'admin', 'admin', {
    host: 'localhost',
    dialect: 'mysql'
});

app.use(promMid({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400]
}));

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

app.get('/', async (req, res) => {
    const newOrder = await Order.create();
    res.status(201).json(newOrder.toJSON());
});


sequelize.sync({ force: true }) // Use force: true only for development to recreate tables
    .then(() => {
        // Start the Express server after the database connection is open
        app.listen(port, () => {
            console.log(`Express server is running at http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });
