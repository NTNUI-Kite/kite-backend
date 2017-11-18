import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Button from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import Paper from 'material-ui/Paper';

// import EventStore from '../../stores/EventStore';
import BoardActions from '../../actions/BoardActions';
import BoardStore from '../../stores/BoardStore';

const createDate = (mysqlDate) => {
  const dateParts = mysqlDate.split('-');
  return new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0, 2));
};

const toggleStyle = {
  width: '100px',
};

class EventListContainer extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onNewEventClick = this.onNewEventClick.bind(this);
    this.onActiveToggle = this.onActiveToggle.bind(this);
    this.onOpenToggle = this.onOpenToggle.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onViewClick = this.onViewClick.bind(this);
  }

  componentWillMount() {
    BoardStore.addChangeListener(this.onChange);
  }


  componentDidMount() {
    BoardActions.getEvents();
  }

  componentWillUnmount() {
    BoardStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      events: BoardStore.getEvents(),
    });
  }

  onEditClick(id) {
    this.props.history.push(`/board/editEvent/${id}`);
  }

  onViewClick(id) {
    this.props.history.push(`/board/event/${id}`);
  }

  onNewEventClick() {
    BoardActions.addNewEvent()
      .then((res) => {
        this.props.history.push(`/board/editEvent/${res.id}`);
      });
  }

  onActiveToggle(event) {
    const newEvent = Object.assign({}, event);
    newEvent.is_active = !event.is_active;

    BoardActions.updateEvent(newEvent);
  }

  onOpenToggle(event) {
    const newEvent = Object.assign({}, event);
    newEvent.is_open = !event.is_open;

    BoardActions.updateEvent(newEvent);
  }

  render() {
    return (
      <Paper className="baseContainer">
        <Button label="Lag ny event" onClick={this.onNewEventClick} />
        <Table
          selectable={false}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>Navn</TableHeaderColumn>
              <TableHeaderColumn>Start</TableHeaderColumn>
              <TableHeaderColumn>Slutt</TableHeaderColumn>
              <TableHeaderColumn style={toggleStyle} >Aktivert</TableHeaderColumn>
              <TableHeaderColumn style={toggleStyle} >Åpen</TableHeaderColumn>
              <TableHeaderColumn />
              <TableHeaderColumn />
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
          >
            {
              this.state.events.map(event => (
                <TableRow key={event.id}>
                  <TableRowColumn>{event.title}</TableRowColumn>
                  <TableRowColumn>{createDate(event.start).toDateString()}</TableRowColumn>
                  <TableRowColumn>{createDate(event.end).toDateString()}</TableRowColumn>
                  <TableRowColumn style={toggleStyle}>
                    <Toggle
                      toggled={(event.is_active === 1 || event.is_active === true)}
                      onToggle={() => this.onActiveToggle(event)}
                    />
                  </TableRowColumn>
                  <TableRowColumn style={toggleStyle} >
                    <Toggle
                      toggled={(event.is_open === 1 || event.is_open === true)}
                      onToggle={() => this.onOpenToggle(event)}
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    {/* <Link to={'/board/editEvent/' + event.id}>Edit</Link> */}
                    <Button label="Edit" onClick={() => this.onEditClick(event.id)} />
                  </TableRowColumn>
                  <TableRowColumn>
                    <Button label="View" onClick={() => this.onViewClick(event.id)} />
                  </TableRowColumn>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

EventListContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(EventListContainer);
