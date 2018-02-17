import configureStripe from 'stripe';
import stripeSecret from '../config/StripeConfig';
import db from '../utilities/dbConnection';
import Emailer from '../utilities/Emailer';

const CURRENCY = 'NOK';

const stripe = configureStripe(stripeSecret);

const createEmail = (name, email) => {
  return {
    email,
    subject: 'Payment recieved',
    content: `<h3>Thanks for the payment ${name} and welcome to the trip!</h3><p>Best regards</p></p>NTNUI-kite</p>`,
  };
};

const postStripeCharge = (req, res) => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    db.query('UPDATE event_signups SET has_paid = 1 WHERE event_id = ? AND user_id = ?; SELECT email FROM users WHERE id = ?', [req.body.eventId, req.user.userId, req.user.userId], (err, rows) => {
      if (err) throw err;
      const emailBody = createEmail(req.user.name, rows[1][0].email);
      Emailer.sendMail(emailBody);
      res.status(200).send({ success: stripeRes });
    });
    // req.body.has_paid = 1;
    // Event.register(req, res);
  }
};

const Payment = {
  pay: (req, res) => {
    db.query('SELECT e.title, e.price, e.is_active, e.is_open, e.capacity, count(*) AS signups FROM events AS e inner join event_signups AS es ON e.id=es.event_id WHERE e.id = 29 GROUP BY e.id', [req.body.eventId], (err, rows) => {
      if (err) throw err;
      const event = rows[0];
      if (event.is_open === 0 || event.is_active === 0) {
        res.status(500).send({ error: 'Event not open nor active' });
      } else {
        const payment = {
          description: `${event.title}: ${req.user.name}`,
          source: req.body.source,
          currency: CURRENCY,
          amount: event.price * 100,
        };
        stripe.charges.create(payment, postStripeCharge(req, res));
      }
    });
  },
};

export default Payment;
