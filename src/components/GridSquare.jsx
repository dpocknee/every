import React from 'react';
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import Square from './Square';
import { moveBlock } from './Page';
import ItemTypes from './Constants';
import { sourcerer } from './Grid';

const squareTarget = {
  drop(props) {
    moveBlock(props.index, props.value);
  },
};

function collect(connect, monitor) {
  const sourceProps = monitor.getItem();
  if (sourceProps != null) {
    sourcerer(sourceProps.index, sourceProps.id);
  }
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

const GridSquare = props => {
  const {
    index, value, connectDropTarget, isOver, swidth, sheight, children,
  } = props;
  return connectDropTarget(
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <Square index={index} value={value} swidth={swidth} sheight={sheight}>
        {children}
      </Square>
      {isOver && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: 'yellow',
          }}
        />
      )}
    </div>,
  );
};

GridSquare.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  isOver: PropTypes.func.isRequired,
  swidth: PropTypes.number.isRequired,
  sheight: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default DropTarget(ItemTypes.BLOCK, squareTarget, collect)(GridSquare);
