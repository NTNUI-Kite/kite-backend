import configureStripe from 'stripe';
import stripeSecret from '../config/StripeConfig';
import db from '../utilities/dbConnection';
import Event from './Event';

const CURRENCY = 'NOK';

const stripe = configureStripe(stripeSecret);

const postStripeCharge = (req, res) => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    // res.status(200).send({ success: stripeRes });
    Event.signup(req, res);
  }
};

const Payment = {
  pay: (req, res) => {
    db.query('SELECT title, price FROM events WHERE id = ?', [req.body.eventId], (err, rows) => {
      if (err) throw err;

      const event = rows[0];
      const payment = {
        description: `${event.title}: ${req.user.name}`,
        source: req.body.source,
        currency: CURRENCY,
        amount: event.price * 100,
      };
      stripe.charges.create(payment, postStripeCharge(req, res));
    });
  },
};

export default Payment;