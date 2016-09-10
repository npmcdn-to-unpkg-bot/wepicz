import React from 'react'
import { render } from 'react-dom'
import axios from 'axios'

import PelaTheme from './theme/pela';
import FullTheme from './theme/full';
import GridTheme from './theme/grid';

import _ from 'lodash';

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

        const {height, width} = image.images.standard_resolution;

        image.usageCount = 0;
        image.verticalness = (100 * height / width) - 100;

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
      imgs: [],
      loading: true
    }
  },

  componentDidMount() {
    this.updatePlayerSize();
    window.addEventListener('resize', this.updatePlayerSize);

    this.getData()
    .then((data) => {

      setInterval(() => {
        this.setState({
          loading: false
        });
      }, 3000);

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

  requestImage(verticalness) {

    const sorted = _.sortBy(this.state.imgs, (img) => {
      return 50 * img.usageCount + Math.abs(img.verticalness - verticalness)
    });

    const image = sorted[0];

    image.usageCount++;

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
    } else if (getParameterByName('theme') == 2){
      theme = (
        <PelaTheme
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
            <filter id="svgBlur">
                <feGaussianBlur stdDeviation="8"/>
            </filter>
        </svg>

        {
          !this.state.loading && this.state.imgs &&  this.state.imgs.length ?
          this.getTheme() : <div style={{color: 'white'}} >Loading...</div>
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
      <Motion defaultStyle={defaultStyle} style={style} onRest={()=>{console.log('rest');}} key="cuadrado">
      {
        ({opacity}) =>

      	<div
      		style={{
            position: 'absolute',
      			width: 100 + '%',
      			height: 100 + '%',
            opacity: opacity
      		}}
        >

          <svg
            id="svg-image-blur2"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            position >

            <filter id="blur-effect-1">
              <feGaussianBlur stdDeviation="10" />
            </filter>

            <image x="0%" y="0%" width="100%" height="100%" id="img2"
            filter="url(#blur-effect-1)"

              xlinkHref="http://miriadna.com/desctopwalls/images/max/Isla-de-Janitzio-(Mexico).jpg" >
            </image>
          </svg>

        </div>


      }
      </Motion>
    );
  },
});

render(<Player/>, document.getElementById('player'))
