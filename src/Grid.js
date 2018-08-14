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

//var window.mainArray = []
var timing = []

//console.log(jsondata['chords'][0])
for (let i = 0; i < jsondata['chords'].length; i++) {
  window.mainArray.push([jsondata['chords'][i].name,i]);
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

    var current_order_string = [];
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
    <div style={{margin: '5px'}}>
      <div style={{width: '500px', fontSize: '12px'}}>
      <h1>The <i>Every</i> Composer App</h1>
      <p>An app created by David Pocknee to help compose his guitar piece <i>Every</i> (2018).  
      <br />This app was built in ReactJS and allows the user to drag and drop each chord into an order of their choice, 
      as well as playing back the result by dragging the slider in the bottom left to choose the chord the playback should start from
      and using the controls in the bottom right to play and stop the playback.
      <br />After you have chosen an order this can then be converted directly into lilypond notation using the controls at the bottom right.</p>
      <p>Each chord is represented by a set of statistics to help aid its ordering: </p>
      <ul style={{fontSize: '10px'}}> 
        <li>A chord reference number (e.g. chord_321)</li>
        <li>A color-coded difficulty rating (1=easy/green, 9=very difficult/red)</li>
        <li>The number of notes in the chord (also color-coded - the more notes the darker the color)</li>
        <li>Percentage of chords that are harmonics</li>
        <li>A histogram showing how the sounding pitches in each chord are distributed over the five possible octaves</li>
        <li>The notation in tab and standard guitar notation.</li>
      </ul>
      </div>
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
      height: '60px',
      bottom: 0,
      left: 0,
      backgroundColor: 'lightgray',
      color: 'black'
     }}>
       <div style={{
        display: 'flex',
        flexDirection: 'row'}}>
         <Slider sliderUpdate={this.updateTheSliderValue}/>
         <div style={{width: '100px'}}><p>Chord {parseInt(this.state.slider)+1}</p></div>
        </div>
     </div>
   </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Grid);