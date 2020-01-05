import React from 'react'
import SquarePaymentForm from 'react-square-payment-form'
import 'react-square-payment-form/lib/default.css'

class SquarePayment extends React.Component {
  getOrCreatePaymentForm = () => {
    if (this.SqPaymentForm) {
      return this.SqPaymentForm
    }

    let SqPaymentForm
    if (typeof window != 'undefined' && window.SqPaymentForm) {
      SqPaymentForm = window.SqPaymentForm
      SqPaymentForm = window.SqPaymentForm
      const paymentForm = new SqPaymentForm({
        applicationId: "REPLACE_WITH_APPLICATION_ID",
        inputClass: 'sq-input',
        autoBuild: false,
        // Customize the CSS for SqPaymentForm iframe elements
        inputStyles: [{
            fontSize: '16px',
            lineHeight: '24px',
            padding: '16px',
            placeholderColor: '#a0a0a0',
            backgroundColor: 'transparent',
        }],
        // Initialize the credit card placeholders
        cardNumber: {
            elementId: 'sq-card-number',
            placeholder: 'Card Number'
        },
        cvv: {
            elementId: 'sq-cvv',
            placeholder: 'CVV'
        },
        expirationDate: {
            elementId: 'sq-expiration-date',
            placeholder: 'MM/YY'
        },
        postalCode: {
            elementId: 'sq-postal-code',
            placeholder: 'Postal'
        },
        // SqPaymentForm callback functions
        callbacks: {
          /*
          * callback function: cardNonceResponseReceived
          * Triggered when: SqPaymentForm completes a card nonce request
          */
          cardNonceResponseReceived: (errors, nonce, cardData) => {
            if (errors) {
              // Log errors from nonce generation to the browser developer console.
              console.error('Encountered errors:');
              errors.forEach(function (error) {
                  console.error('  ' + error.message);
              });
              alert('Encountered errors, check browser developer console for more details');
              return;
            }
            alert(`The generated nonce is:\n${nonce}`);
            //TODO: Replace alert with code in step 2.1
          }
        }
      })
    }
    this.SqPaymentForm = SqPaymentForm
    return SqPaymentForm
  }

  onGetCardNonce = (event) => {
    // Don't submit the form until SqPaymentForm returns with a nonce
    event.preventDefault();
    // Request a nonce from the SqPaymentForm object
    paymentForm.requestCardNonce();
  }

  render() {
    return (
      <React.Fragment>
        <div id="form-container">
          <div id="sq-card-number"></div>
          <div class="third" id="sq-expiration-date"></div>
          <div class="third" id="sq-cvv"></div>
          <div class="third" id="sq-postal-code"></div>
          <button id="sq-creditcard" class="button-credit-card" onclick="onGetCardNonce(event)">Pay $1.00</button>
        </div>
      </React.Fragment>    
    )
  }
}

export default SquarePayment
