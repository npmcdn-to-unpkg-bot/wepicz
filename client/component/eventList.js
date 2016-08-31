import React from 'react'
import {Button, Grid, Row, Col} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import eventService  from '../service/event';

const EventList = React.createClass({

  getInitialState(){
    return {
      events: []
    };
  },

  componentDidMount(){
    eventService.getEvents()
    .then((data) => {

      this.setState({
        events: data
      });

    }, (error) => {
      console.log(error);
    })
  },

  render() {
    return (
      <div>
        <h1>Event List</h1>

        <LinkContainer to={{ pathname: '/event'}}>
          <Button>Add Event</Button>
        </LinkContainer>

        <Grid>
        {
          this.state.events.map((event) => {
            return (
              <Row key={event.id} className="show-grid">
                <Col xs={12} md={4}>{event.name}</Col>
                <Col xs={6} md={7}>{event.hashtags}</Col>
                <Col xs={6} md={1}>
                  <LinkContainer to={{ pathname: '/event/' + event.id}}>
                    <Button>Edit</Button>
                  </LinkContainer>
                </Col>

              </Row>
            )
          })
        }
        </Grid>
      </div>
    )
  }
})

export default EventList;
