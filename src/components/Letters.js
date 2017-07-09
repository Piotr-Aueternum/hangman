import React from 'react';
import PropTypes from 'prop-types';
import Letter from './Letter';
import './Letters.scss';

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const Letters = ({ data }) => (
  <ul className="Letters">{
    data.map((item, key) => (
      <li className="Letters__item" key={key}>
        <Letter>{item}</Letter>
      </li>
    ))
  }</ul>
);

Letters.propTypes = propTypes;

export default Letters;
