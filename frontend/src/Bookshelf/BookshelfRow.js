import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { icons } from 'Helpers/Props';
import Icon from 'Components/Icon';
import MonitorToggleButton from 'Components/MonitorToggleButton';
import VirtualTableRowCell from 'Components/Table/Cells/VirtualTableRowCell';
import VirtualTableSelectCell from 'Components/Table/Cells/VirtualTableSelectCell';
import AuthorNameLink from 'Author/AuthorNameLink';
import BookshelfBook from './BookshelfBook';
import styles from './BookshelfRow.css';

class BookshelfRow extends Component {

  //
  // Render

  render() {
    const {
      authorId,
      status,
      titleSlug,
      authorName,
      monitored,
      albums,
      isSaving,
      isSelected,
      onSelectedChange,
      onArtistMonitoredPress,
      onAlbumMonitoredPress
    } = this.props;

    return (
      <>
        <VirtualTableSelectCell
          className={styles.selectCell}
          id={authorId}
          isSelected={isSelected}
          onSelectedChange={onSelectedChange}
          isDisabled={false}
        />

        <VirtualTableRowCell className={styles.monitored}>
          <MonitorToggleButton
            monitored={monitored}
            size={14}
            isSaving={isSaving}
            onPress={onArtistMonitoredPress}
          />
        </VirtualTableRowCell>

        <VirtualTableRowCell className={styles.status}>
          <Icon
            className={styles.statusIcon}
            name={status === 'ended' ? icons.ARTIST_ENDED : icons.ARTIST_CONTINUING}
            title={status === 'ended' ? 'Ended' : 'Continuing'}
          />
        </VirtualTableRowCell>

        <VirtualTableRowCell className={styles.title}>
          <AuthorNameLink
            titleSlug={titleSlug}
            authorName={authorName}
          />
        </VirtualTableRowCell>

        <VirtualTableRowCell className={styles.albums}>
          {
            albums.map((album) => {
              return (
                <BookshelfBook
                  key={album.id}
                  {...album}
                  onAlbumMonitoredPress={onAlbumMonitoredPress}
                />
              );
            })
          }
        </VirtualTableRowCell>
      </>
    );
  }
}

BookshelfRow.propTypes = {
  authorId: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  titleSlug: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  monitored: PropTypes.bool.isRequired,
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
  isSaving: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool,
  onSelectedChange: PropTypes.func.isRequired,
  onArtistMonitoredPress: PropTypes.func.isRequired,
  onAlbumMonitoredPress: PropTypes.func.isRequired
};

BookshelfRow.defaultProps = {
  isSaving: false
};

export default BookshelfRow;
