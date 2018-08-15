import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import GridSquare from './GridSquare';
import Block from './Block';
import jsondata from './outputdb.json';
import timingdata from './timing.json';
import {Slider} from './Slider.js';
import {tooltip} from './tooltip.css';

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
      <div style={{width: '600px', fontSize: '12px'}}>
      <h1>The <i>Every</i> Composer App</h1>
      <p>Hi, I'm David Pocknee and this is an app I created in 2018 to help me finish composing my guitar piece <i>Every</i>, which I started in 2013.  <i>Every</i> is around 10 minutes in length and is "a compendium of 
 almost every playable guitar chord of 1-6 notes solely containing the note E and consisting only of fingered pitches or natural harmonics (up to the 5th partial)".</p>
      <p>This app was built with ReactJS and the webaudio API, and allows the user to drag and drop all 319 chords in the piece into an order of their choice. 
      A sythesized version of the re-ordered piece (algorithmically spliced together from samples) can then be played back by clicking the play and stop buttons in the bottom right of the window.  
      <br />The slider in the bottom left of the window can be used to choose the chord from which this playback starts.</p>
      <p>After you have decided upon an order of chords that you like, it can be converted into musical notation in the liypond format by using the controls at the bottom right of the window.</p>
      <p>Each chord is represented by a set of statistics to help aid its ordering: </p>
      <ul style={{fontSize: '10px'}}> 
        <li>A chord reference number (e.g. chord_123).  This is color-coded according to the duration before the next chord.  long=green, short=red.</li>
        <li>A color-coded rating of how difficult the chord is to play (1=easy/green, 9=very difficult/red).  By matching the colors of the chord number and the difficulty, 
        you can ensure that the most difficult chords only occur in parts of the piece where there is a large amount of time for their preparation and execution.</li>
        <li>The number of notes in the chord (also color-coded - the more notes the darker the color).</li>
        <li>The percentage of notes in the chord that are harmonics.</li>
        <li>A histogram showing how the sounding pitches in each chord are distributed over the five possible octaves.</li>
        <li>The chord represented in tablature and standard guitar notation.</li>
      </ul>
      <p>You can see which statistic you are looking at by hovering your mouse over it.</p>
      <p>As well as being a tool for me, the composer, I also thought that it could be used by performers of the work to make fine-tuning adjustments to the order of chords in the piece in order to aid playability, 
      and personalize and shape the work according to the idiosyncracies of their playing and instrument.</p>
      <p>Additionally, by making this code available online, I hope that it might be useful in helping other composers and performers to build similar interfaces to help with their musical projects.</p>
      <p>dp - August 2018</p>
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
      backgroundColor: 'lightblue',
      color: 'black',
      border: '1px solid black'
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