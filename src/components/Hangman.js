import React from 'react';
import PropTypes from 'prop-types';
import './Hangman.scss';

export default class extends React.Component {
  static propTypes = {
    filter: PropTypes.instanceOf(RegExp).isRequired,
    word: PropTypes.string.isRequired,
  }
  static defaultProps = {
    captureContext: window,
  }
  constructor(props) {
    super(props);
    const { word, filter } = props;
    this.state = {
      word,
      filter,
      letters: [],
    };
    this.matchLetter = this.matchLetter.bind(this);
    this.isRepeatedLetter = this.isRepeatedLetter.bind(this);
  }
  componentDidMount() {
    this.keyPressListener();
  }
  keyPressListener() {
    window.addEventListener('keypress', (event) => {
      const { key: letter } = event;
      this.addLetter(letter);
    });
  }
  addLetter(letter) {
    const { matchLetter, isRepeatedLetter } = this;
    const normalizedLetter = letter.toUpperCase();
    const match = matchLetter(normalizedLetter) && !isRepeatedLetter(normalizedLetter);
    if (match) {
      const { letters } = this.state;
      this.setState({ letters: [...letters, normalizedLetter] });
    }
  }
  matchLetter(letter) {
    const { filter } = this.state;
    return Boolean(letter.match(filter));
  }
  isRepeatedLetter(letter) {
    const { letters } = this.state;
    return letters.includes(letter);
  }
  render() {
    const { word, letters } = this.state;
    return (
      <div>
        <p>Your word is: {word}</p>
        <p>Used letters: {letters.map(letter => letter)}</p>
      </div>
    );
  }
}

