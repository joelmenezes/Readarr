import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { kinds } from 'Helpers/Props';
import SelectInput from 'Components/Form/SelectInput';
import MetadataProfileSelectInputConnector from 'Components/Form/MetadataProfileSelectInputConnector';
import QualityProfileSelectInputConnector from 'Components/Form/QualityProfileSelectInputConnector';
import RootFolderSelectInputConnector from 'Components/Form/RootFolderSelectInputConnector';
import SpinnerButton from 'Components/Link/SpinnerButton';
import PageContentFooter from 'Components/Page/PageContentFooter';
import MoveArtistModal from 'Author/MoveAuthor/MoveAuthorModal';
import TagsModal from './Tags/TagsModal';
import DeleteAuthorModal from './Delete/DeleteAuthorModal';
import AuthorEditorFooterLabel from './AuthorEditorFooterLabel';
import styles from './AuthorEditorFooter.css';

const NO_CHANGE = 'noChange';

class AuthorEditorFooter extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      monitored: NO_CHANGE,
      qualityProfileId: NO_CHANGE,
      metadataProfileId: NO_CHANGE,
      albumFolder: NO_CHANGE,
      rootFolderPath: NO_CHANGE,
      savingTags: false,
      isDeleteArtistModalOpen: false,
      isTagsModalOpen: false,
      isConfirmMoveModalOpen: false,
      destinationRootFolder: null
    };
  }

  componentDidUpdate(prevProps) {
    const {
      isSaving,
      saveError
    } = this.props;

    if (prevProps.isSaving && !isSaving && !saveError) {
      this.setState({
        monitored: NO_CHANGE,
        qualityProfileId: NO_CHANGE,
        metadataProfileId: NO_CHANGE,
        albumFolder: NO_CHANGE,
        rootFolderPath: NO_CHANGE,
        savingTags: false
      });
    }
  }

  //
  // Listeners

  onInputChange = ({ name, value }) => {
    this.setState({ [name]: value });

    if (value === NO_CHANGE) {
      return;
    }

    switch (name) {
      case 'rootFolderPath':
        this.setState({
          isConfirmMoveModalOpen: true,
          destinationRootFolder: value
        });
        break;
      case 'monitored':
        this.props.onSaveSelected({ [name]: value === 'monitored' });
        break;
      case 'albumFolder':
        this.props.onSaveSelected({ [name]: value === 'yes' });
        break;
      default:
        this.props.onSaveSelected({ [name]: value });
    }
  }

  onApplyTagsPress = (tags, applyTags) => {
    this.setState({
      savingTags: true,
      isTagsModalOpen: false
    });

    this.props.onSaveSelected({
      tags,
      applyTags
    });
  }

  onDeleteSelectedPress = () => {
    this.setState({ isDeleteArtistModalOpen: true });
  }

  onDeleteArtistModalClose = () => {
    this.setState({ isDeleteArtistModalOpen: false });
  }

  onTagsPress = () => {
    this.setState({ isTagsModalOpen: true });
  }

  onTagsModalClose = () => {
    this.setState({ isTagsModalOpen: false });
  }

  onSaveRootFolderPress = () => {
    this.setState({
      isConfirmMoveModalOpen: false,
      destinationRootFolder: null
    });

    this.props.onSaveSelected({ rootFolderPath: this.state.destinationRootFolder });
  }

  onMoveArtistPress = () => {
    this.setState({
      isConfirmMoveModalOpen: false,
      destinationRootFolder: null
    });

    this.props.onSaveSelected({
      rootFolderPath: this.state.destinationRootFolder,
      moveFiles: true
    });
  }

  //
  // Render

  render() {
    const {
      authorIds,
      selectedCount,
      isSaving,
      isDeleting,
      isOrganizingAuthor,
      isRetaggingAuthor,
      showMetadataProfile,
      onOrganizeArtistPress,
      onRetagArtistPress
    } = this.props;

    const {
      monitored,
      qualityProfileId,
      metadataProfileId,
      albumFolder,
      rootFolderPath,
      savingTags,
      isTagsModalOpen,
      isDeleteArtistModalOpen,
      isConfirmMoveModalOpen,
      destinationRootFolder
    } = this.state;

    const monitoredOptions = [
      { key: NO_CHANGE, value: 'No Change', disabled: true },
      { key: 'monitored', value: 'Monitored' },
      { key: 'unmonitored', value: 'Unmonitored' }
    ];

    const albumFolderOptions = [
      { key: NO_CHANGE, value: 'No Change', disabled: true },
      { key: 'yes', value: 'Yes' },
      { key: 'no', value: 'No' }
    ];

    return (
      <PageContentFooter>
        <div className={styles.inputContainer}>
          <AuthorEditorFooterLabel
            label="Monitor Artist"
            isSaving={isSaving && monitored !== NO_CHANGE}
          />

          <SelectInput
            name="monitored"
            value={monitored}
            values={monitoredOptions}
            isDisabled={!selectedCount}
            onChange={this.onInputChange}
          />
        </div>

        <div className={styles.inputContainer}>
          <AuthorEditorFooterLabel
            label="Quality Profile"
            isSaving={isSaving && qualityProfileId !== NO_CHANGE}
          />

          <QualityProfileSelectInputConnector
            name="qualityProfileId"
            value={qualityProfileId}
            includeNoChange={true}
            isDisabled={!selectedCount}
            onChange={this.onInputChange}
          />
        </div>

        {
          showMetadataProfile &&
            <div className={styles.inputContainer}>
              <AuthorEditorFooterLabel
                label="Metadata Profile"
                isSaving={isSaving && metadataProfileId !== NO_CHANGE}
              />

              <MetadataProfileSelectInputConnector
                name="metadataProfileId"
                value={metadataProfileId}
                includeNoChange={true}
                includeNone={true}
                isDisabled={!selectedCount}
                onChange={this.onInputChange}
              />
            </div>
        }

        <div className={styles.inputContainer}>
          <AuthorEditorFooterLabel
            label="Album Folder"
            isSaving={isSaving && albumFolder !== NO_CHANGE}
          />

          <SelectInput
            name="albumFolder"
            value={albumFolder}
            values={albumFolderOptions}
            isDisabled={!selectedCount}
            onChange={this.onInputChange}
          />
        </div>

        <div className={styles.inputContainer}>
          <AuthorEditorFooterLabel
            label="Root Folder"
            isSaving={isSaving && rootFolderPath !== NO_CHANGE}
          />

          <RootFolderSelectInputConnector
            name="rootFolderPath"
            value={rootFolderPath}
            includeNoChange={true}
            isDisabled={!selectedCount}
            selectedValueOptions={{ includeFreeSpace: false }}
            onChange={this.onInputChange}
          />
        </div>

        <div className={styles.buttonContainer}>
          <div className={styles.buttonContainerContent}>
            <AuthorEditorFooterLabel
              label={`${selectedCount} Artist(s) Selected`}
              isSaving={false}
            />

            <div className={styles.buttons}>
              <div>
                <SpinnerButton
                  className={styles.organizeSelectedButton}
                  kind={kinds.WARNING}
                  isSpinning={isOrganizingAuthor}
                  isDisabled={!selectedCount || isOrganizingAuthor || isRetaggingAuthor}
                  onPress={onOrganizeArtistPress}
                >
                  Rename Files
                </SpinnerButton>

                <SpinnerButton
                  className={styles.organizeSelectedButton}
                  kind={kinds.WARNING}
                  isSpinning={isRetaggingAuthor}
                  isDisabled={!selectedCount || isOrganizingAuthor || isRetaggingAuthor}
                  onPress={onRetagArtistPress}
                >
                  Write Metadata Tags
                </SpinnerButton>

                <SpinnerButton
                  className={styles.tagsButton}
                  isSpinning={isSaving && savingTags}
                  isDisabled={!selectedCount || isOrganizingAuthor || isRetaggingAuthor}
                  onPress={this.onTagsPress}
                >
                  Set Readarr Tags
                </SpinnerButton>
              </div>

              <SpinnerButton
                className={styles.deleteSelectedButton}
                kind={kinds.DANGER}
                isSpinning={isDeleting}
                isDisabled={!selectedCount || isDeleting}
                onPress={this.onDeleteSelectedPress}
              >
                Delete
              </SpinnerButton>
            </div>
          </div>
        </div>

        <TagsModal
          isOpen={isTagsModalOpen}
          authorIds={authorIds}
          onApplyTagsPress={this.onApplyTagsPress}
          onModalClose={this.onTagsModalClose}
        />

        <DeleteAuthorModal
          isOpen={isDeleteArtistModalOpen}
          authorIds={authorIds}
          onModalClose={this.onDeleteArtistModalClose}
        />

        <MoveArtistModal
          destinationRootFolder={destinationRootFolder}
          isOpen={isConfirmMoveModalOpen}
          onSavePress={this.onSaveRootFolderPress}
          onMoveArtistPress={this.onMoveArtistPress}
        />

      </PageContentFooter>
    );
  }
}

AuthorEditorFooter.propTypes = {
  authorIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  selectedCount: PropTypes.number.isRequired,
  isSaving: PropTypes.bool.isRequired,
  saveError: PropTypes.object,
  isDeleting: PropTypes.bool.isRequired,
  deleteError: PropTypes.object,
  isOrganizingAuthor: PropTypes.bool.isRequired,
  isRetaggingAuthor: PropTypes.bool.isRequired,
  showMetadataProfile: PropTypes.bool.isRequired,
  onSaveSelected: PropTypes.func.isRequired,
  onOrganizeArtistPress: PropTypes.func.isRequired,
  onRetagArtistPress: PropTypes.func.isRequired
};

export default AuthorEditorFooter;
