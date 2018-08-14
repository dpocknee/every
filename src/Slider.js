import React, { Component } from 'react';

export class Slider extends Component {      
      render() {
            return (
                  <div>
                  <input 
                  key = 'slidey'
                  onChange={this.props.sliderUpdate}
                  type="range" 
                  id="playback" 
                  name="bobby" 
                  min="0"
                  max="318" 
                  defaultValue="0"
                  style={{
                        width: '500px',
                        height: '40px',
                        color: 'blue',
                        borderRadius: '5px', 
                        background: 'black',
                        margin: '10px',
                        outline: 'none',
                        opacity: 0.7,
                        transition: 'opacity .2s'
                        }} />
                  </div>
            );
      }
}