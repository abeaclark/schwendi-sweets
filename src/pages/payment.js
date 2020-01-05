import React from 'react'
import '../css/square.css'
import SquarePaymentForm, {
  CreditCardNumberInput,
  CreditCardExpirationDateInput,
  CreditCardPostalCodeInput,
  CreditCardCVVInput,
  CreditCardSubmitButton,
} from 'react-square-payment-form'
import { themeStyles, colors } from '../utils/theme'
import { Link, graphql } from 'gatsby'

const styles = {
  outer: {
    margin: 0,
    minHeight: '100vh',
    backgroundColor: colors.darkPurple,
    maxWidth: '100vw',
    paddingTop: "10px",
    paddingBottom: '100px',
    marginBottom: '-3rem',
  },
  inner: {
    margin: '0 auto',
    padding: '10px',
    maxWidth: '400px',
    backgroundColor: 'white',
    borderRadius: '10px',
    ...themeStyles.shadow,
  },
  input: {
    height: '56px',
    fontSize: '16px',
    fontFamily: 'Helvetica Neue',
    padding: '16px',
    color: '#373F4A',
    backgroundColor: 'transparent',
    lineHeight: '24px',
    display: 'block',
    margin: '0',
    width: '100%',
    border: 'none',
    marginBottom: '1.25rem',
  },
  sectionHeader: {
    color: colors.darkPurple,
    fontWeight: 'bold',
    marginBottom: '10px',
    paddingBottom: '5px',
    marginTop: '15px',
  },
  errorText: {
    color: 'red',
    fontSize: '12px',
  }
}

const InputGroup = ({ name, label, value, onChange, type='text', maxLength=null, autoFocus, errorText }) => (
  <React.Fragment key={name}>
    <label className="sq-label">{label}</label>
    {errorText && <div css={styles.errorText}>
        {errorText}
      </div>
    }
    <input
      autoFocus={autoFocus}
      type={type}
      className="sq-input"
      value={value} type='text'
      css={styles.input}
      onChange={onChange}
      maxLength={maxLength}
    />
  </React.Fragment>
)

class PaymentPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      errorMessages: [],
      cookieType: 'Chocolate Chip',
      quantity: '12',
      delivery: 'School',
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      streetAddress: null,
      city: null,
      state: null,
      postal: null,

      orderComplete: false,
    }
  }
  
  cardNonceResponseReceived = (errors, nonce, cardData, buyerVerificationToken) => {
    if (errors) {
      this.setState({ errorMessages: errors.map(error => error.message) })
      return
    }

    fetch("/.netlify/functions/process-payment", {
      method: "POST",
      body: JSON.stringify({
        nonce,
        total: this.getTotal() * 100
      }),
    })
    .then(response => {
      console.log(response.json())
      this.setState({ errorMessages: [], orderComplete: true  })
    })
    .catch(err => {
      this.setState({ errorMessages: ['Something went wrong with your transaction. We apologize!'] })
    })

  }

  onChangeValue = (e, variableName) => {
    const value = e.target.value
    this.setState({ [variableName]: value })
  }

  getTotal = () => {
    const {
      quantity,
      delivery,
    } = this.state

    const prices = {
      3: 2,
      5: 3,
      12: 7
    }

    let total = prices[quantity]
    if (delivery === 'Home') {
      total += 5
    }
    return total
  }

  createVerificationDetails = () => {
    const {
      cookieType,
      delivery,
      firstName,
      lastName,
      email,
      phone,
      streetAddress,
      city,
      state,
      postal,
    } = this.state

    return {
      amount: `${this.getTotal()}.00`,
      currencyCode: "USD",
      intent: "CHARGE",
      shippingOption: {
        label: `${cookieType} ${delivery}`,
      }, 
      billingContact: {
        familyName: lastName,
        givenName: firstName,
        email,
        country: "US",
        region: state,
        city,
        addressLines: [streetAddress],
        postalCode: postal,
        phone,
      }
    }
  }
  
  render() {
    const {
      orderComplete,
      cookieType,
      quantity,
      delivery,
      firstName,
      lastName,
      email,
      phone,
      streetAddress,
      city,
      state,
      postal,
    } = this.state

    if (orderComplete) {
      return (
        <div css={styles.outer}>
          <div css={[styles.inner, {textAlign: 'center'}]}>
            <h1 css={{color: colors.darkPurple}}>
              We got your order!
            </h1>
            <h3>
              Expect fresh cookies soon!
            </h3>
          </div>
          <Link to='/' css={{ textAlign: 'center', display: 'block', marginTop: '20px' }}>
            Back to hompage
          </Link>
        </div>
      )
    }

    return (
      <div css={styles.outer}>
        <div css={styles.inner}>
          <fieldset className="sq-payment-form" css={{ border: 'none' }}>
            <div css={styles.sectionHeader}>Order Details</div>
            <label className="sq-label">Cookie Type</label>
            <select className="sq-input" value='test' css={styles.input} onChange={e => this.onChangeValue(e, 'cookieType')}>
              <option value={cookieType}>Chocolate Chip</option>
            </select>
            <label className="sq-label">Quantity</label>
            <select className="sq-input" value={quantity} css={styles.input} onChange={e => this.onChangeValue(e, 'quantity')}>
              <option value="3">3 for $2</option>
              <option value="5">5 for $3</option>
              <option value="12">12 for $7</option>
            </select>
            <label className="sq-label">Delivery</label>
            <select className="sq-input" value={delivery} css={styles.input} onChange={e => this.onChangeValue(e, 'delivery')}>
              <option value="School">School</option>
              <option value="Church">Church</option>
              <option value="Home">Home (Add $5.00)</option>
            </select>
            <div css={styles.sectionHeader}>Contact Information</div>
            <InputGroup 
              label="First Name"
              value={firstName}
              onChange={e => this.onChangeValue(e, 'firstName')}
              autoFocus
              errorText={firstName === '' && 'Required'}
            />
            <InputGroup 
              label="Last Name"
              value={lastName}
              onChange={e => this.onChangeValue(e, 'lastName')}
              errorText={lastName === '' && 'Required'}
            />
            <InputGroup 
              label="Email"
              value={email}
              type='email'
              onChange={e => this.onChangeValue(e, 'email')}
              errorText={email === '' && 'Required'}
            />
            <InputGroup 
              label="Phone"
              value={phone}
              type='phone'
              onChange={e => this.onChangeValue(e, 'phone')}
              errorText={phone === '' && 'Required'}
            />
            <div css={styles.sectionHeader}>Payment Details</div>
            <InputGroup 
              label="Street Address"
              value={streetAddress}
              onChange={e => this.onChangeValue(e, 'streetAddress')}
              errorText={streetAddress === '' && 'Required'}
            />
            <InputGroup 
              label="City"
              value={city}
              onChange={e => this.onChangeValue(e, 'city')}
              errorText={city === '' && 'Required'}
            />
            <InputGroup 
              label="State"
              value={state}
              onChange={e => this.onChangeValue(e, 'state')}
              errorText={state === '' && 'Required' || state != null && state != 'T' && state != 'TX' && "Only available for TX residents"}
              maxLength='2'
            />
            <InputGroup 
              label="Postal"
              value={postal}
              onChange={e => this.onChangeValue(e, 'postal')}
              errorText={postal === '' && 'Required'}
            />
          </fieldset>
          <SquarePaymentForm
            sandbox={true}
            applicationId={process.env.SQUARE_APPLICATION_ID || "sandbox-sq0idb-JMxtvZJr1Ed0-Q1HbZFpHA"}
            locationId={"7VHBP9JJ9TA4D"}
            cardNonceResponseReceived={this.cardNonceResponseReceived}
            createVerificationDetails={this.createVerificationDetails}
          >
            <fieldset className="sq-fieldset">
              <CreditCardNumberInput />
              <div className="sq-form-third">
                <CreditCardExpirationDateInput />
              </div>

              <div className="sq-form-third">
                <CreditCardCVVInput />
              </div>
            </fieldset>

            <CreditCardSubmitButton>
              Pay ${this.getTotal()}.00
            </CreditCardSubmitButton>

          </SquarePaymentForm>

          <div className="sq-error-message">
            {this.state.errorMessages.map(errorMessage =>
              <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
            )}
          </div>

        </div>
      </div>
    )
  }
}

export default PaymentPage

//<div className="sq-form-third">
//  <CreditCardPostalCodeInput />
//</div>
