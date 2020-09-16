import React from 'react';
import PropTypes from 'prop-types';

const Modal = props => {
  const { isShowing, onClose } = props;

  return (
    <div className={`modal ${isShowing ? 'showing' : ''}`}>
      { props.children }
    </div>
  );
};

Modal.propTypes = {
  isShowing: PropTypes.bool,
  onClose: PropTypes.func
};

export default Modal;