import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import GridSquare from './GridSquare';
import Block from './Block';
import { Slider } from './Slider';
import { IntroText } from './IntroText';
import { Lilypond } from './Lilypond';
import './css/every.css';
import { idealOrder } from './IdealOrder';

const squareWidth = 70;
const squareHeight = 320;

var blockFrom = null;
var timing = [];
var starting = null;

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
  constructor(props) {
    super(props);
    this.state = {
      slider: 0,
      blockPosition: this.props.blockPosition,
      windowmainarray: [0]
    };
    this.updateTheSliderValue = this.updateTheSliderValue.bind(this);
    this.updateTheArray = this.updateTheArray.bind(this);
  }

  updateTheSliderValue(e) {
    this.setState({
      slider: e.target.value,
      blockPosition: this.props.blockPosition
    });
  }

  updateTheArray(parsedarray) {
    this.setState({
      windowmainarray: parsedarray
    });

    let updatedArray = [];
    parsedarray.forEach(function(x) {
      updatedArray.push([window.chords['chords'][x].name, x]);
    });
    window.mainArray = updatedArray;
  }

  render() {
    if (starting !== null && blockFrom !== null) {
      let blockId = blockFrom[1];
      let oldPosition = window.mainArray.findIndex(function(x) {
        return x[0] == blockId;
      });
      let oldValue = window.mainArray[oldPosition][1];
      let newPosition = this.props.blockPosition[0];
      window.mainArray.splice(oldPosition, 1);
      window.mainArray.splice(newPosition, 0, [blockId, oldValue]);
    } else {
      starting = true;
    }

    let current_order_string = '[';
    const squares = [];
    let selectedchord;

    for (let index = 0; index < window.mainArray.length; index++) {
      let currentvalue = window.mainArray[index][0];
      let currentindex = window.mainArray[index][1];
      if (index === parseInt(this.state.slider, 10)) {
        selectedchord = '0px 0px 5px 5px #888888';
      } else {
        selectedchord = '0px 0px 0px 0px #888888';
      }

      squares.push(
        <div
          key={index}
          className="squares"
          style={{ width: squareWidth + 'px', height: squareHeight + 'px' }}
        >
          <GridSquare
            index={index}
            value={currentvalue}
            swidth={squareWidth + 'px'}
            sheight={squareHeight + 'px'}
          >
            <Block
              id={currentvalue}
              name={currentvalue}
              redvalue={timing[index][3]}
              greenvalue={timing[index][4]}
              timingrating={timing[index][2]}
              difficulty={window.chords['chords'][currentindex].difficulty}
              notes={window.chords['chords'][currentindex].notes}
              harmonics={window.chords['chords'][currentindex].harmonic_ratio}
              octaves={window.chords['chords'][currentindex].octavehistogram}
              swidth={squareWidth}
              sheight={squareHeight}
              selectedchord={selectedchord}
            />
          </GridSquare>
        </div>
      );
      if (index !== 0) current_order_string += ', ';
      current_order_string += currentindex;
    }
    current_order_string += ']';

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
            currentArray={current_order_string}
            arrayUpdater={this.updateTheArray}
          />
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Grid);
