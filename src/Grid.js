import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import GridSquare from './GridSquare';
import Block from './Block';
import jsondata from './outputdb.json';

const squareWidth = '60px';
const squareHeight = '250px';

var blockFrom = null;

export function sourcerer(value,id) {
  blockFrom = [value,id]
}

var mainarray = []

console.log(jsondata['chords'][0])
for (let i = 0; i < jsondata['chords'].length; i++) {
  var outter = jsondata['chords'][i].name;
  mainarray.push(outter);
};

var starting = null;

class Grid extends Component {
  render() {

      if (starting != null) {
        var blockId = blockFrom[1]
        var oldPosition = mainarray.findIndex(function(x) {return x===blockId;});
        var newPosition = this.props.blockPosition[0]
        mainarray.splice(oldPosition,1)
        mainarray.splice(newPosition,0,blockId)
      } else {
        starting = true
      }

    var current_order_string = [];
    const squares = [];

    for (let index = 0; index < mainarray.length; index++) {
      squares.push(
          <div key={index}
               style={{ width: squareWidth, height: squareHeight, margin: '10px 5px 20px 5px',border: '0px solid black'}}>
            <GridSquare index={index} value={mainarray[index]} swidth={squareWidth} sheight={squareHeight}>
              <Block id={mainarray[index]} value={mainarray[index]}/>
            </GridSquare>
          </div>
        );
      current_order_string.push(mainarray[index] + ' ');
    }
    return (
      <div>
      <h1>The <i>Every</i> Composer App</h1>
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
      }}>
        {squares}
      </div>
     </div>
    );
  }
}

//   <div><p>Order: {current_order_string}</p></div>




export default DragDropContext(HTML5Backend)(Grid);