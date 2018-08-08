import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
//import PropTypes from 'prop-types';
import GridSquare from './GridSquare';
import Block from './Block';

const squareWidth = '100px';
const squareHeight = '100px';
var oldPosition = 0;

const mainarray = [];
for (let i = 0; i < 64; i++) {
  mainarray.push(i);
}

class Grid extends Component {
 
  render() {
      mainarray.splice(oldPosition,1)
      mainarray.splice(this.props.blockPosition,0,mainarray[this.props.blockPosition])
      oldPosition = this.props.blockPosition
      var current_order_string = [];
      for (let j=0; j < mainarray.length; j++) {
        current_order_string.push(mainarray[j] + ' - ');
      }
    const squares = [];
    for (let index = 0; index < mainarray.length; index++) {
      squares.push(
          <div key={index}
               style={{ width: squareWidth, height: squareHeight, margin: '10px'}}>
            <GridSquare index={index} value={mainarray[index]} swidth={squareWidth} sheight={squareHeight}>
              {this.props.blockPosition === index ? <Block index={index} value={mainarray[index]}/>: ' ' }
            </GridSquare>
          </div>
        );
    }
    console.log("now")

    return (
      <div>
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
      }}>
        {squares}
      </div>
      <div><p>Position: {current_order_string}</p></div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Grid);