import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'Components/Modal/Modal';
import ArtistIndexPosterOptionsModalContentConnector from './AuthorIndexPosterOptionsModalContentConnector';

function AuthorIndexPosterOptionsModal({ isOpen, onModalClose, ...otherProps }) {
  return (
    <Modal
      isOpen={isOpen}
      onModalClose={onModalClose}
    >
      <ArtistIndexPosterOptionsModalContentConnector
        {...otherProps}
        onModalClose={onModalClose}
      />
    </Modal>
  );
}

AuthorIndexPosterOptionsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default AuthorIndexPosterOptionsModal;
