const express = require('express');
const prometheus = require('prom-client');

// Create an Express application
const app = express();
const port = 8080;

// Enable collection of default metrics
prometheus.collectDefaultMetrics();

// Define a custom metric
const customMetric = new prometheus.Gauge({
    name: 'custom_metric',
    help: 'A custom metric example',
    labelNames: ['label'],
});

// Define a route that increments the custom metric
app.get('/', (req, res) => {
    const labelValue = req.query.label || 'label';
    customMetric.labels(labelValue).inc();
    res.send('Metric incremented!');
});

// Define a route that exposes the Prometheus metrics
app.get('/metrics', async (req, res) => {
    try {
        const metrics = await prometheus.register.metrics();
        res.set('Content-Type', prometheus.register.contentType);
        res.send(metrics);
    } catch (error) {
        console.error('Error in /metrics route:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});