export class Sounder {
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

    this.gainNode.gain.setValueAtTime(0.2, this.context.currentTime);
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
    request.onload = function () {
      // Safari doesn't support promise based syntax
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
