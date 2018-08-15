import React from 'react';
import ReactDOM from 'react-dom';
import Grid from './Grid';
import { observe } from './Page';

const rootEl = document.getElementById('root');

observe(blockPosition =>
  ReactDOM.render(
    <div>
	<Grid blockPosition={blockPosition} />
    </div>,
    rootEl
  )
);

//    <p>mainarray: {current_order_string}</p>