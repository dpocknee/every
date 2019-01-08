import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
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
          <div className="github">
            <a href="http://www.github.com/dpocknee/every">
              <FontAwesomeIcon
                icon={faGithub}
                className="playbackIcons"
                style={{ ...settings.playbackIcons }}
                alt="github"
              />
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default MainTitle;
