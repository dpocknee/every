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
    const { selectedChord } = this.props;
    this.setState({ audioIsPlaying: true }, () => {
      this.soundLoop(true, selectedChord);
    });
  };

  soundLoop = (shouldPlay, recursiveCounter) => {
    const { audioIsPlaying, soundSamples } = this.state;
    const {
      mainArray, timing, chords, chordPlaying,
    } = this.props;
    const playedChordBuffers = mainArray[recursiveCounter][1];
    if (shouldPlay && audioIsPlaying) {
      const currentChord = chords[playedChordBuffers];
      const { buffer_reference } = currentChord;
      buffer_reference.forEach(bufferNumber => {
        soundSamples[bufferNumber].playSample();
      });
      const shouldAudioContinue = recursiveCounter + 1 < chords.length;
      const nextInterval = timing[recursiveCounter][1] * 1000;
      const timerId = window.setTimeout(
        () => this.soundLoop(shouldAudioContinue, recursiveCounter + 1),
        nextInterval,
      );
      chordPlaying(recursiveCounter);
      this.setState({
        timerId,
        playedChord: recursiveCounter,
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
      noOfFilesToLoad,
      filesLoaded,
      isLoading,
      loadingError,
      audioIsPlaying,
    } = this.state;
    return (
      <>
        <div className="playbackBox">
          {loadingError && (
            <div className="fileLoading">
              <p className="loadingText">{loadingError}</p>
            </div>
          )}
          {!loadingError && !isLoading ? (
            <div className="playbackButtonDiv">
              {audioIsPlaying ? (
                <>
                  <button
                    type="button"
                    className="playbackButtons"
                    onClick={() => this.stopSound()}
                    onKeyDown={() => this.stopSound()}
                  >
                    <FontAwesomeIcon icon={faStopCircle} className="playbackIcons" alt="Stop" />
                  </button>
                  <p>{`Playing chord: #${playedChord + 1}`}</p>
                </>
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
          ) : (
            <>
              <div className="fileLoading">
                <p className="noOfFiles">{`${filesLoaded} / ${noOfFilesToLoad}`}</p>
              </div>
              <div className="fileLoading">
                <p className="loadingText">Files Loaded</p>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}

AudioPlayback.propTypes = {
  mainArray: PropTypes.arrayOf(PropTypes.array).isRequired,
  chords: PropTypes.arrayOf(PropTypes.object).isRequired,
  timing: PropTypes.arrayOf(PropTypes.array).isRequired,
  chordPlaying: PropTypes.func.isRequired,
  selectedChord: PropTypes.number.isRequired,
};
