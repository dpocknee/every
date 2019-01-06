import React from 'react';
import PropTypes from 'prop-types';
import Lilypond from './Lilypond';
import Slider from './Slider';

const PlaybackBox = props => {
  const {
    mainArray, updateTheSliderValue, sliderValue, updateTheArray,
  } = props;
  const currentOrderArray = mainArray.map(element => element[1]);
  const currentOrderString = `[${currentOrderArray.join(', ')}]`;

  return (
    <div className="playbackbox">
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Slider updateTheSliderValue={updateTheSliderValue} sliderValue={sliderValue} />
      </div>
      <Lilypond currentArray={currentOrderString} arrayUpdater={updateTheArray} />
    </div>
  );
};

PlaybackBox.propTypes = {
  mainArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateTheSliderValue: PropTypes.func.isRequired,
  sliderValue: PropTypes.number.isRequired,
  updateTheArray: PropTypes.func.isRequired,
};

export default PlaybackBox;
