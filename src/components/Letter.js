import React from 'react';
import PropTypes from 'prop-types';
import './Letter.scss';

const Letter = ({ children }) => (<span className="Letter">{children}</span>);

Letter.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Letter;
