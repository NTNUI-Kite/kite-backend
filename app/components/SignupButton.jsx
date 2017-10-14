import React, { Component } from 'react';
import Button from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import Checkout from './Checkout';
import ConfirmPopup from './baseComponents/ConfirmPopup';

import EventActions from '../actions/EventActions';

import LoginButton from './baseComponents/LoginButton';

const signOut = (eventId) => {
  EventActions.signoff({ eventId })
    .then(() => {
      EventActions.getEvent(eventId);
    });
};


class SignupButton extends Component {
  constructor() {
    super();
    this.state = {
      openDialog: false,
    };
    this.toggleDialog = this.toggleDialog.bind(this);
  }

  toggleDialog() {
    this.setState({
      openDialog: !this.state.openDialog,
    });
  }

  render() {
    if (this.props.authenticated) {
      if (this.props.hasSignedUp) {
        return (
          <div>
            <p>You are signed up</p>
            <Button label="Sign off" onClick={this.toggleDialog} />
            <ConfirmPopup title="Warning" open={this.state.openDialog} toggle={this.toggleDialog} continueAction={() => signOut(this.props.eventId)} text="Are you sure you want to sign off this event?" />
          </div>
        );
      }
      return (
        <div>
          <p>You are not signed up</p>
          <Checkout
            eventId={this.props.eventId}
            description={this.props.description}
            amount={this.props.price}
            comment={this.props.comment}
            hasCar={this.props.hasCar}
            changePaymentProgress={this.props.changePaymentProgress}
          />
        </div>
      );
    }
    return (
      <div>
        <p>Not logged in</p>
        <LoginButton />
      </div>
    );
  }
}

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
