// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import Grid from './components/Grid';
// import { observe } from './components/Page';

/* eslint react/jsx-filename-extension: 0 */

// const rootEl = document.getElementById('root');

// const App = observe(blockPosition => ReactDOM.render(
//   <div>
//     <Grid blockPosition={blockPosition} />
//   </div>,
//   rootEl,
// ));

import React from 'react';
import ReactDOM from 'react-dom';
import AudioPlayback from './audio/AudioPlayback';
import chords from './data/chords';

const mainArray = chords;

const App = () => (
  <>
    <div>
      <p>Hello!</p>
    </div>
    <div>
      <AudioPlayback mainArray={mainArray} />
    </div>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));

// export default App;
