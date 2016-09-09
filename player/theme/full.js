import React from 'react';
import { render } from 'react-dom';

import Frame from '../frame';
import BottomBar from '../bottomBar';

const themeConfig = {
  frames: [{
    top: '0%',
    left: '0%',
    width: '100%',
    height: '100%',
  }]
}

const ThemeFull = React.createClass({

  getInitialState() {
    return {
      currentImage: null
    }
  },

  updateCurrentImage(image) {
    this.setState({
      currentImage: image
    });
  },

  render() {
    return (
      <div>
        <Frame
          frameMeasures={themeConfig.frames[0]}
          requestImage={this.props.requestImage}
          updateCurrentImage={this.updateCurrentImage}/>

        <BottomBar image={this.state.currentImage}  playerSize={this.props.playerSize} />
      </div>
    )
  }
});

export default ThemeFull;
