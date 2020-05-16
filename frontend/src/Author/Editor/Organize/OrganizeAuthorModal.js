import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'Components/Modal/Modal';
import OrganizeArtistModalContentConnector from './OrganizeAuthorModalContentConnector';

function OrganizeAuthorModal(props) {
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
      <OrganizeArtistModalContentConnector
        {...otherProps}
        onModalClose={onModalClose}
      />
    </Modal>
  );
}

OrganizeAuthorModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default OrganizeAuthorModal;
