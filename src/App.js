import React from 'react';
import ReactDOM from 'react-dom';
import Grid from './Grid';
import { observe } from './Page';

const rootEl = document.getElementById('root');

observe(blockPosition =>
  ReactDOM.render(
    <Grid blockPosition={blockPosition} />,
    rootEl
  )
);