import React, { Component } from 'react';

import AboutContent from '../components/AboutContent';
import AboutLinks from '../components/AboutLinks';

import AboutActions from '../actions/AboutActions';
import AboutStore from '../stores/AboutStore';

class AboutContainer extends Component {
  constructor() {
    super();
    this.state = {
      text: {},
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    AboutStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    AboutActions.getText();
  }

  componentWillUnmount() {
    AboutStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      text: AboutStore.getText(),
    });
  }

  render() {
    return (
      <div className="baseContainer">

        <AboutContent informasjon={this.state.text} />
        <AboutLinks />

      </div>);
  }
}

export default AboutContainer;
