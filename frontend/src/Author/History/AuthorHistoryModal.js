import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'Components/Modal/Modal';
import ArtistHistoryContentConnector from './AuthorHistoryContentConnector';
import AuthorHistoryModalContent from './AuthorHistoryModalContent';

function AuthorHistoryModal(props) {
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
      <ArtistHistoryContentConnector
        component={AuthorHistoryModalContent}
        {...otherProps}
        onModalClose={onModalClose}
      />
    </Modal>
  );
}

AuthorHistoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default AuthorHistoryModal;
