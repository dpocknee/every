import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lilypond from './Lilypond';
import Slider from './Slider';

export default class PlaybackBox extends Component {
  state = {
    slider: 0,
  };

  render() {
    const { mainArray, updateTheSliderValue, sliderValue } = this.props;
    const currentOrderArray = mainArray.map(element => element[1]);
    const currentOrderString = `[${currentOrderArray.join(', ')}]`;

    return (
      <div className="playbackbox">
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Slider updateTheSliderValue={updateTheSliderValue} sliderValue={sliderValue} />
        </div>
        <Lilypond currentArray={currentOrderString} arrayUpdater={this.updateTheArray} />
      </div>
    );
  }
}

PlaybackBox.propTypes = {
  mainArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateTheSliderValue: PropTypes.func.isRequired,
  sliderValue: PropTypes.string.isRequired,
};
