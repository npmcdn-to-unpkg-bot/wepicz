import React from 'react'
import { render } from 'react-dom'

import {Motion, spring} from 'react-motion'


const Frame = React.createClass({

  getInitialState() {

    return {
      motion: 0,
      staticImage: null,
      motionImage: null
    }

  },

  componentDidMount() {
    this.updateMotionImage();
  },

  updateMotionImage() {
    const { width, height } = this.refs.container.getBoundingClientRect()

    const verticalness = (100 * height / width) - 100;

    const motion = (this.state.motion + 1) % 2;
    const staticImage = this.state.motion === 1 ? this.state.staticImage : this.props.requestImage(verticalness);
    const motionImage = this.state.motion === 0 ? this.state.motionImage : this.props.requestImage(verticalness);

    this.setState({
      motion: motion,
      staticImage: staticImage,
      motionImage: motionImage,
      verticalness: verticalness,
      width: width,
      height: height
    });

    if(this.props.updateCurrentImage) {
      this.props.updateCurrentImage(motion === 1 ? staticImage : motionImage)
    }

  },

  onMotionRest() {

    var rand = Math.round(Math.random() * 7000) + 3000;
    setTimeout(() => {

      this.updateMotionImage();

    }, rand);

  },

  renderImage(id, image, opacity) {

    const imageWidth = image.images.standard_resolution.width;
    const imageHeight = image.images.standard_resolution.height;

    const proportionDifference = Math.abs(this.state.verticalness - image.verticalness);

    const showBackground = proportionDifference > 15;

    let positionX = 0;
    let positionY = 0;
    let width = 100;
    let height = 100;

    if (!showBackground){

      if (this.state.verticalness > image.verticalness){

        const imageHeightAdjusted = this.state.width * imageHeight / imageWidth;
        const imageHeightAdjustedPercent = this.state.height * 100 / imageHeightAdjusted - 100;

        positionX = (-imageHeightAdjustedPercent/2);
        positionY = 0;

        width = 100 + imageHeightAdjustedPercent;
        height = 100;

      } else {

        const imageWidthAdjusted = this.state.height * imageWidth / imageHeight;
        const imageWidthAdjustedPercent = this.state.width * 100 / imageWidthAdjusted - 100;

        positionX = 0;
        positionY = 0;

        width = 100;
        height = 100 + imageWidthAdjustedPercent;
      }
    }

    positionX = (positionX) + '%';
    positionY = (positionY) + '%';
    width = (width) + '%';
    height = (height) + '%';

    return (

      <svg  id={id} xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
        style={{
          position: 'absolute',
          opacity
        }}
      >

        {
          showBackground ?
          <image x="-8%" y="-8%" width="116%" height="116%" id="img-back"
            filter="url(#svgBlur)"
            xlinkHref={image.images.standard_resolution.url}
            preserveAspectRatio="none" >
          </image> :
          null
        }

        <image x={positionX} y={positionY} width={width} height={height} id="img-front"
          xlinkHref={image.images.standard_resolution.url}>
        </image>

      </svg>

    )
  },

  render() {

    return (
      <div
        ref="container"
        className="playerFrame"
        style={{
          top: this.props.frameMeasures.top,
          left: this.props.frameMeasures.left,
          width: this.props.frameMeasures.width,
          height: this.props.frameMeasures.height
        }}>

        <Motion
            key="fadeFrame"
            defaultStyle={{ opacity: 0 }}
            //, {stiffness: 50, damping: 50}
            style={{ opacity: spring(this.state.motion === 1 ? 1 : 0) }}
            onRest={this.onMotionRest} >
            {({opacity}) =>
              <div
                className="playerMotion"
              >
                {
                  this.state.staticImage && opacity > 0.02
                  ? this.renderImage("svg-image-blur-0", this.state.staticImage, opacity)
                  : null
                }

                {
                  this.state.motionImage && 1 - opacity > 0.02
                  ? this.renderImage("svg-image-blur-1", this.state.motionImage, 1 - opacity)
                  : null
                }

              </div>
            }
        </Motion>
      </div>
    )
  }
});

export default Frame;
