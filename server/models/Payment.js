import configureStripe from 'stripe';
import stripeSecret from '../config/StripeConfig';


const stripe = configureStripe(stripeSecret);

const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
};

const Payment = {
  pay: (req, res) => {
    console.log(req.body);
    stripe.charges.create(req.body, postStripeCharge(res));
  },
};

export default Payment;
