import React, { Component } from 'react';

var outter = 1;

function cheater(poopy) {
	var outter = poopy;
	console.log("called");
	return poopy;
}

class PlaybackSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

 handleChange(event, index) {
    this.setState({ value: event.target.value});
	cheater(this.state.value);
  }
  
	render() {
		var fart = [<input 
			key = 'mama'
			type="range" 
			id="playback" 
			name="bobby" 
			min="1"
			max="319" 
			onChange={this.handleChange.bind(this) }
			style={{
		        width: '500px',
		        height: '40px',
		        color: 'blue',
		        borderRadius: '5px', 
		        background: 'orange',
		        margin: '10px',
		        outline: 'none',
		        opacity: 0.7,
		        transition: 'opacity .2s'
		  }} />, this.state.value];
		return (fart);
	}
}

console.log(outter);
export {PlaybackSlider};
