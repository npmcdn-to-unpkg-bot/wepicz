import React from 'react'
import { render } from 'react-dom'

const BotoomBar = React.createClass({

  getInitialState(){
    return {
      image: null
    }
  },

  render() {
    const {playerSize, image} = this.props;

    if (!image) {
      return null;
    }

    const caption = image.caption.text;

    const {full_name, profile_picture} = image.user;

    const barHeight = playerSize.height * 0.1;

    return (
      <div className="bottomBar">
        <img
          src={'/assets/img/logo@2x.png'}
          className="bottomServiceLogo"
        />
        <span className="bottomBarHashtag" >#WePicz</span>
        <div className="bottomBarBackground"/>

        <div className="bottomBarImageCaption">
          "{caption}"
        </div>

        <div
          className="bottomBarUserName">
          {full_name}
        </div>

        <img
          className="bottomBarSocialNetworkIcon"
          src="http://instagramstatic-a.akamaihd.net/h1/images/ico/favicon-192.png/b407fa101800.png" />

        <img
          className="bottomBarUserImage"
          src={profile_picture} />
      </div>
    )
  }
});

export default BotoomBar;
