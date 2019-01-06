import React from 'react';
import ReactDOM from 'react-dom';
import Grid from './components/Grid';
import MainTitle from './components/MainTitle';
import { observe } from './components/Page';
import './css/every.css';

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

observe(blockPosition => ReactDOM.render(<App blockPosition={blockPosition} />, root));
