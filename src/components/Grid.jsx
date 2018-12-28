import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import GridSquare from './GridSquare';
import Block from './Block';
import Slider from './Slider';
import IntroText from './IntroText';
import Lilypond from './Lilypond';
import '../css/every.css';
import idealOrder from '../IdealOrder';

const squareWidth = 70;
const squareHeight = 320;

let blockFrom = null;
const timing = [];
let starting = null;

export function sourcerer(value, id) {
  blockFrom = [value, id];
}

//NOTE: The format for the window.mainArray variable is [chord name, chord index]
for (let i = 0; i < window.chords['chords'].length; i++) {
  window.mainArray.push([
    window.chords['chords'][idealOrder[i]].name,
    [idealOrder[i]]
  ]);
  timing.push(window.timing['timing'][i]);
}

class Grid extends Component {
  state = {
    slider: 0,
  };

  updateTheSliderValue = (e) => {
    this.setState({
      slider: e.target.value,
    });
  }

  updateTheArray = (parsedArray) => {
    const updatedArray = parsedArray.map((chord) =>  [window.chords['chords'][chord].name, chord]);
    window.mainArray = updatedArray;
  }

  render() {
    const { blockPosition } = this.props;
    const { slider } = this.state;
    if (starting !== null && blockFrom !== null) {
      const blockId = blockFrom[1];
      const oldPosition = window.mainArray.findIndex((x) => x[0] == blockId);
      const oldValue = window.mainArray[oldPosition][1];
      const newPosition = blockPosition[0];
      window.mainArray.splice(oldPosition, 1);
      window.mainArray.splice(newPosition, 0, [blockId, oldValue]);
    } else {
      starting = true;
    }

    let currentOrderString = '[';
    const squares = [];
    let selectedchord;

    for (let index = 0; index < window.mainArray.length; index++) {
      const currentValue = window.mainArray[index][0];
      const currentIndex = window.mainArray[index][1];
      if (index === parseInt(slider, 10)) {
        selectedchord = '0px 0px 5px 5px #888888';
      } else {
        selectedchord = '0px 0px 0px 0px #888888';
      }

      const squareWidthPx = `${squareWidth}px`;
      const squareHeightPx = `${squareHeight}px`;

      squares.push(
        <div
          key={index}
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
              timingrating={timing[index][2]}
              difficulty={window.chords['chords'][currentIndex].difficulty}
              notes={window.chords['chords'][currentIndex].notes}
              harmonics={window.chords['chords'][currentIndex].harmonic_ratio}
              octaves={window.chords['chords'][currentIndex].octavehistogram}
              swidth={squareWidth}
              sheight={squareHeight}
              selectedchord={selectedchord}
            />
          </GridSquare>
        </div>
      );
      if (index !== 0) currentOrderString += ', ';
      currentOrderString += currentIndex;
    }
    currentOrderString += ']';

    return (
      <div className="mainpage">
        <IntroText />
        <div className="maintitle">
          <h1>
            <a href="http://www.davidpocknee.com/">David Pocknee's</a>{' '}
            <i>Every</i> Composition Tool
          </h1>
        </div>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexWrap: 'wrap'
          }}
        >
          {squares}
        </div>
        <div style={{ width: '100%', height: '110px' }} />{' '}
        {/* This is just a spacer for the bottom, to ensure that the slider doesn't cover up the last row of chords:*/}
        <div className="playbackbox">
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Slider sliderUpdate={this.updateTheSliderValue} />
            <div className="slidertext">
              <p>Chord #{parseInt(this.state.slider, 10) + 1}</p>
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

export default DragDropContext(HTML5Backend)(Grid);
