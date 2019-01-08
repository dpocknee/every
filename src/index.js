import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Grid from './components/Grid';
import MainTitle from './components/MainTitle';
import { observe } from './components/Page';
import './css/index.css';

/* eslint react/jsx-filename-extension: 0 */

const root = document.getElementById('root');

class App extends Component {
  state = {
    isWindowBig: true,
  };

  componentWillMount() {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const isWindowBig = windowHeight > 600 && windowWidth > 800;
    this.setState({ isWindowBig });
  }

  render() {
    const { blockPosition } = this.props;
    const { isWindowBig } = this.state;
    return isWindowBig ? (
      <div className="mainpage">
        <MainTitle />
        <Grid blockPosition={blockPosition} />
      </div>
    ) : (
      <div>
        <p>
          This website is designed to be viewed on a large screen. Your browser window is too small
          to view this website. If you are trying to view this on a smart phone, please try
          accessing it via a larger desktop or laptop monitor instead. If you are viewing it on a
          monitor or laptop, try resizing the browser window and refreshing the page. The minimum
          viewing size is 800 x 600 pixels.
        </p>
      </div>
    );
  }
}

App.propTypes = {
  blockPosition: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
};

App.defaultProps = {
  blockPosition: [null, null],
};

observe(blockPosition => ReactDOM.render(<App blockPosition={blockPosition} />, root));
