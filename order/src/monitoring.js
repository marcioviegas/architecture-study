const promClient = require('prom-client');

const Order = require("./order")
const {Payment} = require("./payment")
const prometheus_middleware = require("express-prometheus-middleware");

const monitoring = prometheus_middleware({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400]
});

const number_of_orders = new promClient.Gauge({
    name: 'total_number_of_orders',
    help: 'Number of orders'
});

const number_of_payments = new promClient.Gauge({
    name: 'total_number_of_payments',
    help: 'Number of payments'
})


const updateMetrics = async () => {
    number_of_orders.set(await Order.count());
    number_of_payments.set(await Payment.count());
    console.log("Metricas atualizadas");
}

const interval = setInterval(updateMetrics, 5000);

process.on('SIGINT', () => {
    clearInterval(interval);
    process.exit();
});

module.exports = monitoring