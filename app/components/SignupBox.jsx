import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';

import EventActions from '../actions/EventActions';

import SignupButton from './SignupButton';
import Loader from './baseComponents/Loader';

const signUp = (eventId, comment, hasCar) => {
  EventActions.signup({ eventId, comment, hasCar })
    .then(() => {
      EventActions.getEvent(eventId);
    });
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
      paymentInProgress: false,
      hasPaid: false,
    };

    this.toggleCar = this.toggleCar.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changePaymentProgress = this.changePaymentProgress.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      comment: nextProps.userInfo.comment,
      hasCar: (nextProps.userInfo.has_car === 1),
      userInfo: nextProps.userInfo,
      hasPaid: (nextProps.userInfo.has_paid === 1),
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

  changePaymentProgress(value) {
    this.setState({
      paymentInProgress: value,
    });
  }

  render() {
    if (this.state.paymentInProgress) {
      return (
        <Paper className="signupBox">
          <Loader />
        </Paper>);
    }

    return (
      <Paper className="signupBox">
        <TextField
          key={this.state.userInfo}
          name="comment"
          hintText="Allergies etc."
          floatingLabelText="Comment"
          defaultValue={this.state.comment}
          onChange={this.handleChange}
          multiLine
          disabled={this.props.hasSignedUp}
        />
        <Checkbox
          label="Has car"
          checked={this.state.hasCar}
          onCheck={this.toggleCar}
          disabled={this.props.hasSignedUp}
        />
        <SignupButton
          {...this.props}
          comment={this.state.comment}
          hasCar={this.state.hasCar}
          hasPaid={this.state.hasPaid}
          onWaitingList={this.props.onWaitingList}
          changePaymentProgress={this.changePaymentProgress}
        />
      </Paper>
    );
  }
}

SignupBox.propTypes = {
  hasSignedUp: PropTypes.bool.isRequired,
  userInfo: PropTypes.shape({
    comment: PropTypes.string.isRequired,
    has_car: PropTypes.number.isRequired,
  }).isRequired,
};

export default SignupBox;
