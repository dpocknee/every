import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { isEqual } from 'lodash';
import PropTypes from 'prop-types';

import GridSquare from './GridSquare';
import Block from './Block';
import PlaybackBox from './PlaybackBox';
import AudioPlayback from '../audio/AudioPlayback';

import idealOrder from '../data/IdealOrder';
import chords from '../data/chords';
import timing from '../data/timing';

import '../css/every.css';

const squareWidth = 70;
const squareHeight = 320;

let blockFrom = null;

export function sourcerer(value, id) {
  blockFrom = [value, id];
}

// NOTE: The format for the window.mainArray variable is [chord name, chord index]

class Grid extends Component {
  state = {
    sliderValue: 0,
    mainArray: [],
    chordPlaying: 0,
  };

  componentDidMount() {
    const originalArray = chords.map((chord, index) => {
      const mappedOrder = idealOrder[index];
      return [chords[mappedOrder].name, [mappedOrder]];
    });
    this.setState({ mainArray: originalArray });
  }

  componentDidUpdate(prevProps, prevState) {
    const { blockPosition } = this.props;
    if (!isEqual(blockPosition, prevProps.blockPosition)) {
      this.whenBlockIsDropped();
    }
  }

  updateTheSliderValue = sliderElement => {
    this.setState({
      sliderValue: parseInt(sliderElement.target.value, 10),
    });
  };

  arrayUpdater = parsedArray => {
    console.log('parsedArray', parsedArray);
    const updatedArray = parsedArray.map(chord => [chords[chord], chord]);
    console.log('updatedArray', updatedArray);
    this.setState({ mainArray: updatedArray });
  };

  whenBlockIsDropped = () => {
    const { blockPosition } = this.props;
    const { mainArray } = this.state;
    const blockId = blockFrom[1];

    const oldPosition = mainArray.findIndex(x => x[0] == blockId);
    const oldValue = mainArray[oldPosition][1];
    const newPosition = blockPosition[0];
    this.setState(state => {
      const newArray = state.mainArray.map(x => x);
      newArray.splice(oldPosition, 1);
      newArray.splice(newPosition, 0, [blockId, oldValue]);
      return { mainArray: newArray, starting: false };
    });
  };

  chordPlaying = chord => {
    this.setState({ chordPlaying: chord });
  };

  render() {
    const { sliderValue, mainArray, chordPlaying } = this.state;
    const squares = mainArray.map((chord, index) => {
      const [currentValue, currentIndex] = mainArray[index];
      let chordHighlighting = '0px 0px 0px 0px';
      if (index === sliderValue) chordHighlighting = '0px 0px 5px 5px #888888';
      if (index === chordPlaying) chordHighlighting = '0px 0px 5px 5px #c0c0c0';
      const squareKey = `squares${index}`;
      return (
        <div
          key={squareKey}
          className="squares"
          style={{ width: `${squareWidth}px`, height: `${squareHeight}px` }}
        >
          <GridSquare
            index={index}
            value={currentValue}
            squareWidth={squareWidth}
            squareHeight={squareHeight}
          >
            <Block
              id={currentValue}
              name={currentValue}
              timingRating={timing[index][2]}
              squareWidth={squareWidth}
              chordHighlighting={chordHighlighting}
              chordInfo={chords[currentIndex]}
            />
          </GridSquare>
        </div>
      );
    });

    return (
      <>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {squares}
        </div>
        <div style={{ width: '100%', height: '110px' }} />
        <PlaybackBox
          chords={chords}
          mainArray={mainArray}
          updateTheSliderValue={this.updateTheSliderValue}
          sliderValue={sliderValue}
          arrayUpdater={this.arrayUpdater}
        />
        <AudioPlayback
          mainArray={mainArray}
          chords={chords}
          timing={timing}
          selectedChord={sliderValue}
          chordPlaying={this.chordPlaying}
        />
      </>
    );
  }
}

Grid.propTypes = {
  blockPosition: PropTypes.arrayOf(PropTypes.number),
};

Grid.defaultProps = {
  blockPosition: PropTypes.number,
};

export default DragDropContext(HTML5Backend)(Grid);
