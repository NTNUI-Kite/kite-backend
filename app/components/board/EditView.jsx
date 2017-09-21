import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';

class EditView extends Component {
  onEditorStateChange(editorState) {
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


EditView.propTypes = {
  editorState: PropTypes.shape({}).isRequired,
  onEditorStateChange: PropTypes.func.isRequired,
};

export default EditView;
