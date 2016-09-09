import React from 'react'
import { render } from 'react-dom'

import {Motion, spring} from 'react-motion'

let count = 0;

const FrameBackground = React.createClass({
  render (){
    return (
      <svg  id="svg-image-blur2" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
        style={{
          position: 'absolute'
        }}>

        <image x="0%" y="0%" width="100%" height="100%" id="img2"
          filter="url(#blur-effect-1)"
          xlinkHref={this.props.imageSrc}
          preserveAspectRatio="none" >
        </image>
      </svg>
    )
  }
});

const Frame = React.createClass({

  getInitialState() {

    return {
      motion: false,
      motionImage: '',
      staticImage: '',
    }

  },

  updateMotionImage() {

    const motionImage = this.props.requestImage();

    this.setState({
      motion: true,
      motionImage: motionImage
    });

    if (this.props.updateCurrentImage){
      this.props.updateCurrentImage(motionImage);
    }
  },

  onMotionRest() {

    this.setState({
      motion: false,
      staticImage: this.state.motionImage
    })

    var rand = Math.round(Math.random() * 7000) + 3000;
    setTimeout(() => {

      this.updateMotionImage();

    }, rand);

    count++;

  },

  componentDidMount(){
    const self = this;

    this.updateMotionImage();
  },

  getInitialStyle() {
    return {
      opacity: 0
    }
  },

  getFinalStyle() {
    return {
      opacity: spring(1, {stiffness: 50, damping: 50})
    }
  },

  getFrontImage(imageSrc){
    return (
      <img
       src={imageSrc}
       className="playerImage"
      />
    )
  },

  getMotion(){
    let result;

    if (this.state.motion) {
      const defaultStyle = this.getInitialStyle()
      const style = this.getFinalStyle();

      result = (
        <Motion defaultStyle={defaultStyle} style={style} onRest={this.onMotionRest} key="cuadrado">
            {({opacity}) =>
              <div
                className="playerMotion"
                style={{
                  opacity
                }}
              >

                <FrameBackground
                  imageSrc={this.state.motionImage.images.thumbnail.url}
                />

                {this.getFrontImage(this.state.motionImage.images.standard_resolution.url)}

                <span style={{
                  color: 'white',
                  position: 'absolute',
                  top: 0,
                  left: 0
                }}>
                </span>
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
        className="playerFrame"
        style={{
          top: this.props.frameMeasures.top + "%",
          left: this.props.frameMeasures.left + "%",
          width: this.props.frameMeasures.width + "%",
          height: this.props.frameMeasures.height + "%"
        }}>

        { this.getMotion() }

        {
          this.state.staticImage ?
          <FrameBackground
            imageSrc={this.state.staticImage.images.thumbnail.url}
          />
          : null
        }

        {this.state.staticImage ? this.getFrontImage(this.state.staticImage.images.standard_resolution.url) : null}

      </div>
    )
  }
});

export default Frame;
