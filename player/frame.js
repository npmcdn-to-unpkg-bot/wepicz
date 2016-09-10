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
      verticalness: verticalness
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
                  this.state.staticImage && opacity > 0.02 ?
                  <svg  id="svg-image-blur-0" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                    style={{
                      position: 'absolute',
                      opacity
                    }}>

                    <image x="-8%" y="-8%" width="116%" height="116%" id="img-0-2"
                      filter="url(#svgBlur)"
                      xlinkHref={this.state.staticImage.images.standard_resolution.url}
                      preserveAspectRatio="none" >
                    </image>

                    <image x="0%" y="0%" width="100%" height="100%" id="img-0-1"
                      xlinkHref={this.state.staticImage.images.standard_resolution.url}>
                    </image>

                  </svg> : null
                }

                {
                  this.state.motionImage && 1 - opacity > 0.02 ?
                  <svg  id="svg-image-blur2" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                    style={{
                      position: 'absolute',
                      opacity: 1 - opacity
                    }}>

                    <image x="-8%" y="-8%" width="116%" height="116%" id="img-1-2"
                      filter="url(#svgBlur)"
                      xlinkHref={this.state.motionImage.images.standard_resolution.url}
                      preserveAspectRatio="none" >
                    </image>

                    <image x="0%" y="0%" width="100%" height="100%" id="img-1-1"
                      xlinkHref={this.state.motionImage.images.standard_resolution.url}>
                    </image>

                  </svg> : null
                }

              </div>
            }
        </Motion>
      </div>
    )
  }
});

export default Frame;
