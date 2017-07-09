import React from 'react';
import Hangman from './Hangman';
import './App.scss';

const App = () => (
  <div className="container">
    <Hangman word="Hangman" filter={/[A-Z]/i} />
  </div>
);
export default App;
