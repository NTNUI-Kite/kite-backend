import React,  {Component} from 'react';
import Card from 'material-ui/Card';
import EditView from '../components/EditView';

class EditEventContainer extends Component {
  render(){
    return(
      <Card className = "baseContainer">
        <EditView/>
      </Card>
    );
  }
}

export default EditEventContainer;
