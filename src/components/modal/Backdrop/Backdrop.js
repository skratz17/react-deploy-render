import React from 'react';
import PropTypes from 'prop-types';

import './Backdrop.css';

const Backdrop = props => {
  const { isShowing, onClick } = props;

  return (
    <div className={`backdrop ${isShowing ? 'showing' : ''}`} onClick={onClick}></div>
  );
};

Backdrop.propTypes = {
  isShowing: PropTypes.bool,
  onClick: PropTypes.func
};

export default Backdrop;