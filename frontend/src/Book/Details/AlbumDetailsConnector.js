/* eslint max-params: 0 */
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { findCommand, isCommandExecuting } from 'Utilities/Command';
import { registerPagePopulator, unregisterPagePopulator } from 'Utilities/pagePopulator';
import createCommandsSelector from 'Store/Selectors/createCommandsSelector';
import { toggleBooksMonitored } from 'Store/Actions/bookActions';
import { fetchBookFiles, clearBookFiles } from 'Store/Actions/bookFileActions';
import { clearReleases, cancelFetchReleases } from 'Store/Actions/releaseActions';
import { executeCommand } from 'Store/Actions/commandActions';
import * as commandNames from 'Commands/commandNames';
import AlbumDetails from './AlbumDetails';
import createAllArtistSelector from 'Store/Selectors/createAllAuthorsSelector';
import createUISettingsSelector from 'Store/Selectors/createUISettingsSelector';

const selectTrackFiles = createSelector(
  (state) => state.trackFiles,
  (trackFiles) => {
    const {
      items,
      isFetching,
      isPopulated,
      error
    } = trackFiles;

    const hasTrackFiles = !!items.length;

    return {
      isTrackFilesFetching: isFetching,
      isTrackFilesPopulated: isPopulated,
      trackFilesError: error,
      hasTrackFiles
    };
  }
);

function createMapStateToProps() {
  return createSelector(
    (state, { titleSlug }) => titleSlug,
    selectTrackFiles,
    (state) => state.albums,
    createAllArtistSelector(),
    createCommandsSelector(),
    createUISettingsSelector(),
    (titleSlug, trackFiles, albums, artists, commands, uiSettings) => {
      const sortedAlbums = _.orderBy(albums.items, 'releaseDate');
      const albumIndex = _.findIndex(sortedAlbums, { titleSlug });
      const album = sortedAlbums[albumIndex];
      const author = _.find(artists, { id: album.authorId });

      if (!album) {
        return {};
      }

      const {
        isTrackFilesFetching,
        isTrackFilesPopulated,
        trackFilesError,
        hasTrackFiles
      } = trackFiles;

      const previousAlbum = sortedAlbums[albumIndex - 1] || _.last(sortedAlbums);
      const nextAlbum = sortedAlbums[albumIndex + 1] || _.first(sortedAlbums);
      const isSearchingCommand = findCommand(commands, { name: commandNames.BOOK_SEARCH });
      const isSearching = (
        isCommandExecuting(isSearchingCommand) &&
        isSearchingCommand.body.bookIds.indexOf(album.id) > -1
      );

      const isFetching = isTrackFilesFetching;
      const isPopulated = isTrackFilesPopulated;

      return {
        ...album,
        shortDateFormat: uiSettings.shortDateFormat,
        author,
        isSearching,
        isFetching,
        isPopulated,
        trackFilesError,
        hasTrackFiles,
        previousAlbum,
        nextAlbum
      };
    }
  );
}

const mapDispatchToProps = {
  executeCommand,
  fetchBookFiles,
  clearBookFiles,
  clearReleases,
  cancelFetchReleases,
  toggleBooksMonitored
};

class AlbumDetailsConnector extends Component {

  componentDidMount() {
    registerPagePopulator(this.populate);
    this.populate();
  }

  componentDidUpdate(prevProps) {
    // If the id has changed we need to clear the albums
    // files and fetch from the server.

    if (prevProps.id !== this.props.id) {
      this.unpopulate();
      this.populate();
    }
  }

  componentWillUnmount() {
    unregisterPagePopulator(this.populate);
    this.unpopulate();
  }

  //
  // Control

  populate = () => {
    const bookId = this.props.id;

    this.props.fetchBookFiles({ bookId });
  }

  unpopulate = () => {
    this.props.cancelFetchReleases();
    this.props.clearReleases();
    this.props.clearBookFiles();
  }

  //
  // Listeners

  onMonitorTogglePress = (monitored) => {
    this.props.toggleBooksMonitored({
      bookIds: [this.props.id],
      monitored
    });
  }

  onSearchPress = () => {
    this.props.executeCommand({
      name: commandNames.BOOK_SEARCH,
      bookIds: [this.props.id]
    });
  }

  //
  // Render

  render() {
    return (
      <AlbumDetails
        {...this.props}
        onMonitorTogglePress={this.onMonitorTogglePress}
        onSearchPress={this.onSearchPress}
      />
    );
  }
}

AlbumDetailsConnector.propTypes = {
  id: PropTypes.number,
  anyReleaseOk: PropTypes.bool,
  isAlbumFetching: PropTypes.bool,
  isAlbumPopulated: PropTypes.bool,
  titleSlug: PropTypes.string.isRequired,
  fetchBookFiles: PropTypes.func.isRequired,
  clearBookFiles: PropTypes.func.isRequired,
  clearReleases: PropTypes.func.isRequired,
  cancelFetchReleases: PropTypes.func.isRequired,
  toggleBooksMonitored: PropTypes.func.isRequired,
  executeCommand: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(AlbumDetailsConnector);
