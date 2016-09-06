import React from 'react'
import { render } from 'react-dom'

import {Motion, spring} from 'react-motion'


const Frame = React.createClass({

  getInitialState() {
    return {
      motion: false,
      image: this.props.requestImage(),
      motionImage: ''
    }
  },

  updateImage() {
    this.setState({
      motion: false,
      image: this.state.motionImage,
      motionImage: this.props.requestImage()
    })
  },

  componentDidMount(){
    const self = this;

    setTimeout(() => {
      this.setState({
        motionImage: this.props.requestImage()
      });
    }, 100);

    (function loop() {
      var rand = Math.round(Math.random() * 7000) + 3000;
      setTimeout(() => {

        self.setState({
          motion: true
        })

        loop();
      }, rand);
    }());
  },

  onMotionRest() {
    this.updateImage();
  },

  getInitialStyle() {
    return {
      height: 50,
      width: 50,
      angle: -10,
      opacity: 0
    }
  },

  getFinalStyle() {
    return {
      height: spring(100, {stiffness: 20, damping: 14}),
      width: spring(100, {stiffness: 20, damping: 14}),
      angle: spring(0, {stiffness: 20, damping: 14}),
      opacity: spring(1, {stiffness: 20, damping: 14})
    }
  },

  getMotion(){
    let result;

    if (this.state.motion) {
      const defaultStyle = this.getInitialStyle()
      const style = this.getFinalStyle();

      result = (
        <Motion defaultStyle={defaultStyle} style={style} onRest={this.onMotionRest} key="cuadrado">
            {({width, height, angle, opacity}) =>
              <div
                onClick={this.onClickHandler}
                style={{
                  marginRight: 'auto',
                  marginLeft: 'auto',
                  position: 'absolute',
                  top: '50%',
                  width: width + '%',
                  height: height + '%',
                  transform: 'translateY(-50%) rotate(' + angle + 'deg)',
                  opacity: opacity,
                  zIndex: 10000
                }}
              >
                <img
                 src={this.state.motionImage}
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
            }
        </Motion>
      );
    }


    return (
      result
    )
  },

  render() {
    return (
      <div
        ref="container"
        className="playerImage"
        style={{
          top: this.props.frameMeasures.top + "%",
          left: this.props.frameMeasures.left + "%",
          width: this.props.frameMeasures.width + "%",
          height: this.props.frameMeasures.height + "%"
        }}>

        <div
          className="playerBackground"
          style={{
            display: 'block',
            backgroundImage: 'url(' + this.state.image + ')',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -100
          }}>

        </div>

        { this.getMotion() }

        <img
         src={this.state.image}
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
