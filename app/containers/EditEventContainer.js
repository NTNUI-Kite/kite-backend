import React,  {Component} from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';

import EditView from '../components/EditView';
import EventEntry from '../components/EventEntry';

import {getEventById} from '../utilities/APIFunctions';

class EditEventContainer extends Component {

  constructor(){
    super();

    this.state = {
      name: "",
      abstract: "",
      start: new Date("2000-01-01"),
      end: new Date("2000-01-01"),
      capacity: "",
      price: "0",
      registration: new Date("2000-01-01"),
      hasRecievedData: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleDateStartChange = this.handleDateStartChange.bind(this);
    this.handleDateEndChange = this.handleDateEndChange.bind(this);
    this.handleDateRegistrationChange = this.handleDateRegistrationChange.bind(this);
  }

  getData(){
    getEventById(0).then((res)=>{
      const data = res.data;
      this.setState({
        name: data.name,
        abstract: data.abstract,
        start: new Date(data.start),
        end: new Date(data.end),
        capacity: data.capacity,
        price: data.price,
        registration: new Date(data.registration),
        hasRecievedData:true
      });
    });
  }

  componentDidMount(){
    this.getData();
  }

  handleChange({target}) {
      this.setState({
          [target.name]: target.value
      });
  }

  handleDateStartChange(event, date){
    this.setState({
      start:date
    });
  }

  handleDateEndChange(event,date){
    this.setState({
      end: date
    });
  }

  handleDateRegistrationChange(event,date){
    this.setState({
      registration: date
    });
  }



  render(){

    if(!this.state.hasRecievedData){
      return(<div></div>);
    }

    return(
      <div className = "baseContainer">
        <Paper className = "fieldContainer">
          <TextField className="fieldItem" name = "name" floatingLabelText = "Tittel" defaultValue = {this.state.name} onChange = {this.handleChange}/>
          <TextField className="fieldItem" name = "capacity" floatingLabelText = "Kapasitet" defaultValue = {this.state.capacity} onChange = {this.handleChange}/>
          <DatePicker className="fieldItem" name = "start" floatingLabelText="Start-dato" mode="landscape" value = {this.state.start} onChange = {this.handleDateStartChange}/>
          <DatePicker className="fieldItem" name = "end" floatingLabelText="Slutt-dato" mode="landscape" value = {this.state.end} onChange = {this.handleDateEndChange}/>
          <DatePicker className="fieldItem" name = "registration" floatingLabelText="frist-dato" mode="landscape" value = {this.state.registration} onChange = {this.handleDateRegistrationChange}/>
          <TextField className="fieldItem" name = "price" floatingLabelText = "Pris" defaultValue = {this.state.price} onChange = {this.handleChange}/>
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
