import React, { Component } from 'react';

export class Slider extends Component {      
      constructor(props) {
            super(props);
      }
      render() {
            return (
                  <div>
                  <input 
                  key = 'slidey'
                  onChange={this.updateTheSliderValue}
                  type="range" 
                  id="playback" 
                  name="bobby" 
                  min="1"
                  max="319" 
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
                        }} />
                  </div>
            );
      }
}