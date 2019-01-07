import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Grid from './components/Grid';
import MainTitle from './components/MainTitle';
import { observe } from './components/Page';
import './css/index.css';

/* eslint react/jsx-filename-extension: 0 */

const root = document.getElementById('root');

const App = props => {
  const { blockPosition } = props;
  return (
    <div className="mainpage">
      <MainTitle />
      <Grid blockPosition={blockPosition} />
    </div>
  );
};

App.propTypes = {
  blockPosition:
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]) || PropTypes.oneOf([null]),
};

App.defaultProps = {
  blockPosition: [null, null],
};

observe(blockPosition => ReactDOM.render(<App blockPosition={blockPosition} />, root));
