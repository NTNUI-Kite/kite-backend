import React,  {Component} from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import EditView from '../components/EditView';
import EventEntry from '../components/EventEntry';

class EditEventContainer extends Component {
  render(){
    return(
      <div className = "baseContainer">
        <Paper className = "fieldContainer">
          <TextField className="fieldItem" hintText = "Tittel"/>
          <TextField className="fieldItem" hintText = "Kapasitet"/>
          <DatePicker className="fieldItem" hintText="Start-dato" mode="landscape" />
          <DatePicker className="fieldItem" hintText="Slutt-dato" mode="landscape" />
          <DatePicker className="fieldItem" hintText="frist-dato" mode="landscape" />
          <TextField className="fieldItem" hintText = "Pris" />
        </Paper>
        <Paper className = "editContainer">
          <EditView/>
        </Paper>
        <EventEntry/>
      </div>
    );
  }
}

export default EditEventContainer;
