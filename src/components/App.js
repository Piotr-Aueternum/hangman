import React from 'react';
import Controls from './Controls';
import Hangman from './Hangman';
import './App.scss';


const hangman = ['bar', 'head', 'neck', 'corpus', 'right-arm', 'left-arm', 'right-hand', 'left-hand', 'right-leg', 'left-leg', 'right-foot', 'left-foot'];

export default class App extends React.Component {
  constructor() {
    super();
    Object.assign(this, {
      state: {
        score: 0,
        word: 'null',
      },
      setScore: this.setScore.bind(this),
    });
  }
  setScore(score) {
    this.setState({ score });
  }
  changeWord() {
    console.log(this);
  }
  render() {
    const { changeWord, setScore, state } = this;
    const { score, word } = state;
    if (!word) {
      return (<div>Loading...</div>);
    }
    return (
      <div className="container">
        <Hangman score={score} data={hangman} />
        <Controls word={word} maxLength={11} filter={/[A-Z]/i} onChange={setScore} onRestart={changeWord} />
      </div>
    );
  }
}
