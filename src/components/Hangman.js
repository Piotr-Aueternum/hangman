import React from 'react';
import PropTypes from 'prop-types';
import './Hangman.scss';

const propTypes = {
  score: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const Hangman = ({ score, data }) => (
  <div className="Hangman">
    {data
      .filter((item, key) => (key < score))
      .map((item, key) => (
        <img key={key} className={`Hangman__${item}`} src={`/assets/img/${item}.png`} alt="" />
      ))
    }
  </div>
);

Hangman.propTypes = propTypes;

export default Hangman;
