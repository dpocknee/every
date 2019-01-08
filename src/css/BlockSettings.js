const converter = require('rgb-hex-converter');

const red = '#e7717d';
const green = '#afd275';
const blue = '#c2cad0';
const yellow = '#c2b9b0';
const purple = '#7e685a';

const settings = {
  mainTitle: {
    backgroundColor: purple,
    color: 'white',
  },
  easiestDifficultyColor: Object.values(converter.HEXtoRGB(green)),
  hardestDifficultyColor: Object.values(converter.HEXtoRGB(red)),
  noOfNotesMaxColor: Object.values(converter.HEXtoRGB(purple)),
  noOfNotesMinColor: [180, 180, 180],
  octaveHeight: 50,
  topOffset: 56,
  chordHighlightSelect: '0px 0px 5px 5px #888888',
  chordHighlightPlaying: '0px 0px 5px 5px #c0c0c0',
  dragndropColor: yellow,
  floatingBoxes: { backgroundColor: yellow, border: `0px solid ${purple}`, color: purple },
  playbackButtons: { color: purple },
  buttons: {
    backgroundColor: purple,
    color: 'white',
  },
  disabledButtons: {
    backgroundColor: blue,
    color: purple,
    border: purple,
  },
  harmonics: {
    backgroundColor: blue,
    color: purple,
  },
  octaves: {
    backgroundColor: blue,
  },
};

// topOffset is the amount octave graph is offset from the top of the main div
export default settings;
