import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import GridSquare from './GridSquare';
import Block from './Block';
import {Slider} from './Slider.js';
import {IntroText} from './IntroText';
import {Lilypond} from './Lilypond';

const squareWidth = 60;
const squareHeight = 300;

var blockFrom = null;

export function sourcerer(value,id) {
  blockFrom = [value,id]
}

var timing = []

for (let i = 0; i < window.chords['chords'].length; i++) {
  window.mainArray.push([window.chords['chords'][i].name,i]);
  timing.push(window.timing['timing'][i]);
};


var starting = null;

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "slider" : 0,
      "blockPosition" : this.props.blockPosition
    };
    this.updateTheSliderValue = this.updateTheSliderValue.bind(this);
  }

  updateTheSliderValue(e) {
    this.setState({
      slider : e.target.value,
    "blockPosition" : this.props.blockPosition
  });
  }

  render() {
    //console.log("FROM INSIDE REACT " + window.mainArray);
      if (starting != null && blockFrom != null) {
        var blockId = blockFrom[1]
         var oldPosition = window.mainArray.findIndex(function(x) {return x[0]==blockId;});
        var oldValue = window.mainArray[oldPosition][1];
        var newPosition = this.props.blockPosition[0];
        window.mainArray.splice(oldPosition,1);
        window.mainArray.splice(newPosition,0,[blockId,oldValue]);
      } else {
        starting = true
      }

   // var current_order_string = [];
    const squares = [];

    for (let index = 0; index <  window.mainArray.length; index++) {
      var currentvalue = window.mainArray[index][0]
      var currentindex = window.mainArray[index][1]
      if (index === parseInt(this.state.slider) ) {
        var selectedchord = '0px 0px 5px 5px #888888';
      } else {
        var selectedchord = '0px 0px 0px 0px #888888'; 
      }
      
      squares.push(
          <div key={index}
               style={{ width: squareWidth+'px', height: squareHeight+'px', margin: '10px 5px 20px 5px',border: '0px solid black'}}>
            <GridSquare index={index} value={currentvalue} swidth={squareWidth+'px'} sheight={squareHeight+'px'}>
              <Block id={currentvalue} 
              name={currentvalue} 
              redvalue={timing[index][3]}
              greenvalue={timing[index][4]}
              difficulty={window.chords['chords'][currentindex].difficulty}
              notes={window.chords['chords'][currentindex].notes}
              harmonics={window.chords['chords'][currentindex].harmonic_ratio}
              octaves={window.chords['chords'][currentindex].octavehistogram}
              swidth={squareWidth}
              selectedchord = {selectedchord}
              />
            </GridSquare>
          </div>
        );
      //current_order_string.push(currentvalue + ' ');      
    }
    return (
      <div style={{margin: '5px'}}>
            <IntroText />
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
      }}>
       {squares}
      </div>
       <div style={{
      position: 'fixed',
      width: '600px',
      height: '200px',
      bottom: 0,
      left: 0,
      backgroundColor: 'lightblue',
      color: 'black',
      border: '1px solid black'
     }}>
       <div style={{
        display: 'flex',
        flexDirection: 'row'}}>
         <Slider sliderUpdate={this.updateTheSliderValue}/>
        {/* <Lilypond />*/}
         <div style={{width: '100px'}}><p>Chord {parseInt(this.state.slider)+1}</p></div>
        </div>
     </div>
   </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Grid);