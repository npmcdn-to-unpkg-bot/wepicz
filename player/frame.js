import React from 'react'
import { render } from 'react-dom'

const Frame = React.createClass({

  render() {
    return (
      <div className="playerImage"
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
            top: this.props.frameMeasures.top,
            left: this.props.frameMeasures.left,
            width: this.props.frameMeasures.width,
            height: this.props.frameMeasures.height,
            zIndex: -100
          }}>

        </div>

        <img
         src={this.props.image}
         style={{
           display: 'block',
           maxWidth: '100%',
           height: 'auto',
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
