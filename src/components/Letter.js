import React from 'react';
import PropTypes from 'prop-types';
import './Letter.scss';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const Letter = ({ children }) => (<span className="Letter">{children}</span>);

Letter.propTypes = propTypes;

export default Letter;
