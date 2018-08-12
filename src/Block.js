import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ItemTypes } from './Constants';
import { DragSource } from 'react-dnd';

const blockSource = {
  beginDrag(props) {
    return {id: props.id}
  }
};

const difficultycolors = [
  'rgb(0, 255, 0)',
  'rgb(32, 223, 0)',
  'rgb(64, 191, 0)',
  'rgb(96, 159, 0)',
  'rgb(128, 128, 0)',
  'rgb(159, 96, 0)',
  'rgb(191, 64, 0)',
  'rgb(223, 32, 0)',
  'rgb(255, 0, 0)'
];

const notecolors = [
  '#EEEEEE',
  '#BBBBBB',
  '#888888',
  '#555555',
  '#222222'
]
   
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

function octavemaker (arrayin,octaveheight,graphwidth,topoffset) {
  var octoutput = [];
  var bardivision = octaveheight/5;
  var barwidth = (graphwidth/5)-2;
  for(let x = 0; x < arrayin.length; x++) {
    var barheight = (arrayin[x]*bardivision)+1;
    var topval = (octaveheight - barheight) + topoffset;
    var leftval = x*(barwidth+2)+1;

    octoutput.push(
      <div key={x} style={{
        height: barheight + 'px',
        position: 'absolute',
        top: topval + 'px',
        left: leftval + 'px',
        width: barwidth + 'px',
        margin: '0px 1px 0px 1px',
        boxSizing: 'border-box',
        backgroundColor: 'lightblue'
      }}></div>
      );
    }
    return octoutput;
}

class Block extends Component {
  render() {
    const { connectDragSource, isDragging } = this.props;
    
    var eachImage = ('/chords/'+ this.props.name + '.png');
    var speedcolor = ('rgb('+ this.props.redvalue + ', ' + this.props.greenvalue + ', 0)');
    var usenotecolor = notecolors[this.props.notes-1]
    var harmonicspread = (Math.round(this.props.harmonics*100) + '%');
    var octaveheight = 50;
    var topoffset = 56; // amount octave graph is offset from the top of the main div
    var octavearray = octavemaker(this.props.octaves,octaveheight,this.props.swidth,topoffset);

    return connectDragSource(
      <div style={{
        opacity: isDragging ? 0.5 : 1,
        textAlign: 'center',
        cursor: 'move',
        boxShadow: this.props.selectedchord
      }}>
          <div style={{
            height: '15px',
            width: '100%',
            backgroundColor: speedcolor,
            fontSize: 10,
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
            margin: 1
          }} >
          {this.props.name}
        </div>
        <div style={{
          height: '15px',
          width: '100%',
          backgroundColor: difficultycolors[this.props.difficulty-1],
          fontSize: 10,
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bold',
          margin: 1
        }} >
        {this.props.difficulty}
        </div>
        <div style={{
          height: '10px',
          width: '100%',
          backgroundColor: usenotecolor,
          fontSize: 9,
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bold',
          margin: 1
        }} >
        {this.props.notes}
        </div>
        <div style={{
          height: '13px',
          width: '100%',
          boxSizing: 'border-box',
          backgroundColor: 'white',
          border: 'solid lightgray 1px',
          margin: 1
        }} >
          <div style={{
            height: '11px',
            width: harmonicspread,
            boxSizing: 'border-box',
            backgroundColor: 'lightblue',
            fontSize: 8,
            color: 'black',
            textAlign: 'center',
          }} >
          {harmonicspread}
          </div>
        </div>
        <div style={{
          height: '50px',
          width: '100%',
          boxSizing: 'border-box',
          backgroundColor: 'white',
          border: 'solid lightgray 1px',
          margin: '1px 1px 10px 1px',
          verticalAlign: 'bottom',
        }} >
        {octavearray}
        </div>

        <img src={eachImage} alt={'right'}/>
      </div>
    );
  }
}

Block.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.BLOCK, blockSource, collect)(Block);