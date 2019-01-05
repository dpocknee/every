import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lilypond from './Lilypond';
import Slider from './Slider';

export default class PlaybackBox extends Component {
  state = {
    slider: 0,
  };

  render() {
    const { slider } = this.state;
    const { mainArray } = this.props;
    const currentOrderArray = mainArray.map(element => element[1]);
    const currentOrderString = `[${currentOrderArray.join(', ')}]`;

    return (
      <div className="playbackbox">
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Slider sliderUpdate={this.updateTheSliderValue} />
          <div className="slidertext">
            <p>{`Chord #${parseInt(slider, 10) + 1}`}</p>
          </div>
        </div>
        <Lilypond currentArray={currentOrderString} arrayUpdater={this.updateTheArray} />
      </div>
    );
  }
}

PlaybackBox.propTypes = {
  mainArray: PropTypes.arrayOf(PropTypes.object).isRequired,
};
