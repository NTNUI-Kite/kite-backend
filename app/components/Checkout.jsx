import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

import STRIPE_PUBLISHABLE from '../config/StripeConfig';

import PaymentActions from '../actions/PaymentActions';

const CURRENCY = 'NOK';

const calcAmount = amount => amount * 100;


const onToken = (amount, description) => (token) => {
  PaymentActions.submitPayment({
    description,
    source: token.id,
    currency: CURRENCY,
    amount: calcAmount(amount),
  });
};


const Checkout = ({ name, description, amount }) => (
  <StripeCheckout
    name={name}
    description={description}
    amount={calcAmount(amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />
);

export default Checkout;
