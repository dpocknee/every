import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as utils from '../utils/utils';

export default class Lilypond extends Component {
  state = {
    userInputArray: '',
    phpNotation: '',
    invalidArray: true,
    alerts: '',
    noOfChords: 0,
    arrayUsed: '',
  };

  componentDidMount() {
    const { chords } = this.props;
    this.setState({ alerts: '...no chord order loaded...', noOfChords: chords.length });
  }

  handleUserChange = event => {
    this.setState({
      userInputArray: event.target.value,
    });
  };

  arrayInputChecker = (arrayTextInput, maxChords, orderType, startingNumber) => {
    const { arrayUpdater, chords } = this.props;
    const checkArray = utils.arrayInputTest(arrayTextInput, maxChords, startingNumber);
    const { isError, errorString, inputArray } = checkArray;
    if (isError) {
      this.setState({ invalidArray: isError, alerts: errorString });
    } else {
      const arrayStatus = [];
      arrayStatus.push(`${orderType} of chords successfully loaded.`);

      const phpNotation = inputArray.reduce(
        (notationStr, chord) => `${notationStr}${chords[chord - startingNumber].notation} J `,
        '',
      );
      this.setState({
        phpNotation,
        arrayUsed: inputArray,
        invalidArray: false,
        alerts: arrayStatus,
      });
      if (orderType === 'User-inputed order') {
        const newArray = inputArray.map(chord => chord - startingNumber);
        arrayUpdater(newArray);
        arrayStatus.push('Display updated with new chord order.');
        this.setState({
          alerts: arrayStatus.join(' '),
        });
      }
    }
  };

  loadCurrentOrder() {
    const { mainArrayOrder } = this.props;
    const { noOfChords } = this.state;
    this.arrayInputChecker(`[${mainArrayOrder.join(', ')}]`, noOfChords, 'Current order', 0);
  }

  loadUserOrder() {
    const { userInputArray, noOfChords } = this.state;
    this.arrayInputChecker(userInputArray, noOfChords, 'User-inputed order', 1);
  }

  render() {
    const {
      arrayUsed, phpNotation, invalidArray, alerts,
    } = this.state;
    const { mainArrayOrder, settings } = this.props;
    const currentOrderArray = mainArrayOrder.map(element => element + 1);
    const currentOrderString = `[${currentOrderArray.join(', ')}]`;
    return (
      <div className="lilypond">
        <div className="currentorderbox" style={{ display: 'flex', flexDirection: 'row' }}>
          <div className="boxnames">The Current Order: </div>
          <div className="middlebox">
            <input
              type="text"
              id="currentInput"
              className="textBox"
              value={currentOrderString}
              readOnly
              name="userInputArray"
              size="45"
            />
          </div>
          <div className="endbox">
            <button
              className="lilypondButtons"
              style={{ ...settings.buttons }}
              type="button"
              onClick={() => {
                this.loadCurrentOrder();
              }}
            >
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
              className="textBox"
              name="userInputArray"
              onChange={event => this.handleUserChange(event)}
              size="45"
            />
          </div>
          <div className="endbox">
            <button
              type="button"
              className="lilypondButtons"
              style={{ ...settings.buttons }}
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
                className="generationButtons"
                style={invalidArray ? { ...settings.disabledButtons } : { ...settings.buttons }}
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

Lilypond.propTypes = {
  mainArrayOrder: PropTypes.arrayOf(PropTypes.number).isRequired,
  arrayUpdater: PropTypes.func.isRequired,
  chords: PropTypes.arrayOf(PropTypes.object).isRequired,
  settings: PropTypes.shape({
    backgroundColor: PropTypes.string,
    border: PropTypes.string,
  }).isRequired,
};
