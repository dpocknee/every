import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import GridSquare from './GridSquare';
import Block from './Block';
import jsondata from './outputdb.json';
import timingdata from './timing.json';
import {Slider} from './Slider.js';

class Grid extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      slider : 1
    };
    this.updateTheSliderValue = this.updateTheSliderValue.bind(this);
  }

  updateTheSliderValue(e) {
    console.log("WORKING TRIGGER " + e)
    this.setState({
      blockPosition : this.props.blockPosition,
      slider : e.target.value});
  }

  render() {
      console.log(this.state);
    //MORE TEMP STUFF
  
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
       {/*squares*/}
      </div>
       <div style={{
      position: 'fixed',
      width: '600px',
      height: '400px',
      bottom: 0,
      left: 0,
      backgroundColor: 'lightgray',
      color: 'black'
     }}>
     <span>{this.state.slider}</span>
     <Slider sliderUpdate={this.updateTheSliderValue}/>
        </div>
     </div>
    );
  }
}

//   <div><p>Order: {current_order_string}</p></div>
//difficulty ={jsondata['chords'][i]} 
//notes ={jsondata['chords'][i]} 
//harmonic_ratio ={jsondata['chords'][i]

export default DragDropContext(HTML5Backend)(Grid);