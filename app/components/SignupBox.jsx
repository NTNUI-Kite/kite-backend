import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/RaisedButton';
import EventActions from '../actions/EventActions';


const signUp = (eventId) => {
  EventActions.signup({ eventId })
    .then(() => {
      EventActions.getEvent(eventId);
    });
};

const signOut = (eventId) => {
  EventActions.signoff({ eventId })
    .then(() => {
      EventActions.getEvent(eventId);
    });
};

const login = () => {

};

class SignupBox extends Component {
  constructor(props) {
    super(props);
    const text = 'You have not signed up';
    const label = 'Sign up';
    const onClick = signUp;
    this.state = {
      text,
      label,
      onClick,
    };
  }

  componentWillReceiveProps(nextProps) {
    let text = 'You have not signed up';
    let label = 'Sign up';
    let onClick = signUp;

    if (nextProps.hasSignedUp) {
      text = 'You are signed up';
      label = 'Sign out';
      onClick = signOut;
    }

    if (!nextProps.authenticated) {
      text = 'You are not logged in';
      label = 'Login';
      onClick = login;
    }

    this.setState({
      text,
      label,
      onClick,
    });
  }

  render() {
    return (
      <Paper className="signupBox">
        <p>{this.state.text}</p>
        <Button label={this.state.label} onClick={() => this.state.onClick(this.props.eventId)} />
      </Paper>
    );
  }
}

SignupBox.propTypes = {
  hasSignedUp: PropTypes.bool.isRequired,
  eventId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

export default SignupBox;
