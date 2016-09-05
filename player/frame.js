import React from 'react'
import { render } from 'react-dom'

const Frame = React.createClass({

  componentDidMount(){
    console.log(this.refs.container.getBoundingClientRect());
  },

  render() {
    return (
      <div
        ref="container"
        className="playerImage"
        style={{
          top: this.props.frameMeasures.top,
          left: this.props.frameMeasures.left,
          width: this.props.frameMeasures.width,
          height: this.props.frameMeasures.height
        }}>

        <div
          className="playerBackground"
          style={{
            backgroundImage: 'url(' + this.props.image + ')',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -100
          }}>

        </div>

        <img
         src={this.props.image}
         style={{
           display: 'block',
           height: '100%',
           marginLeft: 'auto',
           marginRight: 'auto',
           position: 'relative',
           top: '50%',
           transform: 'translateY(-50%)'
         }}
        />
      </div>
    )
  }
});

export default Frame;
