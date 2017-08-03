import React, {Component} from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

class EditView extends Component {

  constructor(props){
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    }

    this.onEditorStateChange = this.onEditorStateChange.bind(this);
  }

  onEditorStateChange(editorState){
    this.setState({
      editorState,
    });
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}

export default EditView;
