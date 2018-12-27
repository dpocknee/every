import React from 'react';
import PT from 'prop-types';

const Slider = props => {
  const { sliderUpdate } = props;
  return (
    <div>
      <input
        key="slidey"
        onChange={sliderUpdate}
        type="range"
        id="playback"
        name="bobby"
        min="0"
        max="318"
        defaultValue="0"
        className="slider"
      />
    </div>
  );
};

Slider.propTypes = {
  sliderUpdate: PT.func.isRequired,
};

export default Slider;
