import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

import AboutContent from '../components/AboutContent';

import AboutActions from '../actions/AboutActions';
import AboutStore from '../stores/AboutStore';

import BoardList from '../components/board/BoardList';

import BoardActions from '../actions/BoardActions';
import BoardStore from '../stores/BoardStore';

class AboutContainer extends Component {
  constructor() {
    super();
    this.state = {
      text: {},
      boardMembers: [],
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    AboutStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    AboutActions.getText();
    BoardActions.getBoardMembers();
  }

  componentWillUnmount() {
    AboutStore.removeChangeListener(this.onChange);
    BoardStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      text: AboutStore.getText(),
      boardMembers: BoardStore.getBoardMembers(),
    });
  }

  render() {
    return (
      <div className="aboutContainer">

        <AboutContent informasjon={this.state.text} />
        <Paper>
          <h1 style={{ textAlign: 'center' }} > Boardmembers </h1>
        </Paper>
        <BoardList members={this.state.boardMembers} />
      </div>);
  }
}

export default AboutContainer;
