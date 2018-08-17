import React, { Component } from 'react';

export class Lilypond extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userInputArray: '',
			phpNotation: '',
			invalidArray: true,
			alerts: '...no chord order loaded...',
			currentArray: this.props.currentArray,
			arrayUsed : '',
			aValidArray: ''
		};
		this.handleUserChange = this.handleUserChange.bind(this);
	}

	handleUserChange(event) {
		this.setState({
			userInputArray: event.target.value
		});
	}

	arrayInputTest(arrayToTest,maximum,orderType) {
		//Tests if the array is a valid javascript array and features valid chord numbers.
		//maximum variable is the maximum value a chord can have, normally this is 319.
		this.setState({
			alerts: '...no chord order loaded...'
		})

		var notationArray = "";
	    var x = arrayToTest;
	    var arraystatus = '';
	    var alerter = false;
	    var parsed;

	    try {
		    JSON.parse(x);
		}
		catch(err) {
			arraystatus += 'ERROR: This is not a valid array.  '
			alerter = true;
			this.setState({invalidArray: true});
		}

		if (alerter === false) {
			parsed = JSON.parse(x);	
			parsed.forEach(function(x) { 
				if(isNaN(x) === true) {
					arraystatus += ('ERROR: ' + x + ' is not a number.  ');
					alerter = true;
				};
				if (x<0 || x>maximum) {
					arraystatus += ('ERROR: ' + x + ' is not a valid chord number.  ');
					alerter = true;
				}; 
			});
			if (parsed.length !== 319) {
				arraystatus += ('ERROR: There are ' + parsed.length + ' chords in this array, not 319.  ');
				alerter = true;
			};
			if (alerter === false) {
			    arraystatus = (orderType + ' of chords successfully loaded.');
			    this.setState({invalidArray: false});
	// Here is where you should query the chords variable and append all that notation into notationArray.
				parsed.forEach(
					function(x) {
						notationArray += (window.chords['chords'][x].notation + " J ");
					});
				this.setState({ 
					phpNotation : notationArray,
					arrayUsed: x, 
				});
				if(orderType==='User-inputed order') {
					//window.mainArray format: [chord name, chord index]
				    this.setState({
				    	aValidArray: parsed
				    });
					this.props.arrayUpdater(parsed);
					//NOTE TO SELF: IF THINGS START GOING UP SHIT'S CREAK AFTER ENTERING A USER ARRAY, IT'S PROBABLY EMANATING FROM HERE.
					arraystatus += '  Display updated with new chord order.';
				};
		    };   
			this.setState({ 
				invalidArray: alerter,
				alerts: arraystatus
			});
		};
	}

	loadCurrentOrder() {
		this.setState({
			userInputArray: this.state.currentArray
		})
		this.arrayInputTest(this.props.currentArray, 318,'Current order');
	}

	loadUserOrder() {
		this.arrayInputTest(this.state.userInputArray,318,'User-inputed order');
	}


	render() {
		return (
		<div className="lilypond">
			<div className="currentorderbox" style={{display: 'flex', flexDirection: 'row'}}>
				<div className="boxnames">The Current Order: </div>
				<div className="middlebox"><input type="text" id="currentInput" value={this.props.currentArray} name="userInputArray" size="45" /></div>
				<div className="endox"><button onClick={() => { this.loadCurrentOrder() }} > Use Current Order</button></div>
			</div>
			<div className="userorderbox">
				<div className="boxnames">Use Another Order: </div>
				<div className="middlebox"><input type="text" id="myInput" name="userInputArray" onChange={this.handleUserChange}  size="45"/></div>
				<div className="endox"><button onClick={() => { this.loadUserOrder() }} > Use This Order</button></div>
			</div>
			<div className="generationbutton">
				<div>
				<form id="phpForm" target="_blank" method="post" action="http://davidpocknee.ricercata.org/every/lilypond/lilypondgenerator.php">
					<input type="hidden" id="secretarray" value={this.state.arrayUsed} name="phpArray" />
					<input type="hidden" id="secretnotation" value={this.state.phpNotation} name="phpNotation" />
					<input type="submit" id="generateButton" name="submit" disabled={this.state.invalidArray} value="Generate lilypond file" />
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