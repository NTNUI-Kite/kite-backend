import React, {Component} from 'react';
import Paper from 'material-ui/Paper';

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const PaperExampleSimple = () => (
  <Paper>
    <Paper style={style} zDepth={1} />
    <Paper style={style} zDepth={1} />
    <Paper style={style} zDepth={1} />
    <Paper style={style} zDepth={1} />
    <Paper style={style} zDepth={1} />
    <Paper style={style} zDepth={1} />
    <Paper style={style} zDepth={1} />
    <Paper style={style} zDepth={1} />
  </Paper>
);

class BoardLinks extends Component {
  render(){
    return(
      <PaperExampleSimple/>
    );
  }
}

export default BoardLinks
