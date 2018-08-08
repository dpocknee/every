import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import GridSquare from './GridSquare';
import Block from './Block';

const squareWidth = '100px';
const squareHeight = '100px';

const namearray = ["A","B","C","D","E","F","G","H"];
const mainarray = [];

for (let i = 0; i < namearray.length; i++) {
  mainarray.push(namearray[i])
}
var starting = null;

class Grid extends Component {
  render() {
      if (starting != null) {
        var blockToMove = this.props.blockPosition[1]
        var newPosition = this.props.blockPosition[0]
        var oldPosition = mainarray.findIndex(function(x) {return x===blockToMove;});
        console.log("blockToMove " + blockToMove)
        console.log("newPosition " + newPosition)
        console.log("oldPosition " + oldPosition)
        mainarray.splice(oldPosition,1)
        mainarray.splice(newPosition,0,blockToMove)
      } else {
        starting = true
      }

    var current_order_string = [];
    const squares = [];

    for (let index = 0; index < mainarray.length; index++) {
      squares.push(
          <div key={index}
               style={{ width: squareWidth, height: squareHeight, margin: '10px',border: '2px solid black'}}>
            <GridSquare index={index} value={mainarray[index]} swidth={squareWidth} sheight={squareHeight}>
              <Block value={mainarray[index]}/>
            </GridSquare>
          </div>
        );
      current_order_string.push(mainarray[index] + ' - ');
    }
    //console.log(mainarray)

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