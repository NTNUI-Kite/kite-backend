import React, { Component } from 'react';
import Button from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import Checkout from './Checkout';

import EventActions from '../actions/EventActions';

const signOut = (eventId) => {
  EventActions.signoff({ eventId })
    .then(() => {
      EventActions.getEvent(eventId);
    });
};

const login = () => {

};

const SignupButton = (props) => {
  if (props.authenticated) {
    if (props.hasSignedUp) {
      return (
        <div>
          <p>You are signed up</p>
          <Button label="Sign off" onClick={() => signOut(props.eventId)} />
        </div>
      );
    }
    return (
      <div>
        <p>You are not signed up</p>
        <Checkout
          eventId={props.eventId}
          description={props.description}
          amount={props.price}
          comment={props.comment}
          hasCar={props.hasCar}
          changePaymentProgress={props.changePaymentProgress}
        />
      </div>
    );
  }
  return (
    <div>
      <p>Not logged in</p>
      <Button label="Log in" onClick={login} />
    </div>
  );
};

SignupButton.propTypes = {
  eventId: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  hasCar: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  hasSignedUp: PropTypes.bool.isRequired,
  changePaymentProgress: PropTypes.func.isRequired,
};

export default SignupButton;
