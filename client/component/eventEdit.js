import React from 'react'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import { Button } from 'react-bootstrap';

import eventService from '../service/event';
import FieldGroup from './helper/fieldGroup'

const layouts = [
  'one',
  'two',
  'three'
]

const transitions = [
  'pan-zoom',
  'fade',
  'rotate'
]

const EventEdit = React.createClass({

  getInitialState(){
    return {
      event: {
        layouts: ''
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

  toggleValue (key, value) {
    let currentValues = (this.state.event[key] || '').split(' ');

    const index = currentValues.indexOf(value);

    if (index > 0){
      currentValues = [...currentValues.slice(0, index), ...currentValues.slice(index + 1, currentValues.lenght)];
    } else {
      currentValues = [...currentValues, value];
    }

    const event = {
      ...this.state.event,
      [key]: currentValues.join(' ').trim()
    }

    this.setState({
      event: event
    });
  },

  render() {
    return (
      <div>
        <h1>Edit Event</h1>

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
            placeholder="Hashtags"
            value={this.state.event.hashtags}
            onChange={this.handleTextChange}
          />

          <FieldGroup
            id="latitude"
            type="text"
            label="Latitude"
            placeholder="Latitude"
            value={this.state.event.latitude}
            onChange={this.handleTextChange}
          />

          <FieldGroup
            id="longitude"
            type="text"
            label="Longitude"
            placeholder="Longitude"
            value={this.state.event.longitude}
            onChange={this.handleTextChange}
          />

          <FieldGroup
            id="distance"
            type="text"
            label="Distance"
            placeholder="Distance"
            value={this.state.event.distance}
            onChange={this.handleTextChange}
          />

          <div>Layouts</div>

          {
            layouts.map((layout) => {

              console.log(this.state.event.layouts);
              console.log((this.state.event.layouts || '').split(' ').includes(layout) ? 'primary' : 'default');

              return (
                <Button key={layout}
                      bsStyle={(this.state.event.layouts || '').split(' ').includes(layout) ? 'primary' : 'default'}
                      onClick={() => { this.toggleValue('layouts', layout) } }>
                  {layout}
                </Button>
              )
            })
          }

          <div>Transitions</div>

          {
            transitions.map((transition) => {

              console.log(this.state.event.transitions);
              console.log((this.state.event.transitions || '').split(' ').includes(transition) ? 'primary' : 'default');

              return (
                <Button key={transition}
                      bsStyle={(this.state.event.transitions || '').split(' ').includes(transition) ? 'primary' : 'default'}
                      onClick={() => { this.toggleValue('transitions', transition) } }>
                  {transition}
                </Button>
              )
            })
          }

          <hr/>

          <Button type="submit">
            Save
          </Button>
        </form>
      </div>

    )
  }
})

export default EventEdit;
