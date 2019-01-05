import React, { Component } from 'react';

import * as utils from '../utils/utils';

export default class Lilypond extends Component {
  state = {
    userInputArray: '',
    phpNotation: '',
    invalidArray: true,
    alerts: '',
    currentArray: [],
    arrayUsed: '',
  };

  componentDidMount() {
    const { currentArray } = this.props;
    this.setState({ currentArray, alerts: '...no chord order loaded...' });
  }

  handleUserChange = event => {
    this.setState({
      userInputArray: event.target.value,
    });
  };

  arrayInputChecker = (sliderTextInput, maxChords, orderType) => {
    const { arrayUpdater } = this.props;
    const checkArray = utils.arrayInputTest(sliderTextInput, maxChords, 0);
    const { isError, errorString, inputArray } = checkArray;
    if (isError) {
      this.setState({ invalidArray: isError, alerts: errorString });
    } else {
      const arrayStatus = [];
      arrayStatus.push(`${orderType} of chords successfully loaded.`);
      const phpNotation = inputArray.reduce(
        (notationStr, chord) => `${notationStr}${window.chords.chords[chord].notation} J `,
        '',
      );
      this.setState({
        phpNotation,
        arrayUsed: inputArray,
      });
      if (orderType === 'User-inputed order') {
        arrayUpdater();
        arrayStatus.push('Display updated with new chord order.');
        this.setState({
          alerts: arrayStatus.join(' '),
        });
      }
    }
  };

  loadCurrentOrder() {
    this.setState(state => ({ userInputArray: state.currentArray }));
    const currentArray = this.props;
    this.arrayInputChecker(currentArray, 318, 'Current order');
  }

  loadUserOrder() {
    const { userInputArray } = this.state;
    this.arrayInputChecker(userInputArray, 318, 'User-inputed order');
  }

  render() {
    const {
      arrayUsed, phpNotation, invalidArray, alerts,
    } = this.state;
    const { currentArray } = this.props;
    return (
      <div className="lilypond">
        <div className="currentorderbox" style={{ display: 'flex', flexDirection: 'row' }}>
          <div className="boxnames">The Current Order: </div>
          <div className="middlebox">
            <input
              type="text"
              id="currentInput"
              value={currentArray}
              name="userInputArray"
              size="45"
            />
          </div>
          <div className="endox">
            <button
              type="button"
              onClick={() => {
                this.loadCurrentOrder();
              }}
            >
              {' '}
              Use Current Order
            </button>
          </div>
        </div>
        <div className="userorderbox">
          <div className="boxnames">Use Another Order: </div>
          <div className="middlebox">
            <input
              type="text"
              id="myInput"
              name="userInputArray"
              onChange={this.handleUserChange}
              size="45"
            />
          </div>
          <div className="endox">
            <button
              type="button"
              onClick={() => {
                this.loadUserOrder();
              }}
            >
              {' '}
              Use This Order
            </button>
          </div>
        </div>
        <div className="generationbutton">
          <div>
            <form
              id="phpForm"
              target="_blank"
              method="post"
              action="http://davidpocknee.ricercata.org/every/lilypond/lilypondgenerator.php"
            >
              <input type="hidden" id="secretarray" value={arrayUsed} name="phpArray" />
              <input type="hidden" id="secretnotation" value={phpNotation} name="phpNotation" />
              <input
                type="submit"
                id="generateButton"
                name="submit"
                disabled={invalidArray}
                value="Generate lilypond file"
              />
            </form>
          </div>
          <div className="arraytext">
            <p id="arraystatus">{alerts}</p>
          </div>
        </div>
      </div>
    );
  }
}
