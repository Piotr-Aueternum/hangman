import React from 'react';
import PropTypes from 'prop-types';
import Letter from './Letter';

export default class Hangman extends React.Component {
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
      restartGame: this.restartGame.bind(this),
    });
  }
  componentDidMount() {
    this.keyPressListener();
  }
  restartGame() {
    this.setState({ letters: [], missedLetters: [], matchedLetters: [] });
  }
  keyPressListener() {
    window.addEventListener('keypress', (event) => {
      const { key: letter } = event;
      const { isCorrectLetter, isRepeatedLetter } = this;
      const { letters, missedLetters, hitedLetters, matchedLetters } = this.state;

      const normalizedLetter = letter.toUpperCase();
      const match = isCorrectLetter(letter) && !isRepeatedLetter(letter, letters);
      if ((missedLetters.length < this.props.missLength)
       || (matchedLetters.length < hitedLetters)) {
        if (match) {
          this.addLetter(normalizedLetter);
        }
      }
    });
  }
  addLetter(letter) {
    const { letters, word, matchedLetters, missedLetters } = this.state;
    const { isCorrectLetter, isRepeatedLetter, isMatchedLetter } = this;
    const match = isMatchedLetter(letter, word) && !isRepeatedLetter(letter, matchedLetters);
    const miss = !isMatchedLetter(letter, word) && !isRepeatedLetter(letter, missedLetters);
    const correct = isCorrectLetter(letter, word) && !isRepeatedLetter(letter, letters);
    switch (true) {
      case match: {
        this.setState({ matchedLetters: [...matchedLetters, letter] });
        break;
      }
      case miss: {
        this.setState({ missedLetters: [...missedLetters, letter] });
        break;
      }
      case correct: {
        this.setState({ letters: [...letters, letter] });
        break;
      }
      default: {
        this.setState({ ...this.state });
      }
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
    const { missedLetters, word, matchedLetters } = this.state;
    const { missLength } = this.props;
    if (!(missedLetters.length < missLength)) {
      return (<div>Gameover <button onClick={this.restartGame}>Try again</button></div>);
    }
    return (
      <div>
        <p>You missed: {
          missedLetters.map((letter, key) => (<Letter key={key}>{letter} </Letter>))
        }</p>
        <p>Your word: {
          word.split('').map((letter, key) => (<Letter key={key}>{matchedLetters.includes(letter) ? letter : ' '}</Letter>))
        }</p>
      </div>
    );
  }
}

