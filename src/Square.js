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
        width: '100%',
        height: '100%',
      }}>
        {this.props.children}
        {this.props.index + ' - ' + this.props.value} 
      </div>
    );
  }
}