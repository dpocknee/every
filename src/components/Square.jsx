import React from 'react';
import PropTypes from 'prop-types';

const Square = props => {
  const { swidth, sheight, children } = props;
  return (
    <div
      className="squarebackground"
      style={{
        width: swidth,
        height: sheight,
      }}
    >
      {children}
    </div>
  );
};

Square.propTypes = {
  swidth: PropTypes.number.isRequired,
  sheight: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default Square;
