/* eslint max-params: 0 */
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { findCommand, isCommandExecuting } from 'Utilities/Command';
import { registerPagePopulator, unregisterPagePopulator } from 'Utilities/pagePopulator';
import createSortedSectionSelector from 'Store/Selectors/createSortedSectionSelector';
import createAllArtistSelector from 'Store/Selectors/createAllAuthorsSelector';
import createCommandsSelector from 'Store/Selectors/createCommandsSelector';
import { clearBooks, fetchBooks } from 'Store/Actions/bookActions';
import { clearSeries, fetchSeries } from 'Store/Actions/seriesActions';
import { clearBookFiles, fetchBookFiles } from 'Store/Actions/bookFileActions';
import { toggleAuthorMonitored } from 'Store/Actions/authorActions';
import { clearQueueDetails, fetchQueueDetails } from 'Store/Actions/queueActions';
import { cancelFetchReleases, clearReleases } from 'Store/Actions/releaseActions';
import { executeCommand } from 'Store/Actions/commandActions';
import * as commandNames from 'Commands/commandNames';
import AuthorDetails from './AuthorDetails';

const selectAlbums = createSelector(
  (state) => state.books,
  (books) => {
    const {
      items,
      isFetching,
      isPopulated,
      error
    } = books;

    const hasAlbums = !!items.length;
    const hasMonitoredAlbums = items.some((e) => e.monitored);

    return {
      isAlbumsFetching: isFetching,
      isAlbumsPopulated: isPopulated,
      albumsError: error,
      hasAlbums,
      hasMonitoredAlbums
    };
  }
);

const selectSeries = createSelector(
  createSortedSectionSelector('series', (a, b) => a.title.localeCompare(b.title)),
  (state) => state.series,
  (series) => {
    const {
      items,
      isFetching,
      isPopulated,
      error
    } = series;

    const hasSeries = !!items.length;

    return {
      isSeriesFetching: isFetching,
      isSeriesPopulated: isPopulated,
      seriesError: error,
      hasSeries,
      series: series.items
    };
  }
);

const selectTrackFiles = createSelector(
  (state) => state.bookFiles,
  (bookFiles) => {
    const {
      items,
      isFetching,
      isPopulated,
      error
    } = bookFiles;

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
    selectAlbums,
    selectSeries,
    selectTrackFiles,
    createAllArtistSelector(),
    createCommandsSelector(),
    (titleSlug, albums, series, trackFiles, allArtists, commands) => {
      const sortedArtist = _.orderBy(allArtists, 'sortName');
      const artistIndex = _.findIndex(sortedArtist, { titleSlug });
      const author = sortedArtist[artistIndex];

      if (!author) {
        return {};
      }

      const {
        isAlbumsFetching,
        isAlbumsPopulated,
        albumsError,
        hasAlbums,
        hasMonitoredAlbums
      } = albums;

      const {
        isSeriesFetching,
        isSeriesPopulated,
        seriesError,
        hasSeries,
        series: seriesItems
      } = series;

      const {
        isTrackFilesFetching,
        isTrackFilesPopulated,
        trackFilesError,
        hasTrackFiles
      } = trackFiles;

      const previousArtist = sortedArtist[artistIndex - 1] || _.last(sortedArtist);
      const nextArtist = sortedArtist[artistIndex + 1] || _.first(sortedArtist);
      const isArtistRefreshing = isCommandExecuting(findCommand(commands, { name: commandNames.REFRESH_AUTHOR, authorId: author.id }));
      const artistRefreshingCommand = findCommand(commands, { name: commandNames.REFRESH_AUTHOR });
      const allArtistRefreshing = (
        isCommandExecuting(artistRefreshingCommand) &&
        !artistRefreshingCommand.body.authorId
      );
      const isRefreshing = isArtistRefreshing || allArtistRefreshing;
      const isSearching = isCommandExecuting(findCommand(commands, { name: commandNames.AUTHOR_SEARCH, authorId: author.id }));
      const isRenamingFiles = isCommandExecuting(findCommand(commands, { name: commandNames.RENAME_FILES, authorId: author.id }));

      const isRenamingArtistCommand = findCommand(commands, { name: commandNames.RENAME_AUTHOR });
      const isRenamingArtist = (
        isCommandExecuting(isRenamingArtistCommand) &&
        isRenamingArtistCommand.body.authorIds.indexOf(author.id) > -1
      );

      const isFetching = isAlbumsFetching || isSeriesFetching || isTrackFilesFetching;
      const isPopulated = isAlbumsPopulated && isSeriesPopulated && isTrackFilesPopulated;

      const alternateTitles = _.reduce(author.alternateTitles, (acc, alternateTitle) => {
        if ((alternateTitle.seasonNumber === -1 || alternateTitle.seasonNumber === undefined) &&
            (alternateTitle.sceneSeasonNumber === -1 || alternateTitle.sceneSeasonNumber === undefined)) {
          acc.push(alternateTitle.title);
        }

        return acc;
      }, []);

      return {
        ...author,
        alternateTitles,
        isArtistRefreshing,
        allArtistRefreshing,
        isRefreshing,
        isSearching,
        isRenamingFiles,
        isRenamingArtist,
        isFetching,
        isPopulated,
        albumsError,
        seriesError,
        trackFilesError,
        hasAlbums,
        hasMonitoredAlbums,
        hasSeries,
        series: seriesItems,
        hasTrackFiles,
        previousArtist,
        nextArtist
      };
    }
  );
}

