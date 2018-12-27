import React, { Component } from 'react';

export default class Lilypond extends Component {
  state = {
    userInputArray: '',
    phpNotation: '',
    invalidArray: true,
    alerts: '...no chord order loaded...',
    currentArray: [],
    arrayUsed: '',
    aValidArray: '',
  };

  componentDidMount() {
    const { currentArray } = this.props;
    this.setState({ currentArray });
  }

  handleUserChange = event => {
    this.setState({
      userInputArray: event.target.value,
    });
  };

  arrayInputTest = (arrayToTest, maximum, orderType) => {
    // Tests if the array is a valid javascript array and features valid chord numbers.
    // maximum variable is the maximum value a chord can have, normally this is 319.
    this.setState({
      alerts: '...no chord order loaded...',
    });

    let notationArray = '';
    const x = arrayToTest;
    let arraystatus = '';
    let alerter = false;
    let parsed;

    try {
      JSON.parse(arrayToTest);
    } catch (err) {
      arraystatus += 'ERROR: This is not a valid array.  ';
      alerter = true;
      this.setState({ invalidArray: true });
    }

    if (alerter === false) {
      const parsedChordArray = JSON.parse(arrayToTest);
      parsedChordArray.forEach(chordNumber => {
        if (isNaN(chordNumber) === true) {
          arraystatus += `ERROR: ${chordNumber} is not a number.  `;
          alerter = true;
        }
        if (x < 0 || x > maximum) {
          arraystatus += `ERROR: ${chordNumber} is not a valid chord number.  `;
          alerter = true;
        }
      });

      if (parsedChordArray.length !== 319) {
        arraystatus += `ERROR: There are ${
          parsedChordArray.length
        } chords in this array, not 319.  `;
        alerter = true;
      }

      if (alerter === false) {
        arraystatus = `${orderType} of chords successfully loaded.`;
        this.setState({ invalidArray: false });
        // Here is where you should query the chords variable and append all that notation into notationArray.
        parsedChordArray.forEach(chord => {
          notationArray += `${window.chords.chords[x].notation} J `;
        });
        this.setState({
          phpNotation: notationArray,
          arrayUsed: x,
        });
        if (orderType === 'User-inputed order') {
          // window.mainArray format: [chord name, chord index]
          this.setState({
            aValidArray: parsed,
          });
          this.props.arrayUpdater(parsed);
          arraystatus += '  Display updated with new chord order.';
        }
      }
      this.setState({
        invalidArray: alerter,
        alerts: arraystatus,
      });
    }
  };

  loadCurrentOrder() {
    this.setState({
      userInputArray: this.state.currentArray,
    });
    this.arrayInputTest(this.props.currentArray, 318, 'Current order');
  }

  loadUserOrder() {
    this.arrayInputTest(this.state.userInputArray, 318, 'User-inputed order');
  }

  render() {
    return (
      <div className="lilypond">
        <div className="currentorderbox" style={{ display: 'flex', flexDirection: 'row' }}>
          <div className="boxnames">The Current Order: </div>
          <div className="middlebox">
            <input
              type="text"
              id="currentInput"
              value={this.props.currentArray}
              name="userInputArray"
              size="45"
            />
          </div>
          <div className="endox">
            <button
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
              <input type="hidden" id="secretarray" value={this.state.arrayUsed} name="phpArray" />
              <input
                type="hidden"
                id="secretnotation"
                value={this.state.phpNotation}
                name="phpNotation"
              />
              <input
                type="submit"
                id="generateButton"
                name="submit"
                disabled={this.state.invalidArray}
                value="Generate lilypond file"
              />
            </form>
          </div>
          <div className="arraytext">
            <p id="arraystatus">{this.state.alerts}</p>
          </div>
        </div>
      </div>
    );
  }
}
