import React,  {Component} from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Button from 'material-ui/RaisedButton';

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import EditView from '../../components/board/EditView';
//import EventEntry from '../components/EventEntry';

import EventActions from '../../actions/EventActions';
import EventStore from '../../stores/EventStore';

class EditEventContainer extends Component {

  constructor(){
    super();

    this.state = {
      hasRecievedData: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleDateStartChange = this.handleDateStartChange.bind(this);
    this.handleDateEndChange = this.handleDateEndChange.bind(this);
    this.handleDateDeadlineChange = this.handleDateDeadlineChange.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  componentWillMount(){
    EventStore.addChangeListener(this.onChange);
  }

  componentWillUnmount(){
    EventStore.removeChangeListener(this.onChange);
  }

  componentDidMount(){
    EventActions.getEvent(this.props.match.params.eventId);
  }

  componentWillReceiveProps(nextProps){
    EventActions.getEvent(nextProps.match.params.eventId);
    this.setState({
      hasRecievedData: false
    });
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

  handleDateDeadlineChange(event,date){
    this.setState({
      deadline: date
    });
  }

  saveChanges(){

    const rawState = convertToRaw(this.state.editorState.getCurrentContent());
    const markup = draftToHtml(rawState);

    const body = {
      id: this.state.id,
      title: this.state.title,
      abstract: markup,
      capacity: this.state.capacity,
      start: this.state.start,
      end: this.state.end,
      deadline: this.state.deadline,
      location: this.state.location,
      price: this.state.price
    }
    EventActions.updateEvent(body);
  }

  render(){

    if(!this.state.hasRecievedData){
      return(<div></div>);
    }
    return(
      <div className = "baseContainer">
        <Paper className = "fieldContainer">
          <TextField className="fieldItem" name = "title" floatingLabelText = "Tittel" defaultValue = {this.state.title} onChange = {this.handleChange}/>
          <TextField className="fieldItem" name = "capacity" floatingLabelText = "Kapasitet" defaultValue = {this.state.capacity} onChange = {this.handleChange}/>
          <DatePicker className="fieldItem" name = "start" floatingLabelText="Start-dato" mode="landscape" value = {new Date(this.state.start)} onChange = {this.handleDateStartChange}/>
          <DatePicker className="fieldItem" name = "end" floatingLabelText="Slutt-dato" mode="landscape" value = {new Date(this.state.end)} onChange = {this.handleDateEndChange}/>
          <DatePicker className="fieldItem" name = "deadline" floatingLabelText="frist-dato" mode="landscape" value = {new Date(this.state.deadline)} onChange = {this.handleDateDeadlineChange}/>
          <TextField className="fieldItem" name = "price" floatingLabelText = "Pris" defaultValue = {this.state.price} onChange = {this.handleChange}/>
        </Paper>
        <Paper className = "editContainer">
          <EditView editorState = {this.state.editorState} onEditorStateChange = {this.onEditorStateChange}/>
        </Paper>
        <Button label = "Lagre endringer" onClick = {this.saveChanges}/>
      </div>
    );
  }
}

export default EditEventContainer;
