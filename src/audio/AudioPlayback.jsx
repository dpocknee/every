import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AudioBuffers, AudioNodes, SoundPlayback } from './webaudio';
import timing from '../data/timingTest';
import chords from '../data/chordsTest';
import { chordNames, audioChords } from '../data/audioChords';
import playButton from '../assets/img/playButton.png';
import stopButton from '../assets/img/stopButton.png';

export default class AudioPlayback extends Component {
  state = {
    playedChord: 0,
    playedChordInfo: {},
    audioContext: [],
    audioBuffers: [],
    audioIsPlaying: false,
    soundSamples: [],
    samplesPlaying: {},
    timerId: 0,
  };

  // componentDidMount() {
  //   // THIS DEFINES THE AUDIO CONTEXT AND AN ARRAY OF ALL SOUNDS TO BE LOADED INTO THE BUFFERS
  //   const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  //   // THIS CALLS THE BUFFER CLASS
  //   const audioBuffer = new AudioBuffer(audioContext, audioChords);
  //   audioBuffer.getBuffer();
  //   const samplesPlaying = chordNames.reduce((sampleObj, name, index) => {
  //     sampleObj[index] = false;
  //     return sampleObj;
  //   }, {});
  //   return this.setState({ audioContext, audioBuffer, samplesPlaying });
  // }

  async componentDidMount() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioBuffers = new AudioBuffers(audioContext, audioChords);
    const soundSamples = [];
    chordNames.forEach((bufferNumber, index) => {
      const chordSample = new AudioNodes(audioContext, audioBuffers, index);
      chordSample.setup();
      soundSamples.push(chordSample);
    });
    return this.setState({ audioContext, audioBuffers, soundSamples });
  }

  // componentWillUnmount() {
  //   const { audioContext } = this.state;
  //   audioContext.close();
  // }

  // playSound = () => {
  //   const { audioContext, audioBuffer } = this.state;
  //   const soundSamples = [];
  //   chordNames.forEach((bufferNumber, index) => {
  //     const chordSample = new AudioNodes(audioContext, audioBuffer.getSound(index));
  //     chordSample.setup();
  //     soundSamples.push(chordSample);
  //     if (index === chordNames.length - 1) {
  //       this.setState({ audioIsPlaying: true, soundSamples }, () => {
  //         this.soundLoop(true, 0);
  //       });
  //     }
  //   });
  // };

  playSound = () => {
    console.log(this.state.soundSamples);
    this.setState({ audioIsPlaying: true }, () => {
      this.soundLoop(true, 0);
    });
  };

  soundLoop = (shouldPlay, recursiveCounter) => {
    const { audioIsPlaying, soundSamples } = this.state;
    const { mainArray } = this.props;
    // this is just for testing!  real version below:
    const playedChordBuffers = recursiveCounter;
    // const playedChordBuffers = mainArray[recursiveCounter][1];
    if (shouldPlay && audioIsPlaying) {
      const currentChord = chords[playedChordBuffers];
      const { buffer_reference } = currentChord;

      // Play each string sample for the selected chord:
      buffer_reference.forEach(bufferNumber => {
        soundSamples[bufferNumber].play();
      });

      // Update the state to the next chord:
      const shouldAudioContinue = recursiveCounter + 1 < 10;
      const nextInterval = timing[recursiveCounter][1] * 1000;
      const timerId = window.setTimeout(
        () => this.soundLoop(shouldAudioContinue, recursiveCounter + 1),
        nextInterval,
      );
      this.setState(state => ({
        timerId,
        playedChord: recursiveCounter,
        playedChordInfo: mainArray[recursiveCounter],
        // samplesPlaying: newSamplesPlaying,
      }));
    }
  };

  stopSound = () => {
    const { soundSamples, samplesPlaying, timerId } = this.state;
    window.clearTimeout(timerId);
    soundSamples.forEach((bufferNumber, index) => {
      soundSamples[index].stop();
    });
    this.setState({ audioIsPlaying: false });
  };

  render() {
    const { playedChord, playedChordInfo } = this.state;
    return (
      <>
        <div>
          <p>{`Files: ${playedChordInfo.files}`}</p>
          <p>{`Buffers: ${playedChordInfo.buffer_reference}`}</p>
          <p>{`The selected chord is: ${playedChord}`}</p>
        </div>
        <div
          style={{
            position: 'fixed',
            width: '110px',
            height: '60px',
            bottom: 0,
            right: 0,
            backgroundColor: '#ffecdc',
            border: '1px solid black',
            boxShadow: '-2px -2px 4px #888888',
          }}
        >
          <div style={{ width: '100px' }}>
            <div style={{ width: '50px', float: 'left' }}>
              <button
                type="button"
                style={{ width: '50px' }}
                onClick={() => this.playSound()}
                onKeyDown={() => this.playSound()}
              >
                <img src={playButton} style={{ width: '50px' }} alt="Play" />
              </button>
            </div>
            <div style={{ width: '50px', display: 'inline' }}>
              <button
                type="button"
                style={{ width: '50px' }}
                onClick={() => this.stopSound()}
                onKeyDown={() => this.stopSound()}
              >
                <img src={stopButton} style={{ width: '50px' }} alt="Stop" />
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

AudioPlayback.propTypes = {
  mainArray: PropTypes.arrayOf(PropTypes.object).isRequired,
};
