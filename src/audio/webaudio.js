export class AudioNodes {
  constructor(context, buffer, bufferIndex) {
    this.context = context;
    this.buffer = buffer;
    this.bufferIndex = bufferIndex;
    this.source = [];
    this.gainNode = null;
    this.isPlaying = false;
    this.playingFadeout = 0.001;
  }

  setup() {
    // console.log('SETUP: this.source:', this.source);
    if (this.context.state === 'suspended') {
      this.context.resume();
    }
    this.buffer.getBuffer();
    this.gainNode = this.context.createGain();
    this.gainNode.connect(this.context.destination);
    this.gainNode.gain.setValueAtTime(0.5, this.context.currentTime);
  }

  play() {
    this.source = this.context.createBufferSource();
    this.source.connect(this.gainNode);
    this.source.buffer = this.buffer.getSound(this.bufferIndex);
    this.source.start(this.playingFadeout + 0.002);
    this.isPlaying = true;

    this.source.onended = () => {
      this.isPlaying = false;
      this.source.stop();
    };
  }

  stop() {
    if (this.isPlaying) {
      const ct = this.context.currentTime + this.playingFadeout + 0.001;
      this.gainNode.gain.exponentialRampToValueAtTime(this.playingFadeout, ct);
      this.source.stop(ct + 0.001);
    }
  }
}

// THIS CLASS IS FOR LOADING ALL SAMPLES INTO SEPARATE BUFFERS
export class AudioBuffers {
  constructor(context, urls) {
    this.context = context;
    this.urls = urls;
    this.buffer = [];
  }

  loadSound(url, index) {
    const request = new XMLHttpRequest();
    request.open('get', url, true);
    request.responseType = 'arraybuffer';
    // const thisBuffer = this;
    request.onload = () => {
      this.context.decodeAudioData(request.response, buffer => {
        this.buffer[index] = buffer;
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
