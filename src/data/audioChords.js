// encoding: string no, fingered pitch name and octave number, sounding octave, harmonic or not

const chordNames = [
  // String 6
  'string-6_e1_octave-1',
  'string-6_e2_octave-2',
  'string-6_e2_octave-2_harmonic',
  'string-6_a1_octave-3_harmonic',
  // String 5
  'string-5_e2_octave-2',
  'string-5_e3_octave-3',
  'string-5_e2_octave-3_harmonic',
  'string-5_e3_octave-3_harmonic',
  // String 4
  'string-4_e2_octave-2',
  'string-4_e3_octave-3',
  // String 3
  'string-3_e3_octave-3',
  // String 2
  'string-2_e3_octave-3',
  'string-2_e4_octave-4',
  // String 1
  'string-1_e3_octave-3',
  'string-1_e4_octave-4',
  'string-1_e4_octave-4_harmonic',
  'string-1_a3_octave-5_harmonic',
];

const audioChords = chordNames.map(name => require(`../assets/samples/${name}.mp3`));

export { chordNames, audioChords };
