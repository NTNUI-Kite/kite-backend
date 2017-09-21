import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';

import EventActions from '../actions/EventActions';


const signUp = (eventId, comment, hasCar) => {
  console.log(eventId, comment, hasCar);
  EventActions.signup({ eventId, comment, hasCar })
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
      hasCar: false,
      comment: '',
    };

    this.toggleCar = this.toggleCar.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  toggleCar() {
    this.setState({
      hasCar: !this.state.hasCar,
    });
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  render() {
    return (
      <Paper className="signupBox">
        <p>{this.state.text}</p>
        <TextField
          name="comment"
          hintText="Comment here"
          floatingLabelText="Comment"
          defaultValue={this.state.comment}
          onChange={this.handleChange}
          multiLine={true}
          disabled={this.props.hasSignedUp}
        />
        <Checkbox
          label="Has car"
          checked={this.state.hasCar}
          onCheck={this.toggleCar}
          disabled={this.props.hasSignedUp}
        />
        <Button
          label={this.state.label}
          onClick={
            () => this.state.onClick(this.props.eventId, this.state.comment, this.state.hasCar)
          }
        />
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
