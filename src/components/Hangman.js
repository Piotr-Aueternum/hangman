import React from 'react';
import PropTypes from 'prop-types';
import './Hangman.scss';

export default class extends React.Component {
  static propTypes = {
    filter: PropTypes.instanceOf(RegExp).isRequired,
    word: PropTypes.string.isRequired,
    missLength: PropTypes.number,
  }
  static defaultProps = {
    captureContext: window,
    missLength: 10,
  }
  constructor(props) {
    super(props);
    const { word, filter } = props;
    Object.assign(this, {
      state: {
        word: word.toUpperCase(),
        filter,
        letters: [],
        matchedLetters: [],
        missedLetters: [],
      },
      isCorrectLetter: this.isCorrectLetter.bind(this),
      isRepeatedLetter: this.isRepeatedLetter.bind(this),
      isMatchedLetter: this.isMatchedLetter.bind(this),
    });
  }
  componentDidMount() {
    this.keyPressListener();
  }
  keyPressListener() {
    window.addEventListener('keypress', (event) => {
      const { key: letter } = event;
      const { isCorrectLetter, isRepeatedLetter } = this;
      const { letters, missedLetters } = this.state;

      const normalizedLetter = letter.toUpperCase();
      const match = isCorrectLetter(letter) && !isRepeatedLetter(letter, letters);
      if (missedLetters.length < this.props.missLength) {
        if (match) {
          this.addLetter(normalizedLetter);
          this.addMatchedLetter(normalizedLetter);
          this.addMissedLetter(normalizedLetter);
          setTimeout(() => console.log(this.state));
        }
      }
    });
  }
  addLetter(letter) {
    const { letters, word } = this.state;
    const { isCorrectLetter, isRepeatedLetter } = this;
    const match = isCorrectLetter(letter, word) && !isRepeatedLetter(letter, letters);
    if (match) {
      this.setState({ letters: [...letters, letter] });
    }
  }
  addMatchedLetter(letter) {
    const { isMatchedLetter, isRepeatedLetter } = this;
    const { matchedLetters, word } = this.state;
    const match = isMatchedLetter(letter, word) && !isRepeatedLetter(letter, matchedLetters);
    if (match) {
      this.setState({ matchedLetters: [...matchedLetters, letter] });
    }
  }
  addMissedLetter(letter) {
    const { isMatchedLetter, isRepeatedLetter } = this;
    const { missedLetters, word } = this.state;
    const match = !isMatchedLetter(letter, word) && !isRepeatedLetter(letter, missedLetters);
    if (match) {
      this.setState({ missedLetters: [...missedLetters, letter] });
    }
  }
  isMatchedLetter(letter, word) {
    this.setState({ ...this.state });
    return word.includes(letter);
  }
  isCorrectLetter(letter) {
    const { filter } = this.state;
    return Boolean(letter.match(filter));
  }
  isRepeatedLetter(letter, letters) {
    this.setState({ ...this.state });
    return Boolean(letters.includes(letter));
  }
  render() {
    const { missedLetters } = this.state;
    const { missLength } = this.props;
    return (
      <div>
        <p>You missed: {missedLetters.map((letter, key) => <span key={key}>{letter} </span>)}</p>
        {!(missedLetters.length < missLength) && (<div>Gameover</div>)}
      </div>
    );
  }
}

