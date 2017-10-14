import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Button from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import EditView from '../../components/board/EditView';
import LoadingIcon from '../../components/baseComponents/LoadingIcon';
import Notifier from '../../components/baseComponents/Notifier';

import EventActions from '../../actions/EventActions';
import EventStore from '../../stores/EventStore';
import BoardActions from '../../actions/BoardActions';


const createDate = (mysqlDate) => {
  const dateParts = mysqlDate.split('-');
  dateParts[2] = dateParts[2].split('T')[0];
  const d = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], 12, 0, 0);
  return d;
};

class EditEventContainer extends Component {
  constructor() {
    super();

    this.state = {
      hasRecievedData: false,
      showSnackbar: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDateStartChange = this.handleDateStartChange.bind(this);
    this.handleDateEndChange = this.handleDateEndChange.bind(this);
    this.handleDateDeadlineChange = this.handleDateDeadlineChange.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.toggleActive = this.toggleActive.bind(this);
  }

  componentWillMount() {
    EventStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    EventActions.getEvent(this.props.match.params.eventId);
  }

  componentWillReceiveProps(nextProps) {
    EventActions.getEvent(nextProps.match.params.eventId);
    this.setState({
      hasRecievedData: false,
    });
  }

  componentWillUnmount() {
    EventStore.removeChangeListener(this.onChange);
  }

  onChange() {
    const event = EventStore.getEvent();
    const blocksFromHtml = htmlToDraft(event.abstract);
    const content = ContentState.createFromBlockArray(blocksFromHtml);
    const editorState = EditorState.createWithContent(content);

    const body = {
      id: event.id,
      title: event.title,
      abstract: event.abstract,
      capacity: event.capacity,
      start: createDate(event.start),
      end: createDate(event.end),
      deadline: createDate(event.deadline),
      location: event.location,
      price: event.price,
      editorState,
      isActive: (event.is_active === 1),
      hasRecievedData: true,
    };

    this.setState(body);
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState,
    });
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  handleDateStartChange(event, date) {
    const newDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    this.setState({
      start: newDate,
    });
  }

  handleDateEndChange(event, date) {
    const newDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    this.setState({
      end: newDate,
    });
  }

  handleDateDeadlineChange(event, date) {
    const newDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    this.setState({
      deadline: newDate,
    });
  }

  saveChanges() {
    const rawState = convertToRaw(this.state.editorState.getCurrentContent());
    const markup = draftToHtml(rawState);

    const body = {
      id: this.state.id,
      title: this.state.title,
      abstract: markup,
      capacity: this.state.capacity,
      start: this.state.start.toISOString(),
      end: this.state.end.toISOString(),
      deadline: this.state.deadline.toISOString(),
      location: this.state.location,
      price: this.state.price,
      is_active: this.state.isActive,
    };
    BoardActions.updateEvent(body);
    this.setState({
      showSnackbar: true,
    });
  }

  handleRequestClose() {
    this.setState({
      showSnackbar: false,
    });
  }

  toggleActive() {
    this.setState({
      isActive: !this.state.isActive,
    });
  }

  render() {
    if (!this.state.hasRecievedData) {
      return (<LoadingIcon />);
    }
    return (
      <div className="baseContainer">
        <Paper className="fieldContainer">
          <TextField className="fieldItem" name="title" floatingLabelText="Tittel" defaultValue={this.state.title} onChange={this.handleChange} />
          <TextField className="fieldItem" name="capacity" floatingLabelText="Kapasitet" defaultValue={this.state.capacity} onChange={this.handleChange} />
          <DatePicker className="fieldItem" name="start" floatingLabelText="Start-dato" mode="landscape" value={this.state.start} onChange={this.handleDateStartChange} />
          <DatePicker className="fieldItem" name="end" floatingLabelText="Slutt-dato" mode="landscape" value={this.state.end} onChange={this.handleDateEndChange} />
          <DatePicker className="fieldItem" name="deadline" floatingLabelText="frist-dato" mode="landscape" value={this.state.deadline} onChange={this.handleDateDeadlineChange} />
          <TextField className="fieldItem" name="price" floatingLabelText="Pris" defaultValue={this.state.price} onChange={this.handleChange} />
          <Toggle label="is Active" toggled={this.state.isActive} onToggle={this.toggleActive} />
        </Paper>
        <Paper className="editContainer">
          <EditView
            editorState={this.state.editorState}
            onEditorStateChange={this.onEditorStateChange}
          />
        </Paper>
        <Button label="Lagre endringer" onClick={this.saveChanges} />
        <Notifier open={this.state.showSnackbar} onRequestClose={this.handleRequestClose} />
      </div>
    );
  }
}

EditEventContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      eventId: PropTypes.string,
    }),
  }).isRequired,
};

export default EditEventContainer;
