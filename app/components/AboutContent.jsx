import React from 'react';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';

const AboutContent = (props) => {
  return (<Paper className="AboutContent">
    <div dangerouslySetInnerHTML={{ __html: props.informasjon.abstract }} />
  </Paper>);
};

AboutContent.propTypes = {
  informasjon: PropTypes.shape({
    abstract: PropTypes.string,
  }),
};

AboutContent.defaultProps = {
  informasjon: PropTypes.shape({
    abstract: '',
  }),
};

export default AboutContent;