const mapDispatchToProps = {
  fetchBooks,
  clearBooks,
  fetchSeries,
  clearSeries,
  fetchBookFiles,
  clearBookFiles,
  toggleAuthorMonitored,
  fetchQueueDetails,
  clearQueueDetails,
  clearReleases,
  cancelFetchReleases,
  executeCommand
};

class AuthorDetailsConnector extends Component {

  //
  // Lifecycle

  componentDidMount() {
    registerPagePopulator(this.populate);
    this.populate();
  }

  componentDidUpdate(prevProps) {
    const {
      id,
      isArtistRefreshing,
      allArtistRefreshing,
      isRenamingFiles,
      isRenamingArtist
    } = this.props;

    if (
      (prevProps.isArtistRefreshing && !isArtistRefreshing) ||
      (prevProps.allArtistRefreshing && !allArtistRefreshing) ||
      (prevProps.isRenamingFiles && !isRenamingFiles) ||
      (prevProps.isRenamingArtist && !isRenamingArtist)
    ) {
      this.populate();
    }

    // If the id has changed we need to clear the albums
    // files and fetch from the server.

    if (prevProps.id !== id) {
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
    const authorId = this.props.id;

    this.props.fetchBooks({ authorId });
    this.props.fetchSeries({ authorId });
    this.props.fetchBookFiles({ authorId });
    this.props.fetchQueueDetails({ authorId });
  }

  unpopulate = () => {
    this.props.cancelFetchReleases();
    this.props.clearBooks();
    this.props.clearSeries();
    this.props.clearBookFiles();
    this.props.clearQueueDetails();
    this.props.clearReleases();
  }

  //
  // Listeners

  onMonitorTogglePress = (monitored) => {
    this.props.toggleAuthorMonitored({
      authorId: this.props.id,
      monitored
    });
  }

  onRefreshPress = () => {
    this.props.executeCommand({
      name: commandNames.REFRESH_AUTHOR,
      authorId: this.props.id
    });
  }

  onSearchPress = () => {
    this.props.executeCommand({
      name: commandNames.AUTHOR_SEARCH,
      authorId: this.props.id
    });
  }

  //
  // Render

  render() {
    return (
      <AuthorDetails
        {...this.props}
        onMonitorTogglePress={this.onMonitorTogglePress}
        onRefreshPress={this.onRefreshPress}
        onSearchPress={this.onSearchPress}
      />
    );
  }
}

AuthorDetailsConnector.propTypes = {
  id: PropTypes.number.isRequired,
  titleSlug: PropTypes.string.isRequired,
  isArtistRefreshing: PropTypes.bool.isRequired,
  allArtistRefreshing: PropTypes.bool.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
  isRenamingFiles: PropTypes.bool.isRequired,
  isRenamingArtist: PropTypes.bool.isRequired,
  fetchBooks: PropTypes.func.isRequired,
  clearBooks: PropTypes.func.isRequired,
  fetchSeries: PropTypes.func.isRequired,
  clearSeries: PropTypes.func.isRequired,
  fetchBookFiles: PropTypes.func.isRequired,
  clearBookFiles: PropTypes.func.isRequired,
  toggleAuthorMonitored: PropTypes.func.isRequired,
  fetchQueueDetails: PropTypes.func.isRequired,
  clearQueueDetails: PropTypes.func.isRequired,
  clearReleases: PropTypes.func.isRequired,
  cancelFetchReleases: PropTypes.func.isRequired,
  executeCommand: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(AuthorDetailsConnector);
