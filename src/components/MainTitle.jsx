import React, { Component } from 'react';
import IntroText from './IntroText';
import '../css/every.css';

/* eslint react/no-unescaped-entities: 0 */

class MainTitle extends Component {
  state = {
    aboutOn: true,
  };

  introClick = () => this.setState(state => {
    const newAboutOn = !state.aboutOn;
    return { aboutOn: newAboutOn };
  });

  render() {
    const { aboutOn } = this.state;
    return (
      <>
        <IntroText aboutOn={aboutOn} introClick={this.introClick} />
        <div className="maintitle">
          <h1>
            <a href="http://www.davidpocknee.com/">David Pocknee's</a>
            {' '}
            <i>Every</i>
            {' '}
Composition Tool
          </h1>
          <button className="introButton" type="button" onClick={() => this.introClick()}>
            about
          </button>
        </div>
      </>
    );
  }
}

export default MainTitle;
