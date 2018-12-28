import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import ItemTypes from './Constants';
import '../css/block.css';

import * as utils from '../utils/utils';

const blockSource = {
  beginDrag(props) {
    return { id: props.id };
  },
};

// MOVE TO UTILS!

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
    timingrating,
    harmonics,
    octaves,
    swidth,
    difficulty,
    notes,
    selectedchord,
  } = props;

  const speeddiff1 = [42, 242, 42];
  const speeddiff2 = [228, 0, 0];

  const eachImage = `chords/${name}.png`;
  const speedcolor = utils.colourInterpolator(speeddiff1, speeddiff2, timingrating);
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
        boxShadow: selectedchord,
      }}
    >
      <div>
        <div className="name" style={{ backgroundColor: speedcolor }}>
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
        <img src={eachImage} alt="notation" />
      </div>
    </div>,
  );
};

Block.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  timingrating: PropTypes.string.isRequired,
  harmonics: PropTypes.string.isRequired,
  octaves: PropTypes.string.isRequired,
  swidth: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired,
  selectedchord: PropTypes.string.isRequired,
};

export default DragSource(ItemTypes.BLOCK, blockSource, collect)(Block);
