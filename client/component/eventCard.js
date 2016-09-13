import React from 'react'
import {Button, Grid, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router';

import eventService  from '../service/event';

import moment from 'moment'

const EventCard = React.createClass({

  getInitialState(){
    return {
      now: moment()
    };
  },

  componentDidMount() {
    const intervalFunc = setInterval(
      () => {
        this.setState({
          now: moment()
        });
      }
    , 0);

    this.setState({
      intervalFunc
    });
  },

  componentWillUnmount() {
    clearInterval(this.state.intervalFunc);
  },

  render() {
    const { event, eventKind } = this.props;

    const { footterStateColor, footterStateLabel } = eventKind;

    const now = this.state.now

    var ms = moment("2016-10-15").diff(now);
    var duration = moment.duration(ms);

    let diff =  duration.get('hours') + 'h ' +  duration.get('minutes') + 'm ' + duration.get('seconds') + 's'
    //var s = d.format("hh:mm:ss");

    return (
      <Col xs={6} sm={4} md={3}>
        <div style={{
          border: '1px solid gray',
          marginBottom: '15px'
        }}>
          <div>
            <img
              src="/images/tile_bkg.png"
              style={{
                borderBottom: '1px solid gray',
                width: '100%'
              }} />
          </div>
          <div style={{
            padding: '0px 15px'
          }}>
            <h5 style={{
              color: '#7D55C7'
            }}>
              {event.name}
            </h5>
            <p>Time left: {diff}</p>

            <i style={{
              backgroundColor: footterStateColor,
              width: '20px',
              height: '20px',
              display: 'inline-block',
              borderRadius: '10px'
            }}/>

            <div style={{
              float: 'right',
              height: '20px',
              lineHeight: '20px',
              display: 'inline-block',
              verticalAlign: 'top',
              paddingLeft: '5px',
              color: '#7D55C7'
            }}>

              {
                eventKind.key !== 'expired'
                ? (
                  <Link style={{
                    color: '#7D55C7'
                  }}
                    to={{ pathname: `/event/${event.id}`}}>
                    <span className="glyphicon glyphicon-pencil"></span>
                  </Link>

                )
                : null
              }

              {
                eventKind.key !== 'expired'
                ? (
                  <a style={{
                    color: '#7D55C7'
                    }}
                    href={`/slider?eventId=${event.id}`}
                    target="_blank">

                    <span
                      className="glyphicon glyphicon-link"
                    />

                  </a>
                )
                : null
              }

              { eventKind.key === 'expired' ? <span className="glyphicon glyphicon-info-sign"></span> : null }

            </div>

            <div style={{
              height: '20px',
              lineHeight: '20px',
              display: 'inline-block',
              verticalAlign: 'top',
              paddingLeft: '5px'
            }}>
              {footterStateLabel}
            </div>
          </div>

        </div>
      </Col>
    )
  }
})

export default EventCard;
