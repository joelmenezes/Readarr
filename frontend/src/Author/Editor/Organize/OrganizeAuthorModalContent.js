import PropTypes from 'prop-types';
import React from 'react';
import { icons, kinds } from 'Helpers/Props';
import Alert from 'Components/Alert';
import Button from 'Components/Link/Button';
import Icon from 'Components/Icon';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import styles from './OrganizeAuthorModalContent.css';

function OrganizeAuthorModalContent(props) {
  const {
    artistNames,
    onModalClose,
    onOrganizeArtistPress
  } = props;

  return (
    <ModalContent onModalClose={onModalClose}>
      <ModalHeader>
        Organize Selected Artist
      </ModalHeader>

      <ModalBody>
        <Alert>
          Tip: To preview a rename... select "Cancel" then click any author name and use the
          <Icon
            className={styles.renameIcon}
            name={icons.ORGANIZE}
          />
        </Alert>

        <div className={styles.message}>
          Are you sure you want to organize all files in the {artistNames.length} selected author?
        </div>

        <ul>
          {
            artistNames.map((authorName) => {
              return (
                <li key={authorName}>
                  {authorName}
                </li>
              );
            })
          }
        </ul>
      </ModalBody>

      <ModalFooter>
        <Button onPress={onModalClose}>
          Cancel
        </Button>

        <Button
          kind={kinds.DANGER}
          onPress={onOrganizeArtistPress}
        >
          Organize
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}

OrganizeAuthorModalContent.propTypes = {
  artistNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  onModalClose: PropTypes.func.isRequired,
  onOrganizeArtistPress: PropTypes.func.isRequired
};

export default OrganizeAuthorModalContent;
