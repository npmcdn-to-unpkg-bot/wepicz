import React from 'react'
import { render } from 'react-dom'

import {Motion, spring} from 'react-motion'


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

    console.log('onMotionRest');

    this.setState({
      motion: false,
      staticImage: this.state.motionImage
    })

    var rand = Math.round(Math.random() * 17000) + 3000;
    setTimeout(() => {

      this.updateMotionImage();

    }, 1000);
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
      opacity: spring(1, {stiffness: 20})
    }
  },

  getBackgroundImage(imageSrc) {
    return (
      <div
        className="playerBackground"
        style={{
          backgroundImage: 'url(' + imageSrc + ')'
        }}>
      </div>
    )
  },

  getFrontImage(imageSrc){
    return (
      <img
       src={this.state.motionImage.images.standard_resolution.url}
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
                  opacity: opacity,
                }}
              >
                {this.getBackgroundImage(this.state.motionImage.images.standard_resolution.url)}

                {this.getFrontImage(this.state.motionImage.images.standard_resolution.url)}

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

        {this.state.staticImage ? this.getBackgroundImage(this.state.staticImage.images.standard_resolution.url) : null}

        {this.state.staticImage ? this.getFrontImage(this.state.staticImage.images.standard_resolution.url) : null}

      </div>
    )
  }
});

export default Frame;
