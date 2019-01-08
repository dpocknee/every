const converter = require('rgb-hex-converter');

const red = '#6E0003';
const green = '#40A33B';
const blue = '#61A39A';
const yellow = '#94C6C2';
const purple = '#00221D';

const settings = {
  mainTitle: {
    backgroundColor: yellow,
    color: purple,
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
  playbackButtons: { color: purple, boxShadow: purple },
  playbackIcons: { color: purple },
  buttons: {
    backgroundColor: purple,
    color: 'white',
  },
  disabledButtons: {
    backgroundColor: blue,
    color: yellow,
    border: purple,
  },
  harmonics: {
    backgroundColor: yellow,
    color: purple,
  },
  octaves: {
    backgroundColor: yellow,
  },
};

// topOffset is the amount octave graph is offset from the top of the main div
export default settings;
