import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { isEqual } from 'lodash';
import PropTypes from 'prop-types';
import GridSquare from './GridSquare';
import Block from './Block';

import idealOrder from '../data/IdealOrder';
import chords from '../data/chords';
import timing from '../data/timing';
import '../css/every.css';

const squareWidth = 70;
const squareHeight = 320;
const squareWidthPx = `${squareWidth}px`;
const squareHeightPx = `${squareHeight}px`;

let blockFrom = null;

export function sourcerer(value, id) {
  blockFrom = [value, id];
}

// NOTE: The format for the window.mainArray variable is [chord name, chord index]
// TO DO: add in gradient to the edge of each box to indicate overlapping string usage.

class Grid extends Component {
  state = {
    slider: 0,
    mainArray: [],
  };

  componentDidMount() {
    const originalArray = chords.map((chord, index) => {
      const mappedOrder = idealOrder[index];
      return [chords[mappedOrder].name, [mappedOrder]];
    });
    this.setState({ mainArray: originalArray });
    window.mainArray = originalArray;
  }

  componentDidUpdate(prevProps, prevState) {
    const { mainArray } = this.state;
    const { blockPosition } = this.props;
    if (!isEqual(blockPosition, prevProps.blockPosition)) {
      this.whenBlockIsDropped();
    }
    if (!isEqual(mainArray, prevState.mainArray) && !isEqual(mainArray, window.mainArray)) {
      window.mainArray = mainArray;
    }
  }

  updateTheSliderValue = sliderElement => {
    this.setState({
      slider: sliderElement.target.value,
    });
  };

  updateTheArray = parsedArray => {
    const updatedArray = parsedArray.map(chord => [chords[chord].name, chord]);
    this.setState({ mainArray: updatedArray });
    window.mainArray = updatedArray;
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

  render() {
    const { slider, mainArray } = this.state;
    const squares = mainArray.map((chord, index) => {
      const [currentValue, currentIndex] = mainArray[index];
      const selectedChord = index === parseInt(slider, 10) ? '0px 0px 5px 5px #888888' : '0px 0px 0px 0px #888888';
      const squareKey = `squares${index}`;
      return (
        <>
          <div
            key={squareKey}
            className="squares"
            style={{ width: squareWidthPx, height: squareHeightPx }}
          >
            <GridSquare
              index={index}
              value={currentValue}
              swidth={squareWidthPx}
              sheight={squareHeightPx}
            >
              <Block
                id={currentValue}
                name={currentValue}
                redvalue={timing[index][3]}
                greenvalue={timing[index][4]}
                timingRating={timing[index][2]}
                difficulty={chords[currentIndex].difficulty}
                notes={chords[currentIndex].notes}
                harmonics={chords[currentIndex].harmonic_ratio}
                octaves={chords[currentIndex].octavehistogram}
                swidth={squareWidth}
                sheight={squareHeight}
                selectedChord={selectedChord}
              />
            </GridSquare>
          </div>
        </>
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
      </>
    );
  }
}

Grid.propTypes = {
  blockPosition: PropTypes.arrayOf(PropTypes.number),
};

Grid.defaultProps = {
  blockPosition: null,
};

export default DragDropContext(HTML5Backend)(Grid);
