import React from 'react';
import { Card, CardText } from 'material-ui/Card';

const AboutContent = () => (
  <Card className="AboutContent">
    <CardText>
      {this.props.informasjon.abstract}
    </CardText>
  </Card>
);

export default AboutContent;
