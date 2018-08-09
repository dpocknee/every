import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Square extends Component {
  static propTypes = {
    black: PropTypes.bool
  };

  render() {
    const fill = 'grey';
    const stroke = 'black';

    return (
      <div style={{
        backgroundColor: fill,
        color: stroke,
        width: this.props.swidth,
        height: this.props.sheight,
      }}>
        {this.props.children}
      </div>
    );
  }
}

//{this.props.index + ' - ' + this.props.value}