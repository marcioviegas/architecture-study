const nock = require('nock');

const URL = "http://www.payment.com";
const PATH = "/pay"

const getRandomResponseTime = () => {
    const baseResponseTime = (Math.random() * 200);
    const isDelayedResponse = Math.random() < 0.1;

    if (isDelayedResponse) {
        return baseResponseTime + 2000; // Add extra 2000 milliseconds for delayed response
    }

    return baseResponseTime;
};

const scope = nock(URL)
    .post(PATH)
    .delay(getRandomResponseTime())
    .reply(function (uri, requestBody) {

        const { orderId } = requestBody;

        // Validate orderId
        if (!orderId || Math.random() < 0.1) {
            return [400, { error: 'Bad Request' }];
        }

        // Simulate occasional server error
        if (Math.random() < 0.05) {
            return [500, { error: 'Internal Server Error' }];
        }


        // Return a unique payment id
        return [200, { paymentId: `payment_id_${orderId}` }];
    })
    .persist();


module.exports = URL + PATH;