import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons';
import { AudioBuffers, AudioNodes, SoundPlayback } from './webaudio';
import timing from '../data/timingTest';
import chords from '../data/chordsTest';
import { chordNames, audioChords } from '../data/audioChords';
import '../css/AudioPlayback.css';

export default class AudioPlayback extends Component {
  state = {
    playedChord: 0,
    playedChordInfo: {},
    audioIsPlaying: false,
    soundSamples: [],
    timerId: 0,
    noOfFilesToLoad: 0,
    filesLoaded: 0,
    isLoading: true,
    loadingError: false,
  };

  componentDidMount() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    // console.log('mounting', chordNames);
    const audioBuffers = new AudioBuffers(audioContext, audioChords);
    audioBuffers.getBuffers(this.fileLoadingProgress);
    const soundSamples = [];
    chordNames.forEach((bufferNumber, index) => {
      const chordSample = new AudioNodes(audioContext, audioBuffers, index);
      chordSample.setup();
      soundSamples.push(chordSample);
    });
    return this.setState({
      audioContext,
      audioBuffers,
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
    // console.log(this.state.soundSamples);
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
        soundSamples[bufferNumber].playSample();
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
      }));
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
              <p>{`The selected chord is: ${playedChord}`}</p>
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
};
