import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Button from 'material-ui/RaisedButton';

import EventActions from '../../actions/EventActions';
import EventStore from '../../stores/EventStore';
import BoardActions from '../../actions/BoardActions';

const createDate = (mysqlDate) => {
  const dateParts = mysqlDate.split('-');
  return new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0, 2));
};

class EventListContainer extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onNewEventClick = this.onNewEventClick.bind(this);
  }

  componentWillMount() {
    EventStore.addChangeListener(this.onChange);
  }


  componentDidMount() {
    EventActions.getEvents();
  }

  componentWillUnmount() {
    EventStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      events: EventStore.getEvents(),
    });
  }

  onEditClick(id) {
    this.props.history.push(`/board/editEvent/${id}`);
  }

  onNewEventClick() {
    BoardActions.addNewEvent()
      .then((res) => {
        this.props.history.push(`/board/editEvent/${res.id}`);
      });
  }
  render() {
    return (
      <div className="baseContainer">
        <Button label="Lag ny event" onClick={this.onNewEventClick} />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Navn</TableHeaderColumn>
              <TableHeaderColumn>Start</TableHeaderColumn>
              <TableHeaderColumn>Slutt</TableHeaderColumn>
              <TableHeaderColumn />
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              this.state.events.map(event => (
                <TableRow key={event.id}>
                  <TableRowColumn>{event.title}</TableRowColumn>
                  <TableRowColumn>{createDate(event.start).toDateString()}</TableRowColumn>
                  <TableRowColumn>{createDate(event.end).toDateString()}</TableRowColumn>
                  <TableRowColumn>
                    {/* <Link to={'/board/editEvent/' + event.id}>Edit</Link> */}
                    <Button label="Edit" onClick={() => this.onEditClick(event.id)} />
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

EventListContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(EventListContainer);
