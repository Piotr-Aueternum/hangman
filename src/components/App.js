import React from 'react';
import Hangman from './Hangman';
import './App.scss';

const App = () => (
  <div className="container">
    <Hangman word="Hangman" maxLength={11} filter={/[A-Z]/i} />
  </div>
);
export default App;
