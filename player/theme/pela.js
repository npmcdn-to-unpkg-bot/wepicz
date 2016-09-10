import React from 'react';
import { render } from 'react-dom';

import Frame from '../frame';
import BottomBar from '../bottomBar';

const themeConfig = {
  frames: [{
    top: '0',
    left: '0',
    width: '75vh',
    height: '100vh',
  }, {
    top: '0',
    left: '75vh',
    width: 'calc(100vw - 75vh)',
    height: 'calc((100vw - 75vh) * 3 / 4)',
  }, {
    top: 'calc((100vw - 75vh) * 3 / 4)',
    left: '75vh',
    width: 'calc((100vw - 75vh)/2)',
    height: 'calc(100vh - ((100vw - 75vh) * 3 / 4))',
  }, {
    top: 'calc((100vw - 75vh) * 3 / 4)',
    left: 'calc(75vh + ((100vw - 75vh)/2))',
    width: 'calc((100vw - 75vh)/2)',
    height: 'calc(100vh - ((100vw - 75vh) * 3 / 4))',
  }]
}

const ThemeFull = React.createClass({

  render() {
    return (
      <div style={{ backgroundColor: 'white' }}>
        {
          themeConfig.frames.map((frameMeasures, index) => {
            return (
              <Frame
                key={index}
                frameMeasures={frameMeasures}
                requestImage={this.props.requestImage}/>
            );
          })
        }
      </div>
    )
  }
});

export default ThemeFull;
