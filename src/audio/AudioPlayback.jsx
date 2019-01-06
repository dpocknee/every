import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons';
import { AudioBuffers, AudioNodes } from './webaudio';
import { chordNames, audioChords } from '../data/audioChords';
import '../css/AudioPlayback.css';

export default class AudioPlayback extends Component {
  state = {
    isLoading: true,
    noOfFilesToLoad: 0,
    filesLoaded: 0,
    loadingError: false,
    playedChordInfo: {},
    playedChord: 0,
    soundSamples: [],
    audioIsPlaying: false,
    timerId: 0,
  };

  componentDidMount() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioBuffers = new AudioBuffers(audioContext, audioChords);
    audioBuffers.getBuffers(this.fileLoadingProgress);
    const soundSamples = [];
    chordNames.forEach((bufferNumber, index) => {
      const chordSample = new AudioNodes(audioContext, audioBuffers, index);
      chordSample.setup();
      soundSamples.push(chordSample);
    });
    return this.setState({
      soundSamples,
      noOfFilesToLoad: chordNames.length,
    });
  }

  fileLoadingProgress = (event, progressType) => {
    if (progressType === 'load') {
      this.setState(state => {
        const updateFilesLoaded = state.filesLoaded + 1;
        const isLoading = updateFilesLoaded !== state.noOfFilesToLoad;
        return { filesLoaded: updateFilesLoaded, isLoading };
      });
    }
    if (progressType === 'error') {
      this.setState({
        loadingError: `Error loading file ${event.target.responseURL}.  Please reload the page.`,
      });
    }
  };

  playSound = () => {
    this.setState({ audioIsPlaying: true }, () => {
      this.soundLoop(true, 0);
    });
  };

  soundLoop = (shouldPlay, recursiveCounter) => {
    const { audioIsPlaying, soundSamples } = this.state;
    const { mainArray, timing, chords } = this.props;
    // this is just for testing!  real version below:
    // const playedChordBuffers = recursiveCounter;
    const playedChordBuffers = mainArray[recursiveCounter][1];
    if (shouldPlay && audioIsPlaying) {
      const currentChord = chords[playedChordBuffers];
      const { buffer_reference } = currentChord;
      buffer_reference.forEach(bufferNumber => {
        soundSamples[bufferNumber].playSample();
      });
      const shouldAudioContinue = recursiveCounter + 1 < 10;
      const nextInterval = timing[recursiveCounter][1] * 1000;
      const timerId = window.setTimeout(
        () => this.soundLoop(shouldAudioContinue, recursiveCounter + 1),
        nextInterval,
      );
      this.setState({
        timerId,
        playedChord: recursiveCounter,
        playedChordInfo: mainArray[recursiveCounter],
      });
    }
  };

  stopSound = () => {
    const { soundSamples, timerId } = this.state;
    window.clearTimeout(timerId);
    soundSamples.forEach((bufferNumber, index) => {
      soundSamples[index].stopAllSamples();
    });
    this.setState({ audioIsPlaying: false });
  };

  render() {
    const {
      playedChord,
      playedChordInfo,
      noOfFilesToLoad,
      filesLoaded,
      isLoading,
      loadingError,
      audioIsPlaying,
    } = this.state;
    return (
      <>
        {loadingError && <p>{loadingError}</p>}
        {!loadingError
          && (!isLoading ? (
            <div>
              <p>{`Files: ${playedChordInfo.files}`}</p>
              <p>{`Buffers: ${playedChordInfo.buffer_reference}`}</p>
              <p>{`Playing chord: #${playedChord + 1}`}</p>
            </div>
          ) : (
            <div>
              <p>{`${filesLoaded} / ${noOfFilesToLoad} files loaded.`}</p>
            </div>
          ))}
        <div className="playbackBox">
          <div className="playbackButtonDiv">
            {audioIsPlaying ? (
              <button
                type="button"
                className="playbackButtons"
                onClick={() => this.stopSound()}
                onKeyDown={() => this.stopSound()}
              >
                <FontAwesomeIcon icon={faStopCircle} className="playbackIcons" alt="Stop" />
              </button>
            ) : (
              <button
                type="button"
                className="playbackButtons"
                onClick={() => this.playSound()}
                onKeyDown={() => this.playSound()}
              >
                <FontAwesomeIcon icon={faPlayCircle} className="playbackIcons" alt="Play" />
              </button>
            )}
          </div>
        </div>
      </>
    );
  }
}

AudioPlayback.propTypes = {
  mainArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  chords: PropTypes.arrayOf(PropTypes.object).isRequired,
  timing: PropTypes.arrayOf(PropTypes.array).isRequired,
};
