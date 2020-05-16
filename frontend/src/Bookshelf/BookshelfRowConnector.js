import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createAuthorSelector from 'Store/Selectors/createAuthorSelector';
import { toggleAuthorMonitored } from 'Store/Actions/authorActions';
import { toggleBooksMonitored } from 'Store/Actions/bookActions';
import BookshelfRow from './BookshelfRow';

// Use a const to share the reselect cache between instances
const getAlbumMap = createSelector(
  (state) => state.albums.items,
  (albums) => {
    return albums.reduce((acc, curr) => {
      (acc[curr.authorId] = acc[curr.authorId] || []).push(curr);
      return acc;
    }, {});
  }
);

function createMapStateToProps() {
  return createSelector(
    createAuthorSelector(),
    getAlbumMap,
    (author, albumMap) => {
      const albumsInArtist = albumMap.hasOwnProperty(author.id) ? albumMap[author.id] : [];
      const sortedAlbums = _.orderBy(albumsInArtist, 'releaseDate', 'desc');

      return {
        ...author,
        authorId: author.id,
        authorName: author.authorName,
        monitored: author.monitored,
        status: author.status,
        isSaving: author.isSaving,
        albums: sortedAlbums
      };
    }
  );
}

const mapDispatchToProps = {
  toggleAuthorMonitored,
  toggleBooksMonitored
};

class BookshelfRowConnector extends Component {

  //
  // Listeners

  onArtistMonitoredPress = () => {
    const {
      authorId,
      monitored
    } = this.props;

    this.props.toggleAuthorMonitored({
      authorId,
      monitored: !monitored
    });
  }

  onAlbumMonitoredPress = (bookId, monitored) => {
    const bookIds = [bookId];
    this.props.toggleBooksMonitored({
      bookIds,
      monitored
    });
  }

  //
  // Render

  render() {
    return (
      <BookshelfRow
        {...this.props}
        onArtistMonitoredPress={this.onArtistMonitoredPress}
        onAlbumMonitoredPress={this.onAlbumMonitoredPress}
      />
    );
  }
}

BookshelfRowConnector.propTypes = {
  authorId: PropTypes.number.isRequired,
  monitored: PropTypes.bool.isRequired,
  toggleAuthorMonitored: PropTypes.func.isRequired,
  toggleBooksMonitored: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(BookshelfRowConnector);
