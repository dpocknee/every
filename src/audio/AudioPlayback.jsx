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
    audioContext: null,
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
      audioContext,
      soundSamples,
      noOfFilesToLoad: chordNames.length,
    });
  }

  componentWillUnmount() {
    const { audioContext } = this.state;
    audioContext.close();
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

  webaudioBasedTimer = (audioContext, interval, targetTime, cb) => {
    // This syncs the display with the webaudio clock.
    const intervalTimer = window.setInterval(() => {
      const { audioIsPlaying } = this.state;
      if (audioContext.currentTime >= targetTime) {
        cb();
      }
      if (audioContext.currentTime >= targetTime || !audioIsPlaying) {
        window.clearInterval(intervalTimer);
      }
    }, interval);
  };

  orderChords = (mainArray, chords, timing) => mainArray.map((mainArrayElement, index) => {
    const orderElement = mainArrayElement[1];
    return {
      mainArrayRef: orderElement,
      mainArrayRest: mainArrayElement[0],
      time: timing[index],
      chord: chords[orderElement],
    };
  });

  queueMaker = (orderedChords, startingChord, delay) => {
    const { audioContext } = this.state;
    const startingAudioTime = audioContext.currentTime;
    const startingChordTime = orderedChords[startingChord].time[0];
    return orderedChords.slice(startingChord).reduce((queue, orderedChord, index) => {
      const obj = {
        chordNumber: index + startingChord,
        chordBufferReference: orderedChord.chord.buffer_reference,
        time: (orderedChord.time[0] - startingChordTime) + startingAudioTime + delay,
      };
      queue.push(obj);
      return queue;
    }, []);
  }

  scheduler = (queue, currentChordNumber, noOfChordsToSchedule) => {
    // This function schedules webaudio sounds noOfChordsToSchedule chords ahead.
    const { soundSamples } = this.state;
    const futureChords = currentChordNumber + (noOfChordsToSchedule - 1);
    if (currentChordNumber === 0) {
      for (let i = 0; i < noOfChordsToSchedule; i++) {
        const { chordBufferReference, time } = queue[i];
        chordBufferReference.forEach(bufferNumber => {
          soundSamples[bufferNumber].playSample(time);
        });
      }
    } else if (queue[futureChords]) {
      const { chordBufferReference, time } = queue[futureChords];
      chordBufferReference.forEach(bufferNumber => {
        soundSamples[bufferNumber].playSample(time);
      });
    }
  };

  playSound = () => {
    const {
      selectedChord, mainArray, chords, timing,
    } = this.props;
    const orderedChords = this.orderChords(mainArray, chords, timing);
    const queue = this.queueMaker(orderedChords, selectedChord, 0.1);
    this.scheduler(queue, 0, 5);
    this.setState({ audioIsPlaying: true }, () => {
      this.playSoundLoop(true, 0, queue);
    });
  };

  playSoundLoop = (shouldPlay, recursiveCounter, queue) => {
    const { audioIsPlaying, audioContext } = this.state;
    const { chordPlaying } = this.props;
    if (shouldPlay && audioIsPlaying) {
      const { chordNumber, time } = queue[recursiveCounter];
      const nextSchedule = () => {
        const incrementRecursiveCounter = recursiveCounter + 1;
        this.scheduler(queue, incrementRecursiveCounter, 5);
        const shouldAudioContinue = incrementRecursiveCounter < queue.length;
        this.playSoundLoop(shouldAudioContinue, incrementRecursiveCounter, queue);
        chordPlaying(chordNumber);
        this.setState({
          playedChord: chordNumber,
        });
      };
      this.webaudioBasedTimer(audioContext, 40, time, nextSchedule);
    }
  };

  stopSound = () => {
    const { soundSamples } = this.state;
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
    const { settings } = this.props;
    return (
      <>
        <div className="playbackBox" style={{ ...settings.playbackButtons, ...settings.floatingBoxes }}>
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
                    <FontAwesomeIcon icon={faStopCircle} className="playbackIcons" style={{ ...settings.playbackIcons }} alt="Stop" />
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
                  <FontAwesomeIcon icon={faPlayCircle} className="playbackIcons" style={{ ...settings.playbackIcons }} alt="Play" />
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
  settings: PropTypes.shape({
    backgroundColor: PropTypes.string,
    border: PropTypes.string,
  }).isRequired,
};
