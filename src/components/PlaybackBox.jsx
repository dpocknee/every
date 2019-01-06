import React from 'react';
import PropTypes from 'prop-types';
import Lilypond from './Lilypond';
import Slider from './Slider';
import '../css/PlaybackBox.css';

const PlaybackBox = props => {
  const {
    mainArray, updateTheSliderValue, sliderValue, arrayUpdater, chords,
  } = props;

  const mainArrayOrder = mainArray.map(element => element[1][0]);
  return (
    <div className="playbackbox">
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Slider updateTheSliderValue={updateTheSliderValue} sliderValue={sliderValue} />
      </div>
      <Lilypond mainArrayOrder={mainArrayOrder} arrayUpdater={arrayUpdater} chords={chords} />
    </div>
  );
};

PlaybackBox.propTypes = {
  mainArray: PropTypes.arrayOf(PropTypes.array).isRequired,
  updateTheSliderValue: PropTypes.func.isRequired,
  sliderValue: PropTypes.number.isRequired,
  arrayUpdater: PropTypes.func.isRequired,
  chords: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PlaybackBox;
