import React, { Component } from 'react';

function switchButton(onoff) {
	if(onoff === 'off') {
		document.getElementById("generateButton").disabled = true;
	   	document.getElementById("generateButton").value = "Generate lilypond file";	
	} else {
		document.getElementById("generateButton").disabled = false;
	   	document.getElementById("generateButton").value = "Generate lilypond file";	
	};
}

function arrayInputTest(maximum) {
	//Tests if the array is a valid javascript array and features valid chord numbers.
	//maximum variable is the maximum value a chord can have, normally this is 319.
    var x = document.getElementById("arrayInput").value;
    var arraystatus = '';
    var alerter = false;
    var parsed;

    try {
	    JSON.parse(x);
	}
	catch(err) {
		arraystatus += 'ERROR: This is not a valid array.  '
		alerter = true;
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
		    switchButton('on');

// Here is where you should query the chords variable and append all that notation into notationArray.
			parsed.forEach(
				function(x) {
					notationArray += (window.chords['chords'][x].notation + " J ");
				});
				console.log(notationArray);
    			document.getElementById("secret").value = notationArray;
	    } else {
	    	switchButton('off');
	    }
	} else {
		switchButton('off');
	};   
	document.getElementById("arraystatus").innerHTML = arraystatus;
}

var notationArray = "";

export class Lilypond extends Component {
	render() {
		//document.getElementById("arraystatus").innerHTML = '...';
		switchButton('off');
		
		return (
			<div>
			<button onclick="arrayInputTest(318)">Load Reference Array</button>
			<form id="phpForm" target="_blank" method="post" action="lilypondgenerator.php">
				<input type="text" id="arrayInput" value="" name="phparray" />
				<input type="hidden" id="secret" value="" name="phpnotation" />
				<input type="submit" id="generateButton" name="submit" value="Generate lilypond file" />
			</form>
			<p id="arraystatus"></p>
			</div>
			);
	}
}