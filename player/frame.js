import React from 'react'
import { render } from 'react-dom'

import {Motion, spring} from 'react-motion'

let count = 0;

//let lastOpacity = 0

const FrameBackground = React.createClass({
  // shouldComponentUpdate(nextProps){
  //   let result = 0
  //
  //   const roundOpacity = Math.round(nextProps.opacity);
  //
  //   if (roundOpacity > lastOpacity){
  //     lastOpacity = roundOpacity;
  //     result = true;
  //   }
  //
  //   return result;
  // },

  render (){
    return (
      <div
        className="playerBackground"
        style={{
          backgroundImage: 'url(' + this.props.imageSrc + ')',
          filter: 'url("#svgBlur")',
          WebkitFilter: 'blur(8px)',
          opacity: this.props.opacity
        }}>
      </div>
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

  getFrontImage(imageSrc, opacity = 1){
    return (
      <img
       src={imageSrc}
       className="playerImage"
       style={{
         opacity
       }}
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
              >
                {false && this.getBackgroundImage(this.state.motionImage.images.thumbnail.url)}

                <FrameBackground
                  imageSrc={this.state.motionImage.images.standard_resolution.url}
                  opacity={opacity}
                  />

                {this.getFrontImage(this.state.motionImage.images.standard_resolution.url, opacity)}

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
            imageSrc={this.state.staticImage.images.standard_resolution.url}
          />
          : null
      }

        {this.state.staticImage ? this.getFrontImage(this.state.staticImage.images.standard_resolution.url) : null}

      </div>
    )
  }
});

export default Frame;
