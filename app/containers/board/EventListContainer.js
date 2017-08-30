import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Button from 'material-ui/RaisedButton';

import EventActions from '../../actions/EventActions';
import EventStore from '../../stores/EventStore';
import BoardActions from '../../actions/BoardActions';

class EventListContainer extends Component {
  constructor(){
    super();
    this.state = {
      events: []
    }

    this.onChange = this.onChange.bind(this);
    this.onNewEventClick = this.onNewEventClick.bind(this);
  }

  componentWillMount(){
    EventStore.addChangeListener(this.onChange);
  }

  componentWillUnmount(){
    EventStore.removeChangeListener(this.onChange);
  }

  componentDidMount(){
    EventActions.getEvents();
  }

  onChange(){
    this.setState({
      events: EventStore.getEvents()
    })
  }

  onEditClick(id){
    this.props.history.push("/board/editEvent/" + id);
  }

  onNewEventClick(){
    BoardActions.addNewEvent()
    .then((res) => {
      this.props.history.push("/board/editEvent/" + res.id)
    });
  }

  render(){

    return(
      <div className="baseContainer">
        <Button label ="Lag ny event" onClick = {this.onNewEventClick}/>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Navn</TableHeaderColumn>
              <TableHeaderColumn>Start</TableHeaderColumn>
              <TableHeaderColumn>Slutt</TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              this.state.events.map((event,id) => (
                <TableRow key = {id}>
                  <TableRowColumn>{event.title}</TableRowColumn>
                  <TableRowColumn>{event.start}</TableRowColumn>
                  <TableRowColumn>{event.end}</TableRowColumn>
                  <TableRowColumn>
                    {/* <Link to={"/board/editEvent/" + event.id}>Edit</Link> */}
                    <Button label = "Edit" onClick = {() => this.onEditClick(event.id)}/>
                  </TableRowColumn>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default EventListContainer;
