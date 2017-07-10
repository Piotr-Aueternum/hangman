import React from 'react';
import PropTypes from 'prop-types';
import Letter from './Letter';
import './Letters.scss';

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  variant: PropTypes.string.isRequired,
};

const Letters = ({ data, variant }) => (
  <ul className={`Letters Letters--${variant}`}>{
    data.map((item, key) => (
      <li className="Letters__item" key={key}>
        <Letter variant={variant}>{item}</Letter>
      </li>
    ))
  }</ul>
);

Letters.propTypes = propTypes;

export default Letters;
