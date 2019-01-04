class Sounder {
  constructor(context, buffer) {
    this.context = context;
    this.buffer = buffer;
  }

  setup() {
    this.gainNode = this.context.createGain();
    this.source = this.context.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);

    this.gainNode.gain.setValueAtTime(0.8, this.context.currentTime);
  }

  play(time) {
    this.setup();
    this.source.start(time);
  }

  stop() {
    const ct = this.context.currentTime + 0.5;
    this.gainNode.gain.exponentialRampToValueAtTime(0.001, ct);
    this.source.stop(ct);
  }
}

// THIS CLASS IS FOR LOADING ALL SAMPLES INTO SEPARATE BUFFERS
class Buffer {
  constructor(context, urls) {
    this.context = context;
    this.urls = urls;
    this.buffer = [];
  }

  loadSound(url, index) {
    const request = new XMLHttpRequest();
    request.open('get', url, true);
    request.responseType = 'arraybuffer';
    const thisBuffer = this;
    request.onload = function () {
      // Safari doesn't support promise based syntax
      thisBuffer.context.decodeAudioData(request.response, (buffer) => {
        thisBuffer.buffer[index] = buffer;
      });
    };
    request.send();
  }

  getBuffer() {
    this.urls.forEach((url, index) => {
      this.loadSound(url, index);
    });
  }

  getSound(index) {
    return this.buffer[index];
  }
}

// THIS DEFINES THE AUDIO CONTEXT AND AN ARRAY OF ALL SOUNDS TO BE LOADED INTO THE BUFFERS
let context = new (window.AudioContext || window.webkitAudioContext)();

// encoding: string no, fingered pitch name and octave number, sounding octave, harmonic or not
const newchords = [
  // String 6
  'samples/string-6_e1_octave-1.mp3',
  'samples/string-6_e2_octave-2.mp3',
  'samples/string-6_e2_octave-2_harmonic.mp3',
  'samples/string-6_a1_octave-3_harmonic.mp3',
  // String 5
  'samples/string-5_e2_octave-2.mp3',
  'samples/string-5_e3_octave-3.mp3',
  'samples/string-5_e2_octave-3_harmonic.mp3',
  'samples/string-5_e3_octave-3_harmonic.mp3',
  // String 4
  'samples/string-4_e2_octave-2.mp3',
  'samples/string-4_e3_octave-3.mp3',
  // String 3
  'samples/string-3_e3_octave-3.mp3',
  // String 2
  'samples/string-2_e3_octave-3.mp3',
  'samples/string-2_e4_octave-4.mp3',
  // String 1
  'samples/string-1_e3_octave-3.mp3',
  'samples/string-1_e4_octave-4.mp3',
  'samples/string-1_e4_octave-4_harmonic.mp3',
  'samples/string-1_a3_octave-5_harmonic.mp3',
];

// THIS CALLS THE BUFFER CLASS
const buffer = new Buffer(context, newchords);
const allSounds = buffer.getBuffer();

function stopSound() {
  // context.suspend();
  context.close();
}

function playSound(startingIndex) {
  context = new (window.AudioContext || window.webkitAudioContext)();
  // this is the function called from the button.
  if (context.state === 'suspended') {
    context.resume();
  }
  let nextTime;

  const firstTime = window.timing.timing[startingIndex][0] - 0.5;
  for (let i = startingIndex; i < window.timing.timing.length; ++i) {
    nextTime = window.timing.timing[i][0] - firstTime;

    // console.log("window.mainArray " + window.mainArray);

    window.chords.chords[window.mainArray[i][1]].buffer_reference.forEach((x) => {
      soundy = new Sounder(context, buffer.getSound(x));
      soundy.play(nextTime);
    });
  }
}
