import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ItemTypes } from './Constants';
import { DragSource } from 'react-dnd';

const blockSource = {
  beginDrag(props) {
    return {id: props.id}
  }
};
   
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

class Block extends Component {
  render() {
    var eachImage = ('/chords/'+ this.props.value + '.png');
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 10,
        textAlign: 'center',
        cursor: 'move'
      }}>
        <img src={eachImage} alt={'right'}/>
        {this.props.value}
      </div>
    );
  }
}

Block.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.BLOCK, blockSource, collect)(Block);