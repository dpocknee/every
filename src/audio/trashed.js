const notesPlayed = files.map((file, index) => {
  const stringNumber = /(string-\d)_[A-Z\w+-]*/gi.exec(file)[1];
  return { [stringNumber]: [buffer_reference[index], file] };
});

const defaultStrings = {
  'string-1': null,
  'string-2': null,
  'string-3': null,
  'string-4': null,
  'string-5': null,
  'string-6': null,
};

// console.log('notesPlayed:', notesPlayed);

// notesPlayed.forEach(note => {
//   const stringName = Object.keys(note)[0];
//     this.setState(
//       state => {
//         const oldStringNumber = { ...state.samplesPlaying };
//         oldStringNumber[stringName] = oldStringNumber[stringName] ? note[stringName];
//         return { samplesPlaying: oldStringNumber };
//       },
//       () => console.log('samples playing:', this.state.samplesPlaying),
//     );
// });

// notesPlayed.forEach((chord) => {
//   Object.keys
// })

// const newSamplesPlaying = currentChord.map(() => {
//     const { buffer_reference, files } = currentChord;

//     const notesPlayed = buffer_reference.map((note, index) => [
//       note,
//       files[index],
//       /(string-\d)_[A-Z\w+-]*/gi.exec(note)[1],
//     ]);

//     // const stringNo = /(string-\d)_[A-Z\w+-]*/gi.exec()[1];
//     // if (sampleObj[stringNo]) {
//     //   // const playingBufferNumber = sampleObj[stringNo][1];
//     //   // soundSamples[playingBufferNumber].stop();

//     //   // soundSamples[bufferNumber].play();
//     //   sampleObj[stringNo] = null;
//     // } else {
//     //   sampleObj[stringNo] = [chordName, currentBufferNumber];
//     // }
//     return chordObj;
//   },
//   {},
// );

// notesUsed.forEach(bufferNumber => {
//   soundSamples[bufferNumber].play();
// });
