import React from 'react'


const FullScreenSwitch = React.createClass({

  isFullscreen() {
    const result = document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement;

    return result;
  },

  enterFullScreen() {
    var i = document.getElementById("player");

    // go full-screen
    if (i.requestFullscreen) {
      i.requestFullscreen();
    } else if (i.webkitRequestFullscreen) {
      i.webkitRequestFullscreen();
    } else if (i.mozRequestFullScreen) {
      i.mozRequestFullScreen();
    } else if (i.msRequestFullscreen) {
      i.msRequestFullscreen();
    }
  },

  exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  },

  componentDidMount() {
    //this.updateMotionImage();
  },

  onClickHandler() {
    if (this.isFullscreen()) {
      this.exitFullscreen();
    } else {
      this.enterFullScreen();
    }
  },

  render() {

    return (
      <i
        id="fullScreenSwitch"
        className="fa fa-arrows-alt fa-3x"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: '1000',
          textShadow: '1px 1px #AAAAAA',
          opacity: !this.isFullscreen() || this.state.hover ? 1 : 0
        }}
        onClick={this.onClickHandler}
        onMouseEnter={() => {
          this.setState({
            hover: true
          })
        }}
        onMouseLeave={() => {
          this.setState({
            hover: false
          })
        }}
      />
    )
  }
});

export default FullScreenSwitch;
