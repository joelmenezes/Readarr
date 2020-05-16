import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { push } from 'connected-react-router';
import createAlbumSelector from 'Store/Selectors/createBookSelector';
import { deleteBook } from 'Store/Actions/bookActions';
import DeleteAlbumModalContent from './DeleteAlbumModalContent';

function createMapStateToProps() {
  return createSelector(
    createAlbumSelector(),
    (album) => {
      return album;
    }
  );
}

const mapDispatchToProps = {
  push,
  deleteBook
};

class DeleteAlbumModalContentConnector extends Component {

  //
  // Listeners

  onDeletePress = (deleteFiles, addImportListExclusion) => {
    this.props.deleteBook({
      id: this.props.bookId,
      deleteFiles,
      addImportListExclusion
    });

    this.props.onModalClose(true);

    this.props.push(`${window.Readarr.urlBase}/author/${this.props.titleSlug}`);
  }

  //
  // Render

  render() {
    return (
      <DeleteAlbumModalContent
        {...this.props}
        onDeletePress={this.onDeletePress}
      />
    );
  }
}

DeleteAlbumModalContentConnector.propTypes = {
  bookId: PropTypes.number.isRequired,
  titleSlug: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
  deleteBook: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(DeleteAlbumModalContentConnector);
