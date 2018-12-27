import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ItemTypes } from './Constants';
import { DragSource } from 'react-dnd';
import './css/block.css';

const blockSource = {
  beginDrag(props) {
    return { id: props.id };
  }
};

function colourInterpolator(startingColor, endingColor, value) {
  // Interpolates between two colours according to a value between 0 and 1.//Colors should be entered as an array of 3 RGB values.
  var red = (endingColor[0] - startingColor[0]) * value + startingColor[0];
  var green = (endingColor[1] - startingColor[1]) * value + startingColor[1];
  var blue = (endingColor[2] - startingColor[2]) * value + startingColor[2];
  return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

function octavemaker(arrayin, octaveheight, graphwidth, topoffset) {
  var octoutput = [];
  var bardivision = octaveheight / 5;
  var barwidth = graphwidth / 5 - 2;
  for (let x = 0; x < arrayin.length; x++) {
    var barheight = arrayin[x] * bardivision + 1;
    var topval = octaveheight - barheight + topoffset;
    var leftval = x * (barwidth + 2) + 1;

    octoutput.push(
      <div
        key={x}
        className="stats"
        style={{
          height: barheight + 'px',
          top: topval + 'px',
          left: leftval + 'px',
          width: barwidth + 'px',
          margin: '0px 1px 0px 1px'
        }}
      />
    );
  }
  return octoutput;
}

class Block extends Component {
  render() {
    const { connectDragSource, isDragging } = this.props;

    var speeddiff1 = [42, 242, 42];
    var speeddiff2 = [228, 0, 0];

    var eachImage = 'chords/' + this.props.name + '.png';
    var speedcolor = colourInterpolator(
      speeddiff1,
      speeddiff2,
      this.props.timingrating
    );
    var harmonicspread = Math.round(this.props.harmonics * 100) + '%';
    var octaveheight = 50;
    var topoffset = 56; // amount octave graph is offset from the top of the main div
    var octavearray = octavemaker(
      this.props.octaves,
      octaveheight,
      this.props.swidth,
      topoffset
    );

    var difficultycolordiffs = colourInterpolator(
      speeddiff1,
      speeddiff2,
      (this.props.difficulty - 1) / 8
    );
    var usenotecolor = colourInterpolator(
      [220, 220, 220],
      [34, 34, 34],
      this.props.notes / 5
    );

    return connectDragSource(
      <div
        className="block"
        style={{
          opacity: isDragging ? 0.5 : 1,
          textAlign: 'center',
          cursor: 'move',
          boxShadow: this.props.selectedchord
        }}
      >
        <div>
          <div className="name" style={{ backgroundColor: speedcolor }}>
            {this.props.name}
          </div>
          <div
            className="difficulty"
            style={{
              backgroundColor: difficultycolordiffs
            }}
            title="Difficulty"
          >
            {this.props.difficulty}
          </div>

          <div
            className="notes"
            title="Number of Notes"
            style={{ backgroundColor: usenotecolor }}
          >
            {this.props.notes}
          </div>

          <div className="harmonics" title="% of harmonics">
            <div className="stats" style={{ width: harmonicspread }}>
              {harmonicspread}
            </div>
          </div>

          <div title="Spread of notes over octaves" className="octave">
            {octavearray}
          </div>
          <img src={eachImage} alt={'notation'} />
        </div>
      </div>
    );
  }
}

Block.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.BLOCK, blockSource, collect)(Block);
