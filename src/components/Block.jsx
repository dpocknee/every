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

// Move to utils !!
function octavemaker(arrayin, octaveheight, graphwidth, topoffset) {
  const octoutput = [];
  const bardivision = octaveheight / 5;
  const barwidth = graphwidth / 5 - 2;
  for (let x = 0; x < arrayin.length; x++) {
    const barheight = arrayin[x] * bardivision + 1;
    const topval = octaveheight - barheight + topoffset;
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
    harmonics,
    octaves,
    swidth,
    difficulty,
    notes,
    chordHighlighting,
  } = props;

  const speeddiff1 = [42, 242, 42];
  const speeddiff2 = [228, 0, 0];

  // const eachImage = `./assets/chords/${name}.png`;
  const speedColour = utils.colourInterpolator(speeddiff1, speeddiff2, timingRating);
  const harmonicspread = `${Math.round(harmonics * 100)}%`;
  const octaveheight = 50;
  const topoffset = 56; // amount octave graph is offset from the top of the main div
  const octavearray = octavemaker(octaves, octaveheight, swidth, topoffset);

  const difficultycolordiffs = utils.colourInterpolator(
    speeddiff1,
    speeddiff2,
    (difficulty - 1) / 8,
  );
  const usenotecolor = utils.colourInterpolator([220, 220, 220], [34, 34, 34], notes / 5);

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

        <div className="notes" title="Number of Notes" style={{ backgroundColor: usenotecolor }}>
          {notes}
        </div>

        <div className="harmonics" title="% of harmonics">
          <div className="stats" style={{ width: harmonicspread }}>
            {harmonicspread}
          </div>
        </div>

        <div title="Spread of notes over octaves" className="octave">
          {octavearray}
        </div>
        <img src={require(`../assets/chords/${name}.png`)} alt="notation" />
      </div>
    </div>,
  );
};

Block.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  harmonics: PropTypes.number.isRequired,
  octaves: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  swidth: PropTypes.number.isRequired,
  difficulty: PropTypes.number.isRequired,
  notes: PropTypes.number.isRequired,
  timingRating: PropTypes.number,
  selectedChord: PropTypes.string,
};

Block.defaultProps = {
  timingRating: undefined,
  selectedChord: undefined,
};

export default DragSource(ItemTypes.BLOCK, blockSource, collect)(Block);
