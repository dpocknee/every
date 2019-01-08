import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import ItemTypes from './Constants';
import '../css/block.css';

import * as utils from '../utils/utils';

/* eslint import/no-dynamic-require: 0 global-require: 0 */

const blockSource = {
  beginDrag(props) {
    return { id: props.id };
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

function octavemaker(arrayin, octaveHeightIn, graphwidth, topOffsetIn, settings) {
  const octoutput = [];
  const bardivision = octaveHeightIn / 5;
  const barwidth = graphwidth / 5 - 2;
  for (let x = 0; x < arrayin.length; x++) {
    const barheight = arrayin[x] * bardivision + 1;
    const topval = octaveHeightIn - barheight + topOffsetIn;
    const leftval = x * (barwidth + 2) + 1;

    octoutput.push(
      <div
        key={x}
        className="stats"
        style={{
          height: `${barheight}px`,
          top: `${topval}px`,
          left: `${leftval}px`,
          width: `${barwidth}px`,
          margin: '0px 1px 0px 1px',
          ...settings.octaves,
        }}
      />,
    );
  }
  return octoutput;
}

const Block = props => {
  const {
    connectDragSource,
    isDragging,
    name,
    timingRating,
    squareWidth,
    chordHighlighting,
    chordImage,
    settings,
  } = props;

  const {
    difficulty, notes, harmonic_ratio, octavehistogram,
  } = props.chordInfo;

  const {
    easiestDifficultyColor,
    hardestDifficultyColor,
    noOfNotesMaxColor,
    noOfNotesMinColor,
    octaveHeight,
    topOffset,
  } = settings;

  const speedColour = utils.colourInterpolator(
    easiestDifficultyColor,
    hardestDifficultyColor,
    timingRating,
  );
  const harmonicSpread = `${Math.round(harmonic_ratio * 100)}%`;
  const octavearray = octavemaker(octavehistogram, octaveHeight, squareWidth, topOffset, settings);

  const difficultycolordiffs = utils.colourInterpolator(
    easiestDifficultyColor,
    hardestDifficultyColor,
    (difficulty - 1) / 8,
  );
  const noNotesColor = utils.colourInterpolator(noOfNotesMinColor, noOfNotesMaxColor, notes / 5);

  return connectDragSource(
    <div
      className="block"
      style={{
        opacity: isDragging ? 0.5 : 1,
        textAlign: 'center',
        cursor: 'move',
        boxShadow: chordHighlighting,
      }}
    >
      <div>
        <div className="name" style={{ backgroundColor: speedColour }}>
          {name}
        </div>
        <div
          className="difficulty"
          style={{
            backgroundColor: difficultycolordiffs,
          }}
          title="Difficulty"
        >
          {difficulty}
        </div>

        <div className="notes" title="Number of Notes" style={{ backgroundColor: noNotesColor }}>
          {notes}
        </div>

        <div className="harmonics" title="% of harmonics">
          <div className="stats" style={{ width: harmonicSpread, ...settings.harmonics }}>
            {harmonicSpread}
          </div>
        </div>

        <div title="Spread of notes over octaves" className="octave">
          {octavearray}
        </div>
        <img src={chordImage} alt="notation" />
      </div>
    </div>,
  );
};

Block.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  chordInfo: PropTypes.shape({
    difficulty: PropTypes.number.isRequired,
    notes: PropTypes.number.isRequired,
    harmonic_ratio: PropTypes.number.isRequired,
    octavehistogram: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  timingRating: PropTypes.number,
  selectedChord: PropTypes.string,
};

Block.defaultProps = {
  timingRating: undefined,
  selectedChord: undefined,
};

export default DragSource(ItemTypes.BLOCK, blockSource, collect)(Block);
