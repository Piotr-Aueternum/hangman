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
      const { missedLetters, hitedLetters, matchedLetters } = this.state;

      const normalizedLetter = letter.toUpperCase();
      if ((missedLetters.length < this.props.missLength)
       || (matchedLetters.length < hitedLetters)) {
        this.addLetter(normalizedLetter);
      }
    });
  }
  addLetter(letter) {
    const { letters, word, matchedLetters, missedLetters, filter } = this.state;
    const isCorrectLetter = (sLetter, sFilter) => Boolean(sLetter.match(sFilter));
    const isMatchedLetter = (sLetter, sWord) => sWord.includes(sLetter);
    const isRepeatedLetter = (sLetter, sLetters) => !isMatchedLetter(sLetter, sLetters);

    const match = isMatchedLetter(letter, word) && isRepeatedLetter(letter, matchedLetters);
    const miss = !isMatchedLetter(letter, word) && isRepeatedLetter(letter, missedLetters);
    const correct = !isMatchedLetter(letter, letters);

    if (isCorrectLetter(letter, filter)) {
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

