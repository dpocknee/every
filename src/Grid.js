import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import GridSquare from './GridSquare';
import Block from './Block';
import jsondata from './outputdb.json';
import timingdata from './timing.json';

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

//console.log(timing)

var starting = null;

class Grid extends Component {
  render() {

      if (starting != null) {
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
     </div>
    );
  }
}

//   <div><p>Order: {current_order_string}</p></div>
//difficulty ={jsondata['chords'][i]} 
//notes ={jsondata['chords'][i]} 
//harmonic_ratio ={jsondata['chords'][i]

export default DragDropContext(HTML5Backend)(Grid);