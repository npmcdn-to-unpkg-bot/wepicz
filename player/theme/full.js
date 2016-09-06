import React from 'react';
import { render } from 'react-dom';

import Frame from '../frame';
import BottomBar from '../bottomBar';

const themeConfig = {
  frames: [{
    top: 0,
    left: 0,
    width: 100,
    height: 100,
  }]
}

const ThemeFull = React.createClass({

  componentDidMount(){
    //console.log(this.refs.container.getBoundingClientRect());
  },

  render() {
    return (
      <div>
        <Frame
          frameMeasures={themeConfig.frames[0]}
          requestImage={this.props.requestImage}/>
        <BottomBar playerSize={this.props.size} />
      </div>
    )
  }
});

export default ThemeFull;
