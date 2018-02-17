import Mailgun from 'mailgun-js';
import config from '../config/EmailConfig';

const mailgun = new Mailgun(config);

const Emailer = {
  sendMail: (body) => {
    const data = {
      from: config.from,
      to: body.email,
      subject: body.subject,
      html: body.content,
    };

    mailgun.messages().send(data, (err) => {
      if (err) throw err;
    });
  },
};

export default Emailer;
