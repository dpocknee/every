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
                  className = 'slider'/>
                  </div>
            );
      }
}