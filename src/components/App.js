import React from 'react';
import Controls from './Controls';
import Hangman from './Hangman';
import { getWord } from '../services';
import './App.scss';


const hangman = ['bar', 'head', 'neck', 'corpus', 'right-arm', 'left-arm', 'right-hand', 'left-hand', 'right-leg', 'left-leg', 'right-foot', 'left-foot'];

export default class App extends React.Component {
  constructor() {
    super();
    Object.assign(this, {
      state: {
        score: 0,
        word: undefined,
      },
      setScore: this.setScore.bind(this),
      changeWord: this.changeWord.bind(this),
    });
  }
  componentDidMount() {
    this.changeWord();
  }
  setScore(score) {
    this.setState({ score });
  }
  changeWord() {
    getWord({ minLength: 5, maxLength: 11 })
      .then((resolve) => {
        const { word } = resolve;
        this.setState({ word });
      });
  }
  render() {
    const { changeWord, setScore, state } = this;
    const { score, word } = state;
    if (!word) {
      return (<div>Loading...</div>);
    }
    return (
      <div className="App">
        <Hangman score={score} data={hangman} />
        <Controls word={word} maxLength={11} filter={/[A-Z]/i} onChange={setScore} onRestart={changeWord} />
      </div>
    );
  }
}
