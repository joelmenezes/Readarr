import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import selectSettings from 'Store/Selectors/selectSettings';
import createAuthorSelector from 'Store/Selectors/createAuthorSelector';
import { saveAuthor, setAuthorValue } from 'Store/Actions/authorActions';
import EditAuthorModalContent from './EditAuthorModalContent';

function createIsPathChangingSelector() {
  return createSelector(
    (state) => state.author.pendingChanges,
    createAuthorSelector(),
    (pendingChanges, author) => {
      const path = pendingChanges.path;

      if (path == null) {
        return false;
      }

      return author.path !== path;
    }
  );
}

function createMapStateToProps() {
  return createSelector(
    (state) => state.author,
    (state) => state.settings.metadataProfiles,
    createAuthorSelector(),
    createIsPathChangingSelector(),
    (artistState, metadataProfiles, author, isPathChanging) => {
      const {
        isSaving,
        saveError,
        pendingChanges
      } = artistState;

      const artistSettings = _.pick(author, [
        'monitored',
        'albumFolder',
        'qualityProfileId',
        'metadataProfileId',
        'path',
        'tags'
      ]);

      const settings = selectSettings(artistSettings, pendingChanges, saveError);

      return {
        authorName: author.authorName,
        isSaving,
        saveError,
        isPathChanging,
        originalPath: author.path,
        item: settings.settings,
        showMetadataProfile: metadataProfiles.items.length > 1,
        ...settings
      };
    }
  );
}

const mapDispatchToProps = {
  dispatchSetArtistValue: setAuthorValue,
  dispatchSaveArtist: saveAuthor
};

class EditAuthorModalContentConnector extends Component {

  //
  // Lifecycle

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isSaving && !this.props.isSaving && !this.props.saveError) {
      this.props.onModalClose();
    }
  }

  //
  // Listeners

  onInputChange = ({ name, value }) => {
    this.props.dispatchSetArtistValue({ name, value });
  }

  onSavePress = (moveFiles) => {
    this.props.dispatchSaveArtist({
      id: this.props.authorId,
      moveFiles
    });
  }

  //
  // Render

  render() {
    return (
      <EditAuthorModalContent
        {...this.props}
        onInputChange={this.onInputChange}
        onSavePress={this.onSavePress}
        onMoveArtistPress={this.onMoveArtistPress}
      />
    );
  }
}

EditAuthorModalContentConnector.propTypes = {
  authorId: PropTypes.number,
  isSaving: PropTypes.bool.isRequired,
  saveError: PropTypes.object,
  dispatchSetArtistValue: PropTypes.func.isRequired,
  dispatchSaveArtist: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(EditAuthorModalContentConnector);
