import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';

class ConfirmPopup extends Component {
  constructor() {
    super();
    this.continueAction = this.continueAction.bind(this);
    this.cancelAction = this.cancelAction.bind(this);
  }

  continueAction() {
    this.props.continueAction();
    this.props.toggle();
  }

  cancelAction() {
    this.props.cancelAction();
    this.props.toggle();
  }

  render() {
    const actions = [
      <FlatButton
        key={0}
        label="Cancel"
        primary
        keyboardFocused
        onClick={this.cancelAction}
      />,
      <FlatButton
        key={1}
        label="Proceed"
        primary
        onClick={this.continueAction}
      />,
    ];
    return (
      <Dialog
        title={this.props.title}
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.toggle}
      >
        {this.props.text}
      </Dialog>
    );
  }
}

ConfirmPopup.propTypes = {
  text: PropTypes.string.isRequired,
  continueAction: PropTypes.func.isRequired,
  cancelAction: PropTypes.func,
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

ConfirmPopup.defaultProps = {
  cancelAction: () => {},
};

export default ConfirmPopup;
