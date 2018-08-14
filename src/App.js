import React from 'react';
import ReactDOM from 'react-dom';
import Grid from './Grid';
//import Grid from './JustTheSlider';
import { observe } from './Page';

const rootEl = document.getElementById('root');
var slidery = document.getElementById('playback').value;

observe(blockPosition =>
  ReactDOM.render(
    <div>
	<Grid blockPosition={blockPosition} slider={slidery} />
    </div>,
    rootEl
  )
);

//    <p>mainarray: {current_order_string}</p>