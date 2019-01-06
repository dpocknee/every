import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Grid from './components/Grid';
import MainTitle from './components/MainTitle';
import PlaybackBox from './components/PlaybackBox';
import { observe } from './components/Page';
import './css/every.css';

/* eslint react/jsx-filename-extension: 0 */

const root = document.getElementById('root');

observe(blockPosition => ReactDOM.render(
  <div className="mainpage">
    <MainTitle />
    <Grid blockPosition={blockPosition} />
    {/* <PlaybackBox /> */}
  </div>,
  root,
));

// import React from 'react';
// import ReactDOM from 'react-dom';
// import AudioPlayback from './audio/AudioPlayback';
// import chords from './data/chords';
// import timing from './data/timingTest';

// const mainArray = chords;

// const App = () => (
//   <>
//     <div>
//       <p>Hello!</p>
//     </div>
//     <div>
//       <AudioPlayback mainArray={mainArray} chords={chords} timing={timing} />
//     </div>
//   </>
// );

// ReactDOM.render(<App />, document.getElementById('root'));

// export default App;

// observe(blockPosition => ReactDOM.render(
//   <div className="mainpage">
//     <IntroText />
//     <MainTitle />
//     <Grid blockPosition={blockPosition} />
//     <PlaybackBox />
//   </div>,
//   root,
// ));

// const App = props => {
//   <Grid blockPosition={blockPosition} />;
// };
