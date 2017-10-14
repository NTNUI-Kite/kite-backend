import React from 'react';
import PropTypes from 'prop-types';
import Done from 'material-ui/svg-icons/action/check-circle';

const Notifier = (props) => {
  let name = 'hideNotifier';

  if (props.open) {
    name = 'notifier';
    setTimeout(props.onRequestClose, 3000);
  }
  return (
    <Done className={name} style={{ width: '125px', height: '125px' }} />
  );
};

Notifier.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default Notifier;
