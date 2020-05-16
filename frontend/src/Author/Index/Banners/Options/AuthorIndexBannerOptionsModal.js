import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'Components/Modal/Modal';
import ArtistIndexBannerOptionsModalContentConnector from './AuthorIndexBannerOptionsModalContentConnector';

function AuthorIndexBannerOptionsModal({ isOpen, onModalClose, ...otherProps }) {
  return (
    <Modal
      isOpen={isOpen}
      onModalClose={onModalClose}
    >
      <ArtistIndexBannerOptionsModalContentConnector
        {...otherProps}
        onModalClose={onModalClose}
      />
    </Modal>
  );
}

AuthorIndexBannerOptionsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default AuthorIndexBannerOptionsModal;
