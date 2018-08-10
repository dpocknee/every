import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Square from './Square';
import { moveBlock } from './Page';
import { ItemTypes } from './Constants';
import { sourcerer } from './Grid';
import { DropTarget } from 'react-dnd';


const squareTarget = {
  drop(props) {
    moveBlock(props.index,props.value);
  }
};

function collect(connect, monitor) {
  var sourceProps = monitor.getItem()
  if (sourceProps != null) {
    console.log("SOURCE PROPS " + sourceProps.Object + ' ' + sourceProps.index + ' ' + sourceProps.id + ' ' + sourceProps.name + ' ' + sourceProps.value)
    sourcerer(sourceProps.index,sourceProps.id);
  }
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

class GridSquare extends Component {
  render() {
    const {index, value, connectDropTarget, isOver, swidth, sheight } = this.props;
    return connectDropTarget(
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        <Square index={index} value={value} swidth={swidth} sheight={sheight}>
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
            fontSize: 35,
            fontWeight: 'bold',
            textAlign: 'center',
          }} >
          </div>
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