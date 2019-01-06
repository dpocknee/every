import React from 'react';
import PT from 'prop-types';

const Slider = props => {
  const { updateTheSliderValue, sliderValue } = props;
  return (
    <>
      <div>
        <input
          key="slidey"
          onChange={updateTheSliderValue}
          type="range"
          id="playback"
          name="bobby"
          min="0"
          max="318"
          defaultValue="0"
          className="slider"
        />
      </div>
      <div className="slidertext">
        <p>{`Chord #${parseInt(sliderValue, 10) + 1}`}</p>
      </div>
    </>
  );
};

Slider.propTypes = {
  updateTheSliderValue: PT.func.isRequired,
};

export default Slider;
