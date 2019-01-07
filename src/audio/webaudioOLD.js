export class SoundPlayback {
  constructor(context, buffer) {
    this.context = context;
    this.buffer = buffer;
  }

  setup() {
    // console.log('SETUP: this.source:', this.source);
    this.source = this.context.createBufferSource();
    this.gainNode = this.context.createGain();
    this.source.buffer = this.buffer;
    this.source.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);

    this.gainNode.gain.setValueAtTime(0.2, this.context.currentTime);
  }

  play() {
    this.source.start();
    this.source.onended = () => {
      // console.log('has ended!', this.buffer);
      this.stop();
    };
  }

  stop() {
    const fadeOut = 0.001;
    // console.log('soundPLayback isplaying', this.buffer.playing, this.context.playing);
    const ct = this.context.currentTime + fadeOut + 0.001;
    this.gainNode.gain.exponentialRampToValueAtTime(fadeOut, ct);
    this.source.stop(ct + 0.001);
  }
}

// THIS CLASS IS FOR LOADING ALL SAMPLES INTO SEPARATE BUFFERS
export class AudioBuffer {
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
    request.onload = () => {
      thisBuffer.context.decodeAudioData(request.response, buffer => {
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
