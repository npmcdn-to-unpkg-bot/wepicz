import React from 'react';
import { render } from 'react-dom';

import Frame from '../frame';
import BottomBar from '../bottomBar';

const themeConfig = {
  frames: [{
    top: '0',
    left: '0',
    width: '66vh',
    height: '100vh',
  }, {
    top: '0',
    left: '66vh',
    width: 'calc(100vw - 66vh)',
    height: 'calc((100vw - 66vh) * 4 / 6)',
  }, {
    top: 'calc((100vw - 66vh) * 4 / 6)',
    left: '66vh',
    width: 'calc((100vw - 66vh)/2)',
    height: 'calc(100vh - ((100vw - 66vh) * 4 / 6))',
  }, {
    top: 'calc((100vw - 66vh) * 4 / 6)',
    left: 'calc(66vh + ((100vw - 66vh)/2))',
    width: 'calc((100vw - 66vh)/2)',
    height: 'calc(100vh - ((100vw - 66vh) * 4 / 6))',
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
