import React, { Component } from 'react';
import Button from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import Checkout from './Checkout';
import ConfirmPopup from './baseComponents/ConfirmPopup';

import EventActions from '../actions/EventActions';

import LoginButton from './baseComponents/LoginButton';

const signup = (body) => {
  EventActions.signup(body)
    .then(() => {
      EventActions.getEvent(body.eventId);
    });
};

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
    if (!this.props.isOpen) {
      return (
        <div>
          <p>This event is not open for signups</p>
        </div>
      );
    }

    if (this.props.authenticated) {
      if (this.props.hasSignedUp) {
        if (this.props.hasPaid) {
          // If authenticated, event is open, the user has signed up and has paid.
          return (
            <div>
              <p>You are signed up</p>
              <Button label="Sign off" onClick={this.toggleDialog} />
              <ConfirmPopup title="Warning" open={this.state.openDialog} toggle={this.toggleDialog} continueAction={() => signOut(this.props.eventId)} text="Are you sure you want to sign off this event?" />
            </div>
          );
        } else if (!this.props.onWaitingList) {
          // If the user is signed up, but has not payed but is also not on the waiting list
          return (
            <div>
              <p>You have not payed yet</p>
              <Checkout
                eventId={this.props.eventId}
                description={this.props.description}
                amount={this.props.price}
                comment={this.props.comment}
                hasCar={this.props.hasCar}
                changePaymentProgress={this.props.changePaymentProgress}
              />
              <Button label="Sign off" onClick={this.toggleDialog} />
              <ConfirmPopup title="Warning" open={this.state.openDialog} toggle={this.toggleDialog} continueAction={() => signOut(this.props.eventId)} text="Are you sure you want to sign off this event?" />
            </div>
          );
        }
        // If the user is signed up on the waiting list
        return (
          <div>
            <p>You are on the waiting list</p>
            <Button label="Sign off" onClick={this.toggleDialog} />
            <ConfirmPopup title="Warning" open={this.state.openDialog} toggle={this.toggleDialog} continueAction={() => signOut(this.props.eventId)} text="Are you sure you want to sign off this event?" />
          </div>
        );
      }
      // If the user is not signed up
      const body = {
        eventId: this.props.eventId,
        comment: this.props.comment,
        hasCar: this.props.hasCar,
      };
      return (
        <div>
          <p>You are not signed up</p>
          <Button label="Sign up" onClick={() => signup(body)} />
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
  isOpen: PropTypes.bool.isRequired,
};

export default SignupButton;
