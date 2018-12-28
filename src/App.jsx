import React from 'react';
import ReactDOM from 'react-dom';
import Grid from './components/Grid';
import { observe } from './components/Page';
// import './index.css';
// import './every.css';
// import './block.css';

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
