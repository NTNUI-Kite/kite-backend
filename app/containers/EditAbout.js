import React, {Component} from 'react';
import {Card} from 'material-ui/Card'


class EditAbout extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className="baseContainer">
        <Card>
          <p>
            This is the edit about page, here it will be a rich text editor and some fancy graphics.<br/>
            <strong>Soon to come</strong>
          </p>
        </Card>
      </div>



    )
  }



}


export default EditAbout
