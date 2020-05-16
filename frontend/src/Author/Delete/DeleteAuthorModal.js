import PropTypes from 'prop-types';
import React from 'react';
import { sizes } from 'Helpers/Props';
import Modal from 'Components/Modal/Modal';
import DeleteArtistModalContentConnector from './DeleteAuthorModalContentConnector';

function DeleteAuthorModal(props) {
  const {
    isOpen,
    onModalClose,
    ...otherProps
  } = props;

  return (
    <Modal
      isOpen={isOpen}
      size={sizes.MEDIUM}
      onModalClose={onModalClose}
    >
      <DeleteArtistModalContentConnector
        {...otherProps}
        onModalClose={onModalClose}
      />
    </Modal>
  );
}

DeleteAuthorModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default DeleteAuthorModal;
