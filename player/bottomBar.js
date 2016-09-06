import React from 'react'
import { render } from 'react-dom'

const BotoomBar = React.createClass({

  componentDidMount(){
    //console.log(this.refs.container.getBoundingClientRect());
  },

  render() {
    return (
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: '100%',
        height: '10%'
      }}>
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          opacity: 0.5
        }}>
        </div>
        <img
          src={'/assets/img/logo@2x.png'}
          style={{
            position: 'absolute',
            zIndex: 5000,
          }}
        />
      </div>
    )
  }
});

export default BotoomBar;
