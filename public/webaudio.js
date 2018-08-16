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
    var ct = this.context.currentTime + 0.5;
    this.gainNode.gain.exponentialRampToValueAtTime(0.001, ct);
    this.source.stop(ct);
  }
}


//THIS CLASS IS FOR LOADING ALL SAMPLES INTO SEPARATE BUFFERS
class Buffer {
  constructor(context, urls) {  
    this.context = context;
    this.urls = urls;
    this.buffer = [];
  }
  
  loadSound(url, index) {
    let request = new XMLHttpRequest();
    request.open('get', url, true);
    request.responseType = 'arraybuffer';
    let thisBuffer = this;
    request.onload = function() {
      // Safari doesn't support promise based syntax
      thisBuffer.context
        .decodeAudioData(request.response, function(buffer) {
          thisBuffer.buffer[index] = buffer;
          if(index == thisBuffer.urls.length-1) {
            thisBuffer.loaded();
          }       
        });
    };
    request.send();
  };
  
  getBuffer() {
    this.urls.forEach((url, index) => {
      this.loadSound(url, index);
    })
  }
   
  getSound(index) {
    return this.buffer[index];
  }

}

  //THIS DEFINES THE AUDIO CONTEXT AND AN ARRAY OF ALL SOUNDS TO BE LOADED INTO THE BUFFERS
var context = new (window.AudioContext || window.webkitAudioContext)();

//encoding: string no, fingered pitch name and octave number, sounding octave, harmonic or not
let newchords = [
  //String 6
  "samples/string-6_e1_octave-1.wav",
  "samples/string-6_e2_octave-2.wav",
  "samples/string-6_e2_octave-2_harmonic.wav",
  "samples/string-6_a1_octave-3_harmonic.wav",
  // String 5
  "samples/string-5_e2_octave-2.wav",
  "samples/string-5_e3_octave-3.wav",
  "samples/string-5_e2_octave-3_harmonic.wav",
  "samples/string-5_e3_octave-3_harmonic.wav",
  // String 4
  "samples/string-4_e2_octave-2.wav",
  "samples/string-4_e3_octave-3.wav",
  //String 3
  "samples/string-3_e3_octave-3.wav",
  //String 2
  "samples/string-2_e3_octave-3.wav",
  "samples/string-2_e4_octave-4.wav",
  //String 1
  "samples/string-1_e3_octave-3.wav",
  "samples/string-1_e4_octave-4.wav",
  "samples/string-1_e4_octave-4_harmonic.wav",
  "samples/string-1_a3_octave-5_harmonic.wav"
];

//THIS CALLS THE BUFFER CLASS
let buffer = new Buffer(context, newchords);
let allSounds = buffer.getBuffer();

function stopSound() {
  //context.suspend();
  context.close();
}

function playSound(startingIndex) {
  context = new (window.AudioContext || window.webkitAudioContext)();
  //this is the function called from the button.
  if(context.state === 'suspended') {
    context.resume();
  }
  var nextTime;

  var firstTime = window.timing['timing'][startingIndex][0] - 0.5;
  for (var i = startingIndex; i < window.timing['timing'].length; ++i) {
    nextTime = window.timing['timing'][i][0] - firstTime;

   //console.log("NEXT TIME " + nextTime + " CHORD PLAYED " + jsondata['chords'][i].name );
   console.log("window.mainArray " + window.mainArray);

    window.chords['chords'][window.mainArray[i][1]].buffer_reference.forEach(
      function(x) {
        soundy = new Sounder(context, buffer.getSound(x));
        soundy.play(nextTime);
    });
  }
}  