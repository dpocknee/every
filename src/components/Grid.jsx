import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { isEqual } from 'lodash';
import PropTypes from 'prop-types';
import GridSquare from './GridSquare';
import Block from './Block';
import Slider from './Slider';
import IntroText from './IntroText';
import Lilypond from './Lilypond';
import idealOrder from '../assets/IdealOrder';
import chords from '../assets/chords';
import timing from '../assets/timing';
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

class Grid extends Component {
  state = {
    slider: 0,
    mainArray: [],
  };

  componentDidMount() {
    const originalArray = chords.map((chord, index) => {
      const mappedOrder = idealOrder[index];
      return [chords[mappedOrder].name, [mappedOrder]]
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

  updateTheSliderValue = (e) => {
    this.setState({
      slider: e.target.value,
    });
  }

  updateTheArray = (parsedArray) => {
    const updatedArray = parsedArray.map((chord) => [chords[chord].name, chord]);
    this.setState({ mainArray: updatedArray })
    window.mainArray = updatedArray;
  }

  whenBlockIsDropped = () => {
    const { blockPosition } = this.props;
    const { mainArray, starting } = this.state;
    const blockId = blockFrom[1];

    const oldPosition = mainArray.findIndex((x) => x[0] == blockId);
    const oldValue = mainArray[oldPosition][1];
    const newPosition = blockPosition[0];
    this.setState(state => {
      const newArray = state.mainArray.map((x) => x);
      newArray.splice(oldPosition, 1);
      newArray.splice(newPosition, 0, [blockId, oldValue]);
      return { mainArray: newArray, starting: false };
    });
  }     

  render() {
    const { slider, mainArray, starting } = this.state;
    const currentOrderArray = mainArray.map((element) => {
      return element[1];
    });
    const currentOrderString = `[${currentOrderArray.join(', ')}]`;

    const squares = mainArray.map((chord, index) => {
      const [currentValue, currentIndex] = mainArray[index];
      const selectedchord = (index === parseInt(slider, 10)) ? '0px 0px 5px 5px #888888' : '0px 0px 0px 0px #888888';
      return (
        <div
          key={`squares${index}`}
          className="squares"
          style={{ width: squareWidthPx, height: squareHeightPx }}
        >
          <GridSquare
            key={`gridSquare${index}`}
            index={index}
            value={currentValue}
            swidth={squareWidthPx}
            sheight={squareHeightPx}
          >
            <Block
              key={`block${index}`}
              id={currentValue}
              name={currentValue}
              redvalue={timing[index][3]}
              greenvalue={timing[index][4]}
              timingrating={timing[index][2]}
              difficulty={chords[currentIndex].difficulty}
              notes={chords[currentIndex].notes}
              harmonics={chords[currentIndex].harmonic_ratio}
              octaves={chords[currentIndex].octavehistogram}
              swidth={squareWidth}
              sheight={squareHeight}
              selectedchord={selectedchord}
            />
          </GridSquare>
        </div>
      );
    });

    return (
      <div className="mainpage">
        <IntroText />
        <div className="maintitle">
          <h1>
            <a href="http://www.davidpocknee.com/">{"David Pocknee's"}</a>{' '}
            <i>Every</i> Composition Tool
          </h1>
        </div>
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
        <div style={{ width: '100%', height: '110px' }} />{' '}
        {/* This is just a spacer for the bottom, to ensure that the slider doesn't cover up the last row of chords. */}
        <div className="playbackbox">
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Slider sliderUpdate={this.updateTheSliderValue} />
            <div className="slidertext">
              <p>{`Chord #${parseInt(slider, 10) + 1}`}</p>
            </div>
          </div>
          <Lilypond
            currentArray={currentOrderString}
            arrayUpdater={this.updateTheArray}
          />
        </div>
      </div>
    );
  }
}

Grid.propTypes = {
  blockPosition: PropTypes.array,
}

Grid.defaultProps = {
  blockPosition: null,
}

export default DragDropContext(HTML5Backend)(Grid);
