import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createClientSideCollectionSelector from 'Store/Selectors/createClientSideCollectionSelector';
import createCommandExecutingSelector from 'Store/Selectors/createCommandExecutingSelector';
import { saveAuthorEditor, setAuthorEditorFilter, setAuthorEditorSort } from 'Store/Actions/authorEditorActions';
import { fetchRootFolders } from 'Store/Actions/settingsActions';
import { executeCommand } from 'Store/Actions/commandActions';
import * as commandNames from 'Commands/commandNames';
import AuthorEditor from './AuthorEditor';

function createMapStateToProps() {
  return createSelector(
    (state) => state.settings.metadataProfiles,
    createClientSideCollectionSelector('authors', 'authorEditor'),
    createCommandExecutingSelector(commandNames.RENAME_AUTHOR),
    createCommandExecutingSelector(commandNames.RETAG_AUTHOR),
    (metadataProfiles, author, isOrganizingAuthor, isRetaggingAuthor) => {
      return {
        isOrganizingAuthor,
        isRetaggingAuthor,
        showMetadataProfile: metadataProfiles.items.length > 1,
        ...author
      };
    }
  );
}

const mapDispatchToProps = {
  dispatchSetArtistEditorSort: setAuthorEditorSort,
  dispatchSetArtistEditorFilter: setAuthorEditorFilter,
  dispatchSaveArtistEditor: saveAuthorEditor,
  dispatchFetchRootFolders: fetchRootFolders,
  dispatchExecuteCommand: executeCommand
};

class AuthorEditorConnector extends Component {

  //
  // Lifecycle

  componentDidMount() {
    this.props.dispatchFetchRootFolders();
  }

  //
  // Listeners

  onSortPress = (sortKey) => {
    this.props.dispatchSetArtistEditorSort({ sortKey });
  }

  onFilterSelect = (selectedFilterKey) => {
    this.props.dispatchSetArtistEditorFilter({ selectedFilterKey });
  }

  onSaveSelected = (payload) => {
    this.props.dispatchSaveArtistEditor(payload);
  }

  onMoveSelected = (payload) => {
    this.props.dispatchExecuteCommand({
      name: commandNames.MOVE_AUTHOR,
      ...payload
    });
  }

  //
  // Render

  render() {
    return (
      <AuthorEditor
        {...this.props}
        onSortPress={this.onSortPress}
        onFilterSelect={this.onFilterSelect}
        onSaveSelected={this.onSaveSelected}
      />
    );
  }
}

AuthorEditorConnector.propTypes = {
  dispatchSetArtistEditorSort: PropTypes.func.isRequired,
  dispatchSetArtistEditorFilter: PropTypes.func.isRequired,
  dispatchSaveArtistEditor: PropTypes.func.isRequired,
  dispatchFetchRootFolders: PropTypes.func.isRequired,
  dispatchExecuteCommand: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(AuthorEditorConnector);
