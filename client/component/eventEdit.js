import React from 'react'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import { Button } from 'react-bootstrap';

import eventService from '../service/event';
import FieldGroup from './helper/fieldGroup'

const EventEdit = React.createClass({

  getInitialState(){
    return {
      event: {
        name: '',
        hashtags: ''
      }
    };
  },

  componentDidMount() {

    if (this.props.params.eventId) {
      eventService.getEvent(
        this.props.params.eventId
      ).then((data)=>{
        this.setState({
          event: data
        });

      }, (error)=> {
        console.log(error);
      })
    }
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },


  handleTextChange(e) {

    const event = {
      ...this.state.event,
      [e.target.id]: e.target.value
    }

    this.setState({
      event: event
    });
  },

  handleSubmit(e) {
    e.preventDefault();

    eventService.save(
      this.state.event
    ).then((data)=>{

      this.context.router.push("/events")

    }, (error)=> {
      console.log(error);
    })
  },

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <FieldGroup
            id="name"
            type="text"
            label="Name"
            placeholder="Event Name"
            value={this.state.event.name}
            onChange={this.handleTextChange}
          />

          <FieldGroup
            id="hashtags"
            type="text"
            label="Hashtags"
            placeholder="Hasgtags"
            value={this.state.event.hashtags}
            onChange={this.handleTextChange}
          />

          <Button type="submit">
            Save
          </Button>
        </form>
      </div>

    )
  }
})

export default EventEdit;
