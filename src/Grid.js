import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';
import GridSquare from './GridSquare';
import Block from './Block';

const mainarray = [];
for (let i = 0; i < 64; i++) {
  mainarray.push(64-i);
}

class Grid extends Component {
  static propTypes = {
    blockPosition: PropTypes.arrayOf(
      PropTypes.number.isRequired
    ).isRequired,
  };

    renderSquare(index,value) {
    const x = index % 8;
    const y = Math.floor(index / 8);
    return (
      <div key={index}
           style={{ width: '12.5%', height: '12.5%' }}>
        <GridSquare x={x} y={y} index={index} value={value}>
          {this.renderPiece(x, y, index, value)}
        </GridSquare>
      </div>
    );
  }

  renderPiece(x, y, index, value) {
    const [blockX, blockY] = this.props.blockPosition;
    if (x === blockX && y === blockY) {
      //arrayReorder(,value,index)
      mainarray[index] = "blah"
      console.log(mainarray)
      return (
       <Block index={index} value={value}/>
        );
    }
  }

  arrayReorder(oldPosition,value,newPosition) {
    //This function takes in mainarray and changes it so that 
    //the value (value) at index oldPosition is relocated to index newPosition
        mainarray.splice(oldPosition,1)
        mainarray.splice(newPosition,0,value)
      }
  

  render() {
      var current_order_string = [];
      for (let j=0; j < mainarray.length; j++) {
        current_order_string.push(mainarray[j] + ' - ');
      }
    const squares = [];
      for (let i = 0; i < mainarray.length; i++) {
        squares.push(this.renderSquare(i,mainarray[i]));
      }
    return (
      <div>
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        {squares}
      </div>
      <div><p>Position: {current_order_string}</p></div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Grid);