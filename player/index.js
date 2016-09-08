import React from 'react'
import { render } from 'react-dom'
import axios from 'axios'

import FullTheme from './theme/full';
import GridTheme from './theme/grid';

import {Motion, spring} from 'react-motion'

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
            // const imgs = response.data.map((post) => {
            //   return post.images.standard_resolution.url
            // })

            resolve(response.data);

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

  preloadImage (image) {

    const promise = new Promise(function(resolve, reject) {

      var img = new Image();

      img.src= image.images.standard_resolution.url;

      function loaded() {
        resolve(image);
      }

      function failed() {
        reject(image);
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
        <svg xmlns="http://www.w3.org/2000/svg" height="0">
            <filter height="116%" width="116%" y="-8%" x="-8%" id="svgBlur">
                <feGaussianBlur stdDeviation="8" in="SourceGraphic"/>
            </filter>
        </svg>

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
      big: false
    };
  },
  getInitialStyle() {
    return {
      height: 0,
      width: 0,
      angle: 0,
      opacity: 0
    }
  },
  getFinalStyle() {
    return {
      height: spring(100, {stiffness: 10, damping: 14}),
      width: spring(100, {stiffness: 10, damping: 14}),
      angle: spring(180, {stiffness: 10, damping: 14}),
      opacity: spring(1, {stiffness: 10, damping: 14})
    }
  },
  onClickHandler() {
    this.setState({
      big: !this.state.big
    })
  },

  render() {

    const defaultStyle = this.getInitialStyle()
    const style = this.getFinalStyle();

    return (

      <div>



        <Motion defaultStyle={defaultStyle} style={style} onRest={()=>{console.log('rest');}} key="cuadrado">
  					{({width, height, angle, opacity}) =>
            <div>
  						<div
  							style={{
                  marginRight: 'auto',
                  marginLeft: 'auto',
                  position: 'absolute',
                  //top: '50%',
  								width: 100 + '%',
  								height: 100 + '%',
                  //backgroundColor: 'red',
                  //transform: 'translateY(-50%) rotate(' + angle + 'deg)',
                  //transform: 'translateY(-50%) rotateY(' + angle + 'deg)',
                  opacity: opacity
  							}}
              >
                <div id="page-container" style={{
                  filter: 'url("#svgBlur")'
                }}>
                  {opacity}
                </div>
              </div>

              </div>


  					}
    		</Motion>
        </div>
    );
  },
});

render(<Player/>, document.getElementById('player'))
