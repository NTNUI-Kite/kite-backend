import React from 'react';
import { Card, CardText } from 'material-ui/Card';
import PropTypes from 'prop-types';

const AboutContent = props => (
  <Card className="AboutContent">
    <CardText>
      {props.informasjon.abstract}
    </CardText>
  </Card>
);

AboutContent.propTypes = {
  informasjon: PropTypes.shape({
    abstract: PropTypes.string.isRequired,
  }).isRequired,
};

export default AboutContent;
