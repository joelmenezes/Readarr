import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'Components/Modal/Modal';
import RetagArtistModalContentConnector from './RetagAuthorModalContentConnector';

function RetagAuthorModal(props) {
  const {
    isOpen,
    onModalClose,
    ...otherProps
  } = props;

  return (
    <Modal
      isOpen={isOpen}
      onModalClose={onModalClose}
    >
      <RetagArtistModalContentConnector
        {...otherProps}
        onModalClose={onModalClose}
      />
    </Modal>
  );
}

RetagAuthorModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default RetagAuthorModal;
