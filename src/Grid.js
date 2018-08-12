import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import GridSquare from './GridSquare';
import Block from './Block';
import jsondata from './outputdb.json';
import timingdata from './timing.json';
import {Slider} from './Slider.js';
//import {PlaybackSlider, outter} from './playbackslider.js';
//import RefsForm from './reftest.js';

const squareWidth = 60;
const squareHeight = 300;

var blockFrom = null;

export function sourcerer(value,id) {
  blockFrom = [value,id]
 // console.log("sourcerer " + value + ' ' + ' ' + id)
}

var mainarray = []
var timing = []

//console.log(jsondata['chords'][0])
for (let i = 0; i < jsondata['chords'].length; i++) {
  mainarray.push([jsondata['chords'][i].name,i]);
  timing.push(timingdata['timing'][i]);
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

      if (starting != null && blockFrom != null) {
        var blockId = blockFrom[1]
         var oldPosition = mainarray.findIndex(function(x) {return x[0]==blockId;});
        var oldValue = mainarray[oldPosition][1];
        var newPosition = this.props.blockPosition[0];
        mainarray.splice(oldPosition,1);
        mainarray.splice(newPosition,0,[blockId,oldValue]);
      } else {
        starting = true
      }

    var current_order_string = [];
    const squares = [];

    for (let index = 0; index < mainarray.length; index++) {
      var currentvalue = mainarray[index][0]
      var currentindex = mainarray[index][1]
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
              difficulty={jsondata['chords'][currentindex].difficulty}
              notes={jsondata['chords'][currentindex].notes}
              harmonics={jsondata['chords'][currentindex].harmonic_ratio}
              octaves={jsondata['chords'][currentindex].octavehistogram}
              swidth={squareWidth}
              selectedchord = {selectedchord}
              />
            </GridSquare>
          </div>
        );
      current_order_string.push(currentvalue + ' ');      
    }
    return (
      <div>
      <h1>The <i>Every</i> Composer App</h1>
      <p>An app to help compose the guitar piece <i>Every</i>.</p>
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
      height: '120px',
      bottom: 0,
      left: 0,
      backgroundColor: 'lightgray',
      color: 'black'
     }}>
     <Slider sliderUpdate={this.updateTheSliderValue}/>
     <span>Chord {parseInt(this.state.slider)+1}</span>
        </div>
     </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Grid);