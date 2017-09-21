import React from 'react';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';

const AbstractBox = props => (
  <Paper className="abstractBox">
    <div dangerouslySetInnerHTML={{ __html: props.abstract }} />
  </Paper>
);

AbstractBox.propTypes = {
  abstract: PropTypes.string,
};

AbstractBox.defaultProps = {
  abstract: '',
};

export default AbstractBox;
