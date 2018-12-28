import React from 'react';
import ReactDOM from 'react-dom';
import Grid from './components/Grid';
import { observe } from './components/Page';
import './css/index.css';
import './css/every.css';
import './css/block.css';

const rootEl = document.getElementById('root');
// const App = () =>
observe(blockPosition => ReactDOM.render(
  <div>
    <Grid blockPosition={blockPosition} />
  </div>,
  rootEl,
));

// export default App;

// ReactDOM.render(<App />, document.getElementById('root'));
