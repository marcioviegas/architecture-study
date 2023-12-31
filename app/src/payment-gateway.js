const nock = require('nock');

const URL = "http://www.payment.com";
const PATH = "/pay"

const scope = nock(URL)
    .get(PATH)
    .reply(201, 'paid')
    .persist();

const pay = (newOrderId) => {
    // Randomly decide whether the Promise should resolve or reject
    const shouldSucceed = Math.random() < 0.9;

    // Generate a random delay between 0 and 300 milliseconds
    const randomDelay = Math.floor(Math.random() * 301); // 0 to 300 milliseconds

    return new Promise((resolve, reject) => {
        // Use setTimeout to simulate an asynchronous operation with a random delay
        setTimeout(() => {
            if (shouldSucceed) {
                resolve(Payment.create({OrderId: newOrderId}));
            } else {
                reject(new Error('Promise failed after 3 seconds'))
            }
        }, shouldSucceed ? randomDelay : randomDelay * 1.3);
    });
}


module.exports = URL + PATH;