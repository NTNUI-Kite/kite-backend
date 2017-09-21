import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Card } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import EditView from '../components/board/EditView';

import { getAboutInfo } from '../utilities/APIFunctions';

class EditAbout extends Component {
  constructor() {
    super();
    this.state = {
      hasRecievedData: false,
    };

    this.onEditorStateChange = this.onEditorStateChange.bind(this);
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState,
    });
  }
  /*
  getData(){
    getAboutInfo(0).then((res)=>{
      const data = res.data;
      const blocksFromHtml = htmlToDraft(data.abstract);
      const content = ContentState.createFromBlockArray(blocksFromHtml);


      this.setState({
        name: data.name,
        abstract: data.abstract,
        start: new Date(data.start),
        end: new Date(data.end),
        capacity: data.capacity,
        price: data.price,
        registration: new Date(data.registration),
        hasRecievedData:true,
        editorState: EditorState.createWithContent(content),
      });
    });
  }
*/
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

  componentDidMount() {
    this.getData();
  }


  render() {
    return (
      <div className="baseContainer">
        <Card>
          <p>
            This is the edit about page, here it will be a rich text editor and some fancy graphics.<br />
            <strong>Soon to come</strong>
          </p>
        </Card>
        <Paper className="editContainer">
          <EditView editorState={this.state.editorState} onEditorStateChange={this.onEditorStateChange} />
        </Paper>
      </div>


    );
  }
}


export default EditAbout;
