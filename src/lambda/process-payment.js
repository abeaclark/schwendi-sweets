// For more info, check https://www.netlify.com/docs/functions/#javascript-lambda-functions

module.exports.handler = async function(event, context) {
  const SquareConnect = require('square-connect');
  const crypto = require('crypto');
  const defaultClient = SquareConnect.ApiClient.instance;
  // Configure OAuth2 access token for authorization: oauth2
  var oauth2 = defaultClient.authentications['oauth2'];
  oauth2.accessToken = process.env.SQUARE_ACCESS_TOKEN || 'EAAAEM6GrrwtGr866uaehw3S37tzTj3RY0_n2XfCHwoS0Wg89bqNqVKTAUHYAq9O';

  // defaultClient.basePath = 'https://connect.squareupsandbox.com';

  const request_params = JSON.parse(event.body)
  console.log("request_params", request_params)

  // length of idempotency_key should be less than 45
  const idempotency_key = crypto.randomBytes(22).toString('hex');

  // Charge the customer's card
  const payments_api = new SquareConnect.PaymentsApi();
  const request_body = {
    source_id: request_params.nonce,
    amount_money: {
      amount: request_params.total, // 100 would be a $1.00 charge
      currency: "USD"
    },
    idempotency_key: idempotency_key
  };

  try {
    const response = await payments_api.createPayment(request_body);
    return {
      statusCode: 200,
      body: JSON.stringify({
        msg: "Payment Successful"
      })
    }
  } catch(error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        msg: "Payment Failure",
        result: error.response.text,
      })
    }
  }

}
