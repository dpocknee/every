import React from 'react';
import ReactDOM from 'react-dom';
import Grid from './components/Grid';
import { observe } from './components/Page';

const rootEl = document.getElementById('root');

const App = observe(blockPosition => ReactDOM.render(
  <div>
    <Grid blockPosition={blockPosition} />
  </div>,
  rootEl,
));

export default App;
