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
  'rgb(255, 0, 0)', 
  'rgb(191, 64, 0)',
  'rgb(223, 32, 0)',
  'rgb(159, 96, 0)',
  'rgb(128, 128, 0)',
  'rgb(96, 159, 0)',
  'rgb(64, 191, 0)',
  'rgb(32, 223, 0)',
  'rgb(0, 255, 0)'
];
   
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

class Block extends Component {
  render() {
    var eachImage = ('/chords/'+ this.props.name + '.png');
    var speedcolor = ('rgb('+ this.props.redvalue + ', ' + this.props.greenvalue + ', 0)');
    var harmonicspread = ((this.props.harmonics*100) + '%');
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div style={{
        opacity: isDragging ? 0.5 : 1,
        textAlign: 'center',
        cursor: 'move'
      }}>
          <div style={{
            height: '20px',
            width: '100%',
            backgroundColor: speedcolor,
            fontSize: 10,
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
          }} >
          <p>{this.props.name}</p>
        </div>
        <div style={{
          height: '15px',
          width: '100%',
          backgroundColor: difficultycolors[this.props.difficulty-1],
          fontSize: 10,
          color: 'white',
          textAlign: 'center',
          textWeight: 'bold',
          marginBottom: 10
        }} >
        <p>{this.props.difficulty}/9</p>
        </div>
        <div style={{
          height: '10px',
          width: '100%',
          backgroundColor: 'lightblue',
          fontSize: 8,
          color: 'black',
          textAlign: 'center',
          textWeight: 'bold',
          marginBottom: 10
        }} >
        <p>Notes: {this.props.notes}</p>
        </div>
        <div style={{
          height: '10px',
          width: '100%',
          backgroundColor: 'white',
          border: 'solid black 1px',
          marginBottom: 10
        }} >
        <div style={{
          height: '10px',
          width: harmonicspread,
          backgroundColor: 'lightblue',
          fontSize: 8,
          color: 'black',
          textAlign: 'center',
          textWeight: 'bold'
        }} >
        {harmonicspread}
        </div>
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