import React from 'react';
import PropTypes from 'prop-types';
import Backdrop from './Backdrop/Backdrop';

import './Modal.css';

const Modal = props => {
  const { isShowing, onClose } = props;

  return <>
    <Backdrop isShowing={isShowing} onClick={onClose} />
    <div className={`modal ${isShowing ? 'showing' : ''}`}>
      { props.children }
    </div>
  </>;
};

Modal.propTypes = {
  isShowing: PropTypes.bool,
  onClose: PropTypes.func
};

export default Modal;