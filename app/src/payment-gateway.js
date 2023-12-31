const nock = require('nock');

const URL = "http://www.payment.com";
const PATH = "/pay"

const getRandomResponseTime = () => {
    const baseResponseTime = Math.random() * 200;
    const isDelayedResponse = Math.random() < 0.1;

    if (isDelayedResponse) {
        return baseResponseTime + 1000; // Add extra 2000 milliseconds for delayed response
    }

    return baseResponseTime;
};

const scope = nock(URL)
    .post(PATH)
    .reply(function (uri, requestBody) {

        const { orderId } = requestBody;

        // Validate orderId
        if (!orderId) {
            return [400, { error: 'orderId is required' }];
        }

        // Simulate occasional server error
        if (Math.random() < 0.1) {
            return [500, { error: 'Internal Server Error' }];
        }

        // Simulate random response time
        const responseTime = getRandomResponseTime();

        // Return a unique payment id
        return [200, { paymentId: `payment_id_${orderId}` }, { 'x-response-time': responseTime }];
    })
    .persist();


module.exports = URL + PATH;