import React from 'react'
import {Button, Grid, Row, Col} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import eventService  from '../service/event';

import EventCard  from './eventCard';

const EventList = React.createClass({

  getInitialState(){
    return {
      events: {
        live: {
            key: 'live',
            title: 'Live Events',
            footterStateColor: 'green',
            footterStateLabel: 'Live',
            data: []
        },
        coming: {
            key: 'coming',
            title: 'Coming Events',
            footterStateColor: 'blue',
            footterStateLabel: 'Not Started',
            data: []
        },
        expired: {
            key: 'expired',
            title: 'Expired Events',
            footterStateColor: 'red',
            footterStateLabel: 'Finished',
            data: []
        }
      }
    };
  },

  componentDidMount(){
    eventService.getEvents()
    .then((data) => {

      this.setState({
        events: {
          live: {
            ...this.state.events.live,
            data
          },
          coming: {
            ...this.state.events.coming,
            data
          },
          expired: {
            ...this.state.events.expired,
            data
          }
        }
      });

    }, (error) => {
      console.log(error);
    })
  },

  render() {
    return (
      <div>



        <div>
          <LinkContainer
            to={{ pathname: '/event'}}
            style= {{
              float: 'right'
            }}>
            <Button>Add Event</Button>
          </LinkContainer>

          <h1>Your Event Picz Events</h1>
        </div>

        {
          Object.keys(this.state.events).map((eventKindKey) => {

            const eventKind = this.state.events[eventKindKey];

            return (
              <div key={eventKindKey}>
                <h3>{eventKind.title}</h3>
                <Grid style={{
                  paddingLeft: '0px',
                  paddingRight: '0px'
                }}>
                  <Row>
                  {
                    eventKind.data.map((event) => {
                      return (
                        <EventCard
                          key={event.id}
                          eventKind={eventKind}
                          event={event} />
                      )
                    })
                  }
                  </Row>
                </Grid>
              </div>
            )
          })
        }


      </div>
    )
  }
})

{/*<Row key={event.id} className="show-grid">
  <Col xs={12} md={4}>{event.name}</Col>
  <Col xs={6} md={7}>{event.hashtags}</Col>
  <Col xs={6} md={1}>
    <LinkContainer to={{ pathname: '/event/' + event.id}}>
      <Button>Edit</Button>
    </LinkContainer>
  </Col>

</Row>*/}

export default EventList;
