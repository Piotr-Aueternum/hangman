import React from 'react';
import PropTypes from 'prop-types';
import './Hangman.scss';

export default class extends React.Component {
  static propTypes = {
    word: PropTypes.string.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      props,
    };
  }
  render() {
    const { word } = this.props;
    return (
      <div>
        Your word is: {word}
      </div>
    );
  }
}

