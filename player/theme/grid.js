import React from 'react';
import { render } from 'react-dom';

import Frame from '../frame';
import BottomBar from '../bottomBar';

const themeConfig = {
  frames: []
}

const ThemeFull = React.createClass({

  componentDidMount(){
    for (var i = 0; i < 4; i++) {

      for (var j = 0; j < 5; j++) {

        themeConfig.frames.push({
          top: i * 25 + '%',
          left: j * 20 + '%',
          width: 20 + '%',
          height: 25 + '%',
        })

      }

    }
  },

  render() {
    return (
      <div>
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
