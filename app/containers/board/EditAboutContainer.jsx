import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import Button from 'material-ui/RaisedButton';
import EditView from '../../components/board/EditView';
import AboutActions from '../../actions/AboutActions';
import AboutStore from '../../stores/AboutStore';

import Notifier from '../../components/baseComponents/Notifier';

class EditAbout extends Component {
  constructor() {
    super();
    this.state = {
      hasRecievedData: false,
      showSnackbar: false,
    };

    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  /*
  getData() {
    getAboutInfo().then((res) => {
      const data = res.data.info;
      const blocksFromHtml = htmlToDraft(data.abstract);
      const content = ContentState.createFromBlockArray(blocksFromHtml);
      this.setState({
        title: data.title,
        abstract: data.abstract,
        editorState: EditorState.createWithContent(content),
      });
    });
  }
  */

  componentWillMount() {
    AboutStore.addChangeListener(this.onChange);
  }


  componentDidMount() {
    AboutActions.getText();
  }

  componentWillUnmount() {
    AboutStore.removeChangeListener(this.onChange);
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState,
    });
  }

  onChange() {
    const about = AboutStore.getText();
    const blocksFromHtml = htmlToDraft(about.abstract);
    const content = ContentState.createFromBlockArray(blocksFromHtml);
    const editorState = EditorState.createWithContent(content);

    const body = {
      abstract: about.text,
      editorState,
      hasRecievedData: true,
    };


    this.setState(body);
  }


  saveChanges() {
    const rawState = convertToRaw(this.state.editorState.getCurrentContent());
    const markup = draftToHtml(rawState);

    const body = {
      abstract: markup,
    };

    AboutActions.updateAbout(body);

    this.setState({
      showSnackbar: true,
    });
  }

  handleRequestClose() {
    this.setState({
      showSnackbar: false,
    });
  }

  render() {
    if (!this.state.hasRecievedData) {
      return (<div />);
    }
    return (

      <div>
        <Paper className="editContainer">
          <EditView
            editorState={this.state.editorState}
            onEditorStateChange={this.onEditorStateChange}
          />
        </Paper>
        <Button className="saveButton" label="Save changes" onClick={this.saveChanges} />
        <Notifier open={this.state.showSnackbar} onRequestClose={this.handleRequestClose} />
      </div>


    );
  }
}


export default EditAbout;
