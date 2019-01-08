import React, { Component } from 'react';
import IntroText from './IntroText';
import '../css/MainTitle.css';
import settings from '../css/BlockSettings';

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
          <button style={{ ...settings.mainTitle }} type="button" onClick={() => this.introClick()}>
            <h1>A Composition Tool for David Pocknee's Guitar Piece "Every"</h1>
          </button>
        </div>
      </>
    );
  }
}

export default MainTitle;
