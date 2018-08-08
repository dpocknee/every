
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ItemTypes } from './Constants';
import { DragSource } from 'react-dnd';

const blockSource = {
  beginDrag(props) {
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Block extends Component {
  render() {
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move'
      }}>
        ♘
      </div>
    );
  }
}

Block.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.BLOCK, blockSource, collect)(Block);