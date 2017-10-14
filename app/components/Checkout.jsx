import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import PropTypes from 'prop-types';

import STRIPE_PUBLISHABLE from '../config/StripeConfig';

import PaymentActions from '../actions/PaymentActions';
import EventActions from '../actions/EventActions';

const CURRENCY = 'NOK';

const calcAmount = amount => amount * 100;

class Checkout extends Component {
  constructor() {
    super();
    this.onToken = this.onToken.bind(this);
  }

  onToken(token) {
    this.props.changePaymentProgress(true);
    PaymentActions.submitPayment({
      source: token.id,
      eventId: this.props.eventId,
      comment: this.props.comment,
      hasCar: this.props.hasCar,
    }).then(() => {
      EventActions.getEvent(this.props.eventId);
      this.props.changePaymentProgress(false);
    });
  }

  render() {
    return (
      <StripeCheckout
        name="Payment"
        description={this.props.description}
        email="Toast"
        amount={calcAmount(this.props.amount)}
        token={this.onToken}
        currency={CURRENCY}
        stripeKey={STRIPE_PUBLISHABLE}
      />
    );
  }
}

Checkout.propTypes = {
  eventId: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  comment: PropTypes.string,
  hasCar: PropTypes.bool,
};

Checkout.defaultProps = {
  comment: '',
  hasCar: false,
};

export default Checkout;
