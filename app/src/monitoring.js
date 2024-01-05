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
    let orders = await Order.count();
    let payments = await Payment.count();

    number_of_orders.set(orders);
    number_of_payments.set(payments);

    console.log(`Metricas atualizadas com sucesso:\nOrders in database: ${orders} \nPayments in database: ${payments}`);
}

const interval = setInterval(updateMetrics, 5000);

process.on('SIGINT', () => {
    clearInterval(interval);
    process.exit();
});

module.exports = monitoring