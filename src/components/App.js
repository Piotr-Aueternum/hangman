import React from 'react';
import Hangman from './Hangman';
import './App.scss';

export default () => (
  <div className="container">
    <Hangman word="Hangman" filter={/[A-Z]/i} />
  </div>
);
