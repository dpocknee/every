class SoundPlayback {
  constructor(context, buffer, gainNode, bufferIndex) {
    this.context = context;
    this.buffer = buffer;
    this.gainNode = gainNode;
    this.bufferIndex = bufferIndex;
    this.source = null;
    this.isPlaying = false;
    this.playingFadeout = 0.001;
  }

  play() {
    this.source = this.context.createBufferSource();
    this.source.connect(this.gainNode);
    this.source.buffer = this.buffer.getSound(this.bufferIndex);
    this.source.start();
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

export class AudioNodes {
  constructor(audioContext, audioBuffers, bufferIndex) {
    this.audioContext = audioContext;
    this.audioBuffers = audioBuffers;
    this.bufferIndex = bufferIndex;
    this.sources = [];
    this.gainNode = null;
  }

  setup() {
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    this.gainNode = this.audioContext.createGain();
    this.gainNode.connect(this.audioContext.destination);
  }

  playSample() {
    this.gainNode.gain.setValueAtTime(0.5, this.audioContext.currentTime);
    const newSample = new SoundPlayback(
      this.audioContext,
      this.audioBuffers,
      this.gainNode,
      this.bufferIndex,
    );
    this.sources = [...this.sources, newSample];
    newSample.play();
  }

  stopAllSamples() {
    this.sources.forEach(sample => {
      sample.stop();
    });
  }
}

export class AudioBuffers {
  constructor(context, urls) {
    this.context = context;
    this.urls = urls;
    this.buffer = [];
  }

  loadSound(url, index, fileLoadingProgress) {
    const request = new XMLHttpRequest();
    request.addEventListener('load', event => fileLoadingProgress(event, 'load'));
    request.addEventListener('error', event => fileLoadingProgress(event, 'error'));
    request.open('get', url, true);
    request.responseType = 'arraybuffer';
    request.onload = () => {
      this.context.decodeAudioData(request.response, buffer => {
        this.buffer[index] = buffer;
      });
    };
    request.send();
  }

  getBuffers(fileLoadingProgress) {
    this.urls.forEach((url, index) => {
      this.loadSound(url, index, fileLoadingProgress);
    });
  }

  getSound(index) {
    return this.buffer[index];
  }
}
