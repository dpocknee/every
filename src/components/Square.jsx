import React from 'react';
import PropTypes from 'prop-types';

const Square = props => {
  const { squareWidth, squareHeight, children } = props;
  return (
    <div
      className="squarebackground"
      style={{
        width: `${squareWidth}px`,
        height: `${squareHeight}px`,
      }}
    >
      {children}
    </div>
  );
};

Square.propTypes = {
  squareWidth: PropTypes.number.isRequired,
  squareHeight: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default Square;
