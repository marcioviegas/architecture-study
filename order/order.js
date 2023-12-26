const express = require('express');
const promMid = require('express-prometheus-middleware');

// Create an Express application
const app = express();
const port = 8080;

app.use(promMid({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400]
}));

app.get('/', (req, res) => {
    console.log('GET /hello');
    const { name = 'Anon' } = req.query;
    res.json({ message: `Hello, ${name}!` });
});

app.listen(port, () => {
    console.log(`Example api is listening on http://localhost:${port}`);
});