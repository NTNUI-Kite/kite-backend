import React from 'react';
import Paper from 'material-ui/Paper';
const AbstractBox = (props) => {
  return(
    <Paper className = "abstractBox">
      <div dangerouslySetInnerHTML={{__html:props.abstract}}></div>
    </Paper>
  );
}

export default AbstractBox
