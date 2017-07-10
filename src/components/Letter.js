import React from 'react';
import PropTypes from 'prop-types';
import './Letter.scss';

const propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string.isRequired,
};

const Letter = ({ children, variant }) => (<span className={`Letter ${children ? '' : 'Letter--empty'} Letter--${variant}`}>{children}</span>);

Letter.propTypes = propTypes;

export default Letter;
