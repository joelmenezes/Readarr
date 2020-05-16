import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TagListConnector from 'Components/TagListConnector';
import TableRow from 'Components/Table/TableRow';
import TableRowCell from 'Components/Table/Cells/TableRowCell';
import TableSelectCell from 'Components/Table/Cells/TableSelectCell';
import AuthorNameLink from 'Author/AuthorNameLink';
import AuthorStatusCell from 'Author/Index/Table/AuthorStatusCell';
import styles from './AuthorEditorRow.css';

class AuthorEditorRow extends Component {

  //
  // Listeners

  onAlbumFolderChange = () => {
    // Mock handler to satisfy `onChange` being required for `CheckInput`.
    //
  }

  //
  // Render

  render() {
    const {
      id,
      status,
      titleSlug,
      authorName,
      artistType,
      monitored,
      metadataProfile,
      qualityProfile,
      path,
      tags,
      columns,
      isSelected,
      onSelectedChange
    } = this.props;

    return (
      <TableRow>
        <TableSelectCell
          id={id}
          isSelected={isSelected}
          onSelectedChange={onSelectedChange}
        />

        <AuthorStatusCell
          artistType={artistType}
          monitored={monitored}
          status={status}
        />

        <TableRowCell className={styles.title}>
          <AuthorNameLink
            titleSlug={titleSlug}
            authorName={authorName}
          />
        </TableRowCell>

        <TableRowCell>
          {qualityProfile.name}
        </TableRowCell>

        {
          _.find(columns, { name: 'metadataProfileId' }).isVisible &&
            <TableRowCell>
              {metadataProfile.name}
            </TableRowCell>
        }

        <TableRowCell>
          {path}
        </TableRowCell>

        <TableRowCell>
          <TagListConnector
            tags={tags}
          />
        </TableRowCell>
      </TableRow>
    );
  }
}

AuthorEditorRow.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  titleSlug: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  artistType: PropTypes.string,
  monitored: PropTypes.bool.isRequired,
  metadataProfile: PropTypes.object.isRequired,
  qualityProfile: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.number).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  isSelected: PropTypes.bool,
  onSelectedChange: PropTypes.func.isRequired
};

AuthorEditorRow.defaultProps = {
  tags: []
};

export default AuthorEditorRow;
