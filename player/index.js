import React from 'react'
import { render } from 'react-dom'
import axios from 'axios'

import layouts from '../config/layout';

import Frame from './frame';

let layoutIndex = 0;
let imageIndex = 0;

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

  getInitialState() {
    return {
      layouts: [layouts.full, layouts.two],
      imgs: []
    }
  },

  initSlider() {
    console.log('initSlider');

    setInterval(() => {
      console.log('setInterval');

      layoutIndex++;

      this.setState({
        layout: this.state.layouts[layoutIndex % this.state.layouts.length]
      })
    }, 3000)
  },

  componentDidMount() {

    this.getData()
    .then((data) => {
      this.setState({
        layout: this.state.layouts[0],
        imgs: data
      });

      console.log(this.state);;

      this.initSlider();
    })

  },

  getImages() {

    let result;

    if (this.state.layout){
      result = this.state.layout.frames.map((frameMeasures, index) => {

        const image = this.state.imgs[imageIndex % this.state.imgs.length];

        imageIndex++;

        return (
          <Frame key={index} frameMeasures={frameMeasures} image={image}/>
        );
      })
    }

    return result;
  },

  render() {
    return (
      <div style={{
        height: '100%'
      }}>
        <img
          src={'/assets/img/logo@2x.png'}
          style={{
            zIndex: 5000,
            position: 'absolute',
            top: '10px',
            left: '10px'
          }}
        />

        { this.getImages() }
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          width: '100%',
          height: '10%',
          backgroundColor: 'black',
          opacity: 0.3
        }}>

        </div>
      </div>
    )
  }
})

render(<Player/>, document.getElementById('player'))
