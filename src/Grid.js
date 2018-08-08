import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';

import { canMoveBlock, moveBlock } from './Page';
import GridSquare from './GridSquare';
import Square from './Square';
import Block from './Block';


class Grid extends Component {
  static propTypes = {
    blockPosition: PropTypes.arrayOf(
      PropTypes.number.isRequired
    ).isRequired
  };
renderSquare(i) {
  const x = i % 8;
  const y = Math.floor(i / 8);
  return (
    <div key={i}
         style={{ width: '12.5%', height: '12.5%' }}>
      <GridSquare x={x}
                   y={y}>
        {this.renderPiece(x, y)}
      </GridSquare>
    </div>
  );
}

renderPiece(x, y) {
  const [blockX, blockY] = this.props.blockPosition;
  if (x === blockX && y === blockY) {
    return <Block />;
  }
}

handleSquareClick(toX, toY) {
  if (canMoveBlock(toX, toY)) {
    moveBlock(toX, toY);
  }
}

  render() {
    const squares = [];
    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i));
    }

    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        {squares}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Grid);