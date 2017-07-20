import React from 'react';
import PropTypes from 'prop-types';
import Letters from './Letters';
import './Controls.scss';
import './gameover.scss';

export default class Controls extends React.Component {
  static propTypes = {
    filter: PropTypes.instanceOf(RegExp).isRequired,
    word: PropTypes.string.isRequired,
    missLength: PropTypes.number,
    maxLength: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    onRestart: PropTypes.func.isRequired,
  }
  static defaultProps = {
    captureContext: window,
    missLength: 12,
    maxLength: 11,
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
      addLetter: this.addLetter.bind(this),
      keyPressListener: this.keyPressListener.bind(this),
    });
  }
  componentDidMount() {
    window.addEventListener('keypress', this.keyPressListener);
  }
  componentWillReceiveProps(nextProps) {
    const { word } = nextProps;
    this.setState({ word: word.toUpperCase() });
  }
  componentWillUnMount() {
    window.removeEventListener('keypress', this.keyPressListener);
  }
  restartGame() {
    const { onChange, onRestart } = this.props;
    this.setState({ letters: [], missedLetters: [], matchedLetters: [] });
    onChange(0);
    onRestart();
  }
  keyPressListener(event) {
    const { key: letter } = event;
    const {
      addLetter,
      state: { word, missedLetters, matchedLetters },
      props: { missLength },
    } = this;

    const normalizedLetter = letter.toUpperCase();

    const matched = word.split('').map(sLetter => (matchedLetters.includes(sLetter) ? sLetter : ' '));

    if (matched.includes(' ')) {
      if (missedLetters.length < missLength) {
        addLetter(normalizedLetter);
      }
    }
  }
  addLetter(letter) {
    const {
      props: { onChange },
      state: { letters, word, matchedLetters, missedLetters, filter },
    } = this;
    const isCorrectLetter = (sLetter, sFilter) => Boolean(sLetter.match(sFilter));
    const isMatchedLetter = (sLetter, sWord) => sWord.includes(sLetter);
    const isRepeatedLetter = (sLetter, sLetters) => !isMatchedLetter(sLetter, sLetters);

    const match = isMatchedLetter(letter, word) && isRepeatedLetter(letter, matchedLetters);
    const miss = !isMatchedLetter(letter, word) && isRepeatedLetter(letter, missedLetters);
    const correct = !isMatchedLetter(letter, letters);

    if (isCorrectLetter(letter, filter) && letter.length === 1) {
      switch (true) {
        case match: {
          this.setState({ matchedLetters: [...matchedLetters, letter] });
          break;
        }
        case miss: {
          onChange(missedLetters.length + 1);
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
    const {
      restartGame,
      state: { missedLetters, word, matchedLetters },
      props: { missLength, maxLength },
    } = this;

    const matched = word.split('').map(letter => (matchedLetters.includes(letter) ? letter : ' '));
    let fixedLengthLetters = [...matched];
    if (word.length < maxLength) {
      for (let i = 0; i < (maxLength - word.length); i += 1) {
        fixedLengthLetters = ['', ...fixedLengthLetters];
      }
    }
    const gameOver = (!(missedLetters.length < missLength)) || (!matched.includes(' '));
    return (
      <div className="Controls">
        {gameOver && (
          <div className="Controls__restart gameover">
            <p className="gameover__message">Gameover</p>
            <button autoFocus className="gameover__button" onClick={restartGame}>New word</button>
          </div>
        )}
        <div className="Controls__missed">
          <span className="Controls__missed-label">You missed:</span>
          <Letters variant={'missed'} data={missedLetters} />
        </div>
        <div className="Controls__matched">
          <Letters variant={'matched'} data={fixedLengthLetters} />
        </div>
      </div>
    );
  }
}

