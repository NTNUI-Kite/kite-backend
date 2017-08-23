import React,  {Component} from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import EditView from '../components/EditView';
import EventEntry from '../components/EventEntry';

import EventActions from '../actions/EventActions';
import EventStore from '../stores/EventStore';

class EditEventContainer extends Component {

  constructor(){
    super();

    this.state = {
      hasRecievedData: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleDateStartChange = this.handleDateStartChange.bind(this);
    this.handleDateEndChange = this.handleDateEndChange.bind(this);
    this.handleDateRegistrationChange = this.handleDateRegistrationChange.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount(){
    EventStore.addChangeListener(this.onChange);
  }

  componentWillUnmount(){
    EventStore.removeChangeListener(this.onChange);
  }

  componentDidMount(){
    EventActions.getEvent(this.props.eventId);
  }

  onChange(){
    const event = EventStore.getEvent();
    event.hasRecievedData = true;
    const blocksFromHtml = htmlToDraft(event.abstract);
    const content = ContentState.createFromBlockArray(blocksFromHtml);
    event.editorState = EditorState.createWithContent(content);
    this.setState(event);
  }

  onEditorStateChange(editorState){
    this.setState({
      editorState,
    });
  }

  // getData(){
  //   getEventById(0).then((res)=>{
  //     const data = res.data;
  //     const blocksFromHtml = htmlToDraft(data.abstract);
  //     const content = ContentState.createFromBlockArray(blocksFromHtml);
  //
  //
  //     this.setState({
  //       name: data.name,
  //       abstract: data.abstract,
  //       start: new Date(data.start),
  //       end: new Date(data.end),
  //       capacity: data.capacity,
  //       price: data.price,
  //       registration: new Date(data.registration),
  //       hasRecievedData:true,
  //       editorState: EditorState.createWithContent(content),
  //     });
  //   });
  // }

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
          <DatePicker className="fieldItem" name = "start" floatingLabelText="Start-dato" mode="landscape" value = {new Date(this.state.start)} onChange = {this.handleDateStartChange}/>
          <DatePicker className="fieldItem" name = "end" floatingLabelText="Slutt-dato" mode="landscape" value = {new Date(this.state.end)} onChange = {this.handleDateEndChange}/>
          <DatePicker className="fieldItem" name = "registration" floatingLabelText="frist-dato" mode="landscape" value = {new Date(this.state.registration)} onChange = {this.handleDateRegistrationChange}/>
          <TextField className="fieldItem" name = "price" floatingLabelText = "Pris" defaultValue = {this.state.price} onChange = {this.handleChange}/>
        </Paper>
        <Paper className = "editContainer">
          <EditView editorState = {this.state.editorState} onEditorStateChange = {this.onEditorStateChange}/>
        </Paper>
      </div>
    );
  }
}

export default EditEventContainer;
