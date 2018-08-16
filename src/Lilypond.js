import React, { Component } from 'react';

var arrayInputValue = '';

export class Lilypond extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userInputArray: '',
			phpNotation: '',
			invalidArray: true,
			alerts: '...no chord order loaded...',
			currentArray: this.props.currentArray
		};
		this.handleUserChange = this.handleUserChange.bind(this);
	}

	handleUserChange(event) {
		this.setState({
			userInputArray: event.target.value
		});
	}

	arrayInputTest(arrayToTest,maximum) {
		//Tests if the array is a valid javascript array and features valid chord numbers.
		//maximum variable is the maximum value a chord can have, normally this is 319.
		this.setState({
			alerts: '...no chord order loaded...'
		})

		var notationArray = "";
	    var x = arrayToTest;
	    console.log("myInput Array: " + x);
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
			}
			if (alerter === false) {
			    console.log(parsed);
			    arraystatus = 'Reference array successfully loaded.';
			    this.setState({invalidArray: false});
	// Here is where you should query the chords variable and append all that notation into notationArray.
				parsed.forEach(
					function(x) {
						notationArray += (window.chords['chords'][x].notation + " J ");
					});
					this.setState({ phpNotation : notationArray });
		    } else {
		    }
		} else {
		};   
		this.setState({ 
			invalidArray: alerter,
			alerts: arraystatus
		});
	}
	loadCurrentOrder() {
		console.log("CLICKED!");
		this.setState({
			userInputArray: this.state.currentArray
		})
		this.arrayInputTest(this.props.currentArray, 318);
	}


	render() {
		return (
		<div style={{margin: '10px'}}>
			<div style={{display: 'flex', flexDirection: 'row'}}>
				<div style={{width: '120px', fontSize: '10px'}}>The Current Order: </div>
				<div><input type="text" id="currentInput" value={this.props.currentArray} name="userInputArray" /></div>
				<div><button onClick={() => { this.loadCurrentOrder() }} > Use Current Order</button></div>
			</div>
			<div style={{display: 'flex', flexDirection: 'row'}}>
				<div style= {{width: '120px',fontSize: '10px'}}>Use Another Order: </div>
				<div><input type="text" id="myInput" name="userInputArray" onChange={this.handleUserChange}/></div>
				<div><button onClick={() => { this.arrayInputTest(this.state.userInputArray,318) }} > Use This Order</button></div>
			</div>
			<div>
				<form id="phpForm" target="_blank" method="post" action="/lilypond/lilypondgenerator.php">
					<input type="hidden" id="secret" value={this.state.phpNotation} name="phpNotation" />
					<input type="submit" id="generateButton" name="submit" disabled={this.state.invalidArray} value="Generate lilypond file" />
				</form>
			</div>
			<div style={{fontSize: '10px'}}>
				<p id="arraystatus">{this.state.alerts}</p>
			</div>
		</div>
			);
	}
}