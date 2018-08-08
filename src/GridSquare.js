
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Square from './Square';
import { moveBlock } from './Page';
import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';

const squareTarget = {
  drop(props) {
    moveBlock(props.index);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class GridSquare extends Component {
  render() {
    const {index, value, connectDropTarget, isOver } = this.props;

    return connectDropTarget(
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        <Square index={index} value={value}>
          {this.props.children}
        </Square>
        {isOver &&
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: 'yellow',
          }} />
        }
      </div>
    );
  }
}

GridSquare.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired
};

export default DropTarget(ItemTypes.BLOCK, squareTarget, collect)(GridSquare);