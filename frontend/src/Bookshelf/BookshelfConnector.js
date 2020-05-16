import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createArtistClientSideCollectionItemsSelector from 'Store/Selectors/createAuthorClientSideCollectionItemsSelector';
import createDimensionsSelector from 'Store/Selectors/createDimensionsSelector';
import { setBookshelfSort, setBookshelfFilter, saveBookshelf } from 'Store/Actions/bookshelfActions';
import { fetchBooks, clearBooks } from 'Store/Actions/bookActions';
import Bookshelf from './Bookshelf';

function createAlbumFetchStateSelector() {
  return createSelector(
    (state) => state.books.items.length,
    (state) => state.books.isFetching,
    (state) => state.books.isPopulated,
    (length, isFetching, isPopulated) => {
      const albumCount = (!isFetching && isPopulated) ? length : 0;
      return {
        albumCount,
        isFetching,
        isPopulated
      };
    }
  );
}

function createMapStateToProps() {
  return createSelector(
    createAlbumFetchStateSelector(),
    createArtistClientSideCollectionItemsSelector('bookshelf'),
    createDimensionsSelector(),
    (albums, author, dimensionsState) => {
      const isPopulated = albums.isPopulated && author.isPopulated;
      const isFetching = author.isFetching || albums.isFetching;
      return {
        ...author,
        isPopulated,
        isFetching,
        albumCount: albums.albumCount,
        isSmallScreen: dimensionsState.isSmallScreen
      };
    }
  );
}

const mapDispatchToProps = {
  fetchBooks,
  clearBooks,
  setBookshelfSort,
  setBookshelfFilter,
  saveBookshelf
};

class BookshelfConnector extends Component {

  //
  // Lifecycle

  componentDidMount() {
    this.populate();
  }

  componentWillUnmount() {
    this.unpopulate();
  }

  //
  // Control

  populate = () => {
    this.props.fetchBooks();
  }

  unpopulate = () => {
    this.props.clearBooks();
  }

  //
  // Listeners

  onSortPress = (sortKey) => {
    this.props.setBookshelfSort({ sortKey });
  }

  onFilterSelect = (selectedFilterKey) => {
    this.props.setBookshelfFilter({ selectedFilterKey });
  }

  onUpdateSelectedPress = (payload) => {
    this.props.saveBookshelf(payload);
  }

  //
  // Render

  render() {
    return (
      <Bookshelf
        {...this.props}
        onSortPress={this.onSortPress}
        onFilterSelect={this.onFilterSelect}
        onUpdateSelectedPress={this.onUpdateSelectedPress}
      />
    );
  }
}

BookshelfConnector.propTypes = {
  setBookshelfSort: PropTypes.func.isRequired,
  setBookshelfFilter: PropTypes.func.isRequired,
  fetchBooks: PropTypes.func.isRequired,
  clearBooks: PropTypes.func.isRequired,
  saveBookshelf: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(BookshelfConnector);
