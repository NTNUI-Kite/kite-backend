import React,  {Component} from 'react';
import Card from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import EditView from '../components/EditView';
import EventEntry from '../components/EventEntry';

class EditEventContainer extends Component {
  render(){
    return(
      <div className = "baseContainer">
        <Card className = "fieldContainer">
          <TextField className="fieldItem" hintText = "Tittel"/>
          <TextField className="fieldItem" hintText = "Kapasitet"/>
          <DatePicker className="fieldItem" hintText="Start-dato" mode="landscape" />
          <DatePicker className="fieldItem" hintText="Slutt-dato" mode="landscape" />
          <DatePicker className="fieldItem" hintText="frist-dato" mode="landscape" />
          <TextField className="fieldItem" hintText = "Pris" />
        </Card>
        <Card className = "editContainer">
          <EditView/>
        </Card>
        <EventEntry/>
      </div>
    );
  }
}

export default EditEventContainer;
