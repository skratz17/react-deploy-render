import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Backdrop from './Backdrop/Backdrop';

import './Modal.css';

const Modal = props => {
  const { isShowing, onClose } = props;

  const handleEscape = e => {
    if(e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if(isShowing) {
      document.addEventListener('keydown', handleEscape);

      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [ isShowing ]);

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