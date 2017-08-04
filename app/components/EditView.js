import React, {Component} from 'react';

import { Editor } from 'react-draft-wysiwyg';

class EditView extends Component {

  constructor(props){
    super(props);
  }

  onEditorStateChange(editorState){
    this.setState({
      editorState,
    });
  }

  render() {
    return (
      <div>
        <div>
          <Editor
            editorState={this.props.editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={this.props.onEditorStateChange}
          />
        </div>
    </div>
    );
  }
}

export default EditView;
