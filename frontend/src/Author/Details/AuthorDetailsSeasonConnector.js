/* eslint max-params: 0 */
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createDimensionsSelector from 'Store/Selectors/createDimensionsSelector';
import createAuthorSelector from 'Store/Selectors/createAuthorSelector';
import createCommandsSelector from 'Store/Selectors/createCommandsSelector';
import createClientSideCollectionSelector from 'Store/Selectors/createClientSideCollectionSelector';
import createUISettingsSelector from 'Store/Selectors/createUISettingsSelector';
import { setBooksSort, setBooksTableOption, toggleBooksMonitored } from 'Store/Actions/bookActions';
import { executeCommand } from 'Store/Actions/commandActions';
import AuthorDetailsSeason from './AuthorDetailsSeason';

function createMapStateToProps() {
  return createSelector(
    (state, { label }) => label,
    createClientSideCollectionSelector('books'),
    createAuthorSelector(),
    createCommandsSelector(),
    createDimensionsSelector(),
    createUISettingsSelector(),
    (label, albums, author, commands, dimensions, uiSettings) => {

      const albumsInGroup = albums.items;

      let sortDir = 'asc';

      if (albums.sortDirection === 'descending') {
        sortDir = 'desc';
      }

      const sortedAlbums = _.orderBy(albumsInGroup, albums.sortKey, sortDir);

      return {
        items: sortedAlbums,
        columns: albums.columns,
        sortKey: albums.sortKey,
        sortDirection: albums.sortDirection,
        artistMonitored: author.monitored,
        isSmallScreen: dimensions.isSmallScreen,
        uiSettings
      };
    }
  );
}

const mapDispatchToProps = {
  toggleBooksMonitored,
  setBooksTableOption,
  dispatchSetAlbumSort: setBooksSort,
  executeCommand
};

class AuthorDetailsSeasonConnector extends Component {

  //
  // Listeners

  onTableOptionChange = (payload) => {
    this.props.setBooksTableOption(payload);
  }

  onSortPress = (sortKey) => {
    this.props.dispatchSetAlbumSort({ sortKey });
  }

  onMonitorAlbumPress = (bookIds, monitored) => {
    this.props.toggleBooksMonitored({
      bookIds,
      monitored
    });
  }

  //
  // Render

  render() {
    return (
      <AuthorDetailsSeason
        {...this.props}
        onSortPress={this.onSortPress}
        onTableOptionChange={this.onTableOptionChange}
        onMonitorAlbumPress={this.onMonitorAlbumPress}
      />
    );
  }
}

AuthorDetailsSeasonConnector.propTypes = {
  authorId: PropTypes.number.isRequired,
  toggleBooksMonitored: PropTypes.func.isRequired,
  setBooksTableOption: PropTypes.func.isRequired,
  dispatchSetAlbumSort: PropTypes.func.isRequired,
  executeCommand: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(AuthorDetailsSeasonConnector);
