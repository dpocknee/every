import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AudioBuffer, Sounder } from './webaudio';
import timing from '../assets/timingTest';
import chords from '../assets/chords';
import audioChords from './requireAudioChords';
import playButton from '../assets/img/playButton.png';
import stopButton from '../assets/img/stopButton.png';

export default class AudioPlayback extends Component {
  state = {
    playedChord: 0,
    audioContext: [],
    audioBuffer: [],
    audioIsPlaying: false,
  };

  componentDidMount() {
    // THIS DEFINES THE AUDIO CONTEXT AND AN ARRAY OF ALL SOUNDS TO BE LOADED INTO THE BUFFERS
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    // THIS CALLS THE BUFFER CLASS
    const audioBuffer = new AudioBuffer(audioContext, audioChords);
    audioBuffer.getBuffer();
    this.setState({ audioContext, audioBuffer });
  }

  componentWillUnmount() {
    const { audioContext } = this.state;
    audioContext.close();
  }

  playSound = () => {
    // const { audioContext, audioBuffer } = this.state;
    this.setState({ audioIsPlaying: true }, () => {
      this.soundLoop(true, 0);
    });
  };

  // -- make it so there are only six instances of the sounder - one for each string. -- //

  soundLoop = (shouldPlay, recursiveCounter) => {
    const { audioIsPlaying, audioContext, audioBuffer } = this.state;
    const { mainArray } = this.props;
    // this is just for testing!  real version below:
    const playedChordBuffers = recursiveCounter;
    // const playedChordBuffers = mainArray[recursiveCounter][1];
    if (shouldPlay && audioIsPlaying) {
      // Play each string sample for the selected chord:
      chords[playedChordBuffers].buffer_reference.forEach(bufferNumber => {
        const chordSample = new Sounder(audioContext, audioBuffer.getSound(bufferNumber));
        chordSample.play();
      });
      // Update the state to the next chord:
      const shouldAudioContinue = recursiveCounter + 1 <= 10;
      const nextInterval = timing[recursiveCounter][1] * 1000;
      this.setState({ playedChord: recursiveCounter });
      window.setTimeout(
        () => this.soundLoop(shouldAudioContinue, recursiveCounter + 1),
        nextInterval,
      );
    }
  };

  stopSound = () => {
    this.setState({ audioIsPlaying: false });
    // add in a .stop() thing in here that sequentially stops all Sounder instances
    // (one for each string)
  };

  render() {
    const { playedChord } = this.state;

    return (
      <>
        <div>
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
