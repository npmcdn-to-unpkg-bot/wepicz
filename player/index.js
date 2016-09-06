import React from 'react'
import { render } from 'react-dom'
import axios from 'axios'

import FullTheme from './theme/full';
import GridTheme from './theme/grid';

import {TransitionMotion, spring} from 'react-motion'

let layoutIndex = 0;
let imageIndex = 0;

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const Player = React.createClass({

  getData() {

    var promise = new Promise(function(resolve, reject) {

      axios.get('/slider/slider-data')
        .then(function (response) {

          if (response && response.data && response.data.length) {
            const imgs = response.data.map((post) => {
              return post.images.standard_resolution.url
            })

            resolve(imgs);

          } else {
            console.log('No images');
            resolve([]);
          }

        })
        .catch(function (error) {
          console.log(error);
          reject(Error(error));
        });
    });

    return promise;
  },

  preloadImage (src) {

    const promise = new Promise(function(resolve, reject) {

      var img = new Image();

      img.src= src;

      function loaded() {
        console.log('loaded', img.src);
        resolve(src);
      }

      function failed() {
        console.log('failed', img.src);
        reject(src);
      }

      if (img.complete) {
        loaded();
      }
      else {
        img.addEventListener('load', loaded, false);
      }

      img.addEventListener('error', failed, false);

    });

    return promise;
  },

  getInitialState() {
    return {
      imgs: []
    }
  },

  componentDidMount() {
    this.updatePlayerSize();
    window.addEventListener('resize', this.updatePlayerSize);

    this.getData()
    .then((data) => {
      data.forEach((imgSrc) => {
        this.preloadImage(imgSrc)
        .then((okSrc) => {
          this.setState({
            imgs: [...this.state.imgs, okSrc]
          });
        })
      });

      setInterval(() => {
        layoutIndex++
        layoutIndex = layoutIndex % 2;
      }, 30000)
    })

  },

  updatePlayerSize() {

    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        width = w.innerWidth || e.clientWidth || g.clientWidth,
        height = w.innerHeight|| e.clientHeight|| g.clientHeight;

    this.setState({
      size: {
        width,
        height
      }
    });

  },

  requestImage() {
    const image = this.state.imgs[imageIndex % this.state.imgs.length];

    imageIndex++;

    return image;
  },

  getTheme() {
    let theme;

    console.log(getParameterByName('theme'));

    if (getParameterByName('theme') == 1){
      theme = (
        <GridTheme
          requestImage={this.requestImage}
          playerSize={this.state.size} />
      )
    } else {
      theme = (
        <FullTheme
          requestImage={this.requestImage}
          playerSize={this.state.size} />
      )
    }

    return theme;
  },

  render() {
    return (
      <div className="player">
        {
          this.state.imgs && this.state.imgs.length ?
          this.getTheme() : <div>Loading...</div>
        }
      </div>
    )
  }
})

const Demo = React.createClass({
  getInitialState() {
    return {
      items: [{key: 'a', size: 10}, {key: 'b', size: 20}, {key: 'c', size: 30}],
    };
  },
  componentDidMount() {
    this.setState({
      items: [{key: 'a', size: 10}, {key: 'b', size: 20}], // remove c.
    });
  },
  willLeave() {
    // triggered when c's gone. Keeping c until its width/height reach 0.
    return {width: spring(0), height: spring(0)};
  },
  render() {
    return (
      <TransitionMotion
        willLeave={this.willLeave}
        styles={this.state.items.map(item => ({
          key: item.key,
          style: {width: item.size, height: item.size},
        }))}>
        {interpolatedStyles =>
          // first render: a, b, c. Second: still a, b, c! Only last one's a, b.
          <div>
            {interpolatedStyles.map(config => {
              return <div key={config.key} style={{...config.style, border: '1px solid'}} />
            })}
          </div>
        }
      </TransitionMotion>
    );
  },
});

render(<Player/>, document.getElementById('player'))
